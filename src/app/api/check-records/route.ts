import { NextResponse } from "next/server";
import { 
  getGoogleAuthToken, 
  readSheetData, 
  appendRowToSheet,
  getSheetInfo,
  updateSheetValues,
  applyHeaderStylingAndResize,
  autoResizeColumns
} from "@/lib/google-sheets";

export const dynamic = "force-dynamic";

const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SHEET_RANGE = process.env.GOOGLE_SHEET_RANGE || "Members!A:F";

// Helper: check if sheets API credentials are fully configured
function checkConfig() {
  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
    throw new Error(
      "Google Sheets API configuration is incomplete. Please set GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_SHEET_ID in your environment variables."
    );
  }
}

// Helper: extract first 3 consonants from a name
function getConsonants(name: string): string {
  const consonants = name
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .split("")
    .filter((c) => !"aeiou".includes(c));
  return consonants.slice(0, 3).join("").toUpperCase();
}

// Helper: convert DOB year to hex, supporting both YYYY-MM-DD and DDMMYY formats
function getDobYearHex(dob: string): string {
  let year = 2000;
  if (dob.includes("-")) {
    // Format: YYYY-MM-DD
    year = parseInt(dob.split("-")[0], 10) || 2000;
  } else if (dob.length >= 6) {
    // Format: DDMMYY
    year = 2000 + (parseInt(dob.slice(4, 6), 10) || 0);
  }
  return year.toString(16).toUpperCase();
}

// Helper: build YYYYDDHHmmss suffix from current time
function getTimestampSuffix(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const dd = String(now.getDate()).padStart(2, "0");
  const HH = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  return `${yyyy}${dd}${HH}${mm}${ss}`;
}

const EXPECTED_HEADERS = ["Timestamp", "Name", "Email", "Phone", "DOB", "Unique ID"];

async function ensureHeadersAndGetRows(token: string): Promise<string[][]> {
  let rows = await readSheetData(token, GOOGLE_SHEET_ID!, GOOGLE_SHEET_RANGE);
  
  const hasHeaders = rows.length > 0 && 
    rows[0] && 
    rows[0][0] === EXPECTED_HEADERS[0] && 
    rows[0][5] === EXPECTED_HEADERS[5];

  if (!hasHeaders) {
    const sheetInfo = await getSheetInfo(token, GOOGLE_SHEET_ID!, GOOGLE_SHEET_RANGE);
    const headerRange = sheetInfo.title ? `${sheetInfo.title}!A1:F1` : "A1:F1";
    
    await updateSheetValues(token, GOOGLE_SHEET_ID!, headerRange, [EXPECTED_HEADERS]);
    await applyHeaderStylingAndResize(token, GOOGLE_SHEET_ID!, sheetInfo.sheetId);
    
    rows = await readSheetData(token, GOOGLE_SHEET_ID!, GOOGLE_SHEET_RANGE);
  }
  
  return rows;
}

export async function GET(req: Request) {
  try {
    checkConfig();

    const { searchParams } = new URL(req.url);
    const idToVerify = searchParams.get("id")?.trim();

    const token = await getGoogleAuthToken(GOOGLE_SERVICE_ACCOUNT_EMAIL!, GOOGLE_PRIVATE_KEY!);
    const rows = await ensureHeadersAndGetRows(token);

    if (idToVerify) {
      const matchingRow = rows.find(
        (row, index) => index > 0 && row && row[5]?.trim().toLowerCase() === idToVerify.toLowerCase()
      );

      if (matchingRow) {
        return NextResponse.json({
          verified: true,
          name: matchingRow[1]?.trim() || "Anonymous",
          uniqueId: matchingRow[5]?.trim(),
          issueDate: matchingRow[0]?.trim() || "",
        });
      } else {
        return NextResponse.json(
          { verified: false, error: "Member ID not found in the registry." },
          { status: 404 }
        );
      }
    }

    const emails: string[] = [];
    const uniqueIds: string[] = [];

    // Row 0 is header: Timestamp,Name,Email,Phone,DOB,Unique ID
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length === 0) continue;

      const email = row[2]?.trim().toLowerCase();
      const uniqueId = row[5]?.trim();

      if (email) emails.push(email);
      if (uniqueId) uniqueIds.push(uniqueId);
    }

    return NextResponse.json({ emails, uniqueIds });
  } catch (error) {
    const err = error as Error;
    console.error("Error checking records:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    checkConfig();

    const { name, phone, dob, email } = await req.json();

    if (!name || !phone || !dob || !email) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const token = await getGoogleAuthToken(GOOGLE_SERVICE_ACCOUNT_EMAIL!, GOOGLE_PRIVATE_KEY!);
    const rows = await ensureHeadersAndGetRows(token);

    const emails: string[] = [];
    const uniqueIds: string[] = [];

    // Extract existing records for duplicate check
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length === 0) continue;

      const existingEmail = row[2]?.trim().toLowerCase();
      const existingId = row[5]?.trim();

      if (existingEmail) emails.push(existingEmail);
      if (existingId) uniqueIds.push(existingId);
    }

    // Email verification check
    const userEmail = email.trim().toLowerCase();
    if (emails.includes(userEmail)) {
      return NextResponse.json(
        { error: "Email is already registered. You cannot apply again." },
        { status: 400 }
      );
    }

    // Server-side unique ID generation
    const consonantPart = getConsonants(name);
    const hexYear = getDobYearHex(dob);
    const username = `${consonantPart}${hexYear}`;

    let generatedId = "";
    let attempts = 0;
    const baseSuffix = getTimestampSuffix();
    do {
      const suffix = attempts === 0 ? baseSuffix : `${baseSuffix}-${attempts}`;
      generatedId = `NG-${username}${suffix}`;
      attempts++;
    } while (uniqueIds.includes(generatedId));

    // Format current local issue date
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const formattedIssueDate = `${yyyy}-${mm}-${dd}`;

    // Get current timestamp for the first column
    const timestampStr = now.toLocaleString();

    // Row order: Timestamp, Name, Email, Phone, DOB, Unique ID
    const newRow = [
      timestampStr,
      name.trim(),
      userEmail,
      phone.trim(),
      dob.trim(),
      generatedId,
    ];

    // Append to sheet
    await appendRowToSheet(token, GOOGLE_SHEET_ID!, GOOGLE_SHEET_RANGE, newRow);

    // Auto-resize columns to be responsive based on content width
    try {
      const sheetInfo = await getSheetInfo(token, GOOGLE_SHEET_ID!, GOOGLE_SHEET_RANGE);
      await autoResizeColumns(token, GOOGLE_SHEET_ID!, sheetInfo.sheetId);
    } catch (resizeErr) {
      console.error("Failed to auto-resize columns after append:", resizeErr);
    }

    return NextResponse.json({
      success: true,
      uniqueId: generatedId,
      issueDate: formattedIssueDate,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error submitting record:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
