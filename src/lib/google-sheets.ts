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

/**
 * Helper to extract sheet name from range (e.g. "Sheet1!A:F" -> "Sheet1")
 */
export function getSheetNameFromRange(range: string): string | null {
  if (range.includes("!")) {
    return range.split("!")[0].replace(/'/g, "");
  }
  return null;
}

export interface SheetInfo {
  sheetId: number;
  title: string;
}

/**
 * Fetches sheet properties (sheetId and title) matching the sheet name in range,
 * or defaults to the first sheet in the spreadsheet.
 */
export async function getSheetInfo(
  accessToken: string,
  spreadsheetId: string,
  range: string
): Promise<SheetInfo> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`;
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
    throw new Error(`Failed to fetch spreadsheet metadata: ${res.status} ${errorText}`);
  }

  const data = await res.json();
  const sheets = data.sheets || [];
  if (sheets.length === 0) {
    throw new Error("No sheets found in spreadsheet.");
  }

  const sheetName = getSheetNameFromRange(range);
  if (sheetName) {
    const found = sheets.find(
      (s: { properties: { title: string; sheetId?: number } }) =>
        s.properties.title.toLowerCase() === sheetName.toLowerCase()
    );
    if (found) {
      return {
        sheetId: found.properties.sheetId || 0,
        title: found.properties.title,
      };
    }
  }

  // Fallback to the first sheet
  return {
    sheetId: sheets[0].properties.sheetId || 0,
    title: sheets[0].properties.title,
  };
}

/**
 * Updates a specific cell range with values
 */
export async function updateSheetValues(
  accessToken: string,
  spreadsheetId: string,
  range: string,
  values: string[][]
): Promise<void> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      range,
      majorDimension: "ROWS",
      values,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to update sheet values: ${res.status} ${errorText}`);
  }
}

/**
 * Applies professional retro-themed header styling, freezes the first row,
 * and auto-resizes the first 6 columns.
 */
export async function applyHeaderStylingAndResize(
  accessToken: string,
  spreadsheetId: string,
  sheetId: number
): Promise<void> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`;
  const body = {
    requests: [
      // Style the first row (headers)
      {
        repeatCell: {
          range: {
            sheetId: sheetId,
            startRowIndex: 0,
            endRowIndex: 1,
            startColumnIndex: 0,
            endColumnIndex: 6,
          },
          cell: {
            userEnteredFormat: {
              backgroundColor: {
                red: 34 / 255,      // #22572c (retro green)
                green: 87 / 255,
                blue: 44 / 255,
              },
              textFormat: {
                foregroundColor: {
                  red: 1.0,
                  green: 1.0,
                  blue: 1.0,
                },
                bold: true,
                fontSize: 10,
                fontFamily: "Arial",
              },
              horizontalAlignment: "CENTER",
            },
          },
          fields: "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)",
        },
      },
      // Freeze the first row
      {
        updateSheetProperties: {
          properties: {
            sheetId: sheetId,
            gridProperties: {
              frozenRowCount: 1,
            },
          },
          fields: "gridProperties.frozenRowCount",
        },
      },
      // Auto-resize the first 6 columns to fit contents
      {
        autoResizeDimensions: {
          dimensions: {
            sheetId: sheetId,
            dimension: "COLUMNS",
            startIndex: 0,
            endIndex: 6,
          },
        },
      },
    ],
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to batch update sheet styling: ${res.status} ${errorText}`);
  }
}

/**
 * Auto-resizes the first 6 columns to fit contents
 */
export async function autoResizeColumns(
  accessToken: string,
  spreadsheetId: string,
  sheetId: number
): Promise<void> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`;
  const body = {
    requests: [
      {
        autoResizeDimensions: {
          dimensions: {
            sheetId: sheetId,
            dimension: "COLUMNS",
            startIndex: 0,
            endIndex: 6,
          },
        },
      },
    ],
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to auto-resize columns: ${res.status} ${errorText}`);
  }
}

