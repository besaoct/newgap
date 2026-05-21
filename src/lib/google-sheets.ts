import crypto from "crypto";

/**
 * Base64URL encode string or Buffer
 */
function base64url(str: string | Buffer): string {
  const base64 = typeof str === "string" ? Buffer.from(str).toString("base64") : str.toString("base64");
  return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

/**
 * Generates an OAuth2 Access Token for Google Sheets API using Service Account credentials
 */
export async function getGoogleAuthToken(serviceAccountEmail: string, privateKey: string): Promise<string> {
  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccountEmail,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(payload));
  const message = `${encodedHeader}.${encodedPayload}`;

  // Handle newlines in the private key, which might be escaped as '\n' in env variables
  const formattedPrivateKey = privateKey.replace(/\\n/g, "\n");

  const sign = crypto.createSign("RSA-SHA256");
  sign.update(message);
  const signature = sign.sign(formattedPrivateKey);
  const encodedSignature = base64url(signature);

  const jwt = `${message}.${encodedSignature}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
    next: { revalidate: 0 },
    cache: "no-store",
  });

  if (!tokenRes.ok) {
    const errorText = await tokenRes.text();
    throw new Error(`Google OAuth2 Token Exchange failed: ${tokenRes.status} ${errorText}`);
  }

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

/**
 * Fetches all values from the specified Google Sheet range
 */
export async function readSheetData(
  accessToken: string,
  spreadsheetId: string,
  range: string
): Promise<string[][]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: { revalidate: 0 },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch sheet values: ${res.status} ${errorText}`);
  }

  const data = await res.json();
  return data.values || [];
}

/**
 * Appends a new row of values to the Google Sheet
 */
export async function appendRowToSheet(
  accessToken: string,
  spreadsheetId: string,
  range: string,
  rowValues: string[]
): Promise<void> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: [rowValues],
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to append row to sheet: ${res.status} ${errorText}`);
  }
}
