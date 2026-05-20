import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sheetUrl = "https://docs.google.com/spreadsheets/d/19lmrbaFMcFhpL3kRrpAY0Oti8GCN0nUWKMq7j3OwBX8/export?format=csv";
    const res = await fetch(sheetUrl, {
      next: { revalidate: 0 },
      cache: "no-store"
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch sheet: ${res.statusText}`);
    }

    const csvText = await res.text();
    
    // Parse CSV
    const emails: string[] = [];
    const uniqueIds: string[] = [];
    
    const rows = csvText.split(/\r?\n/);
    // Row 0 is header: Timestamp,Name,Email,Phone,DOB,Unique ID
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].trim();
      if (!row) continue;
      
      const cols: string[] = [];
      let insideQuote = false;
      let col = "";
      for (let j = 0; j < row.length; j++) {
        const char = row[j];
        if (char === '"') {
          insideQuote = !insideQuote;
        } else if (char === ',' && !insideQuote) {
          cols.push(col.trim().replace(/^"|"$/g, ""));
          col = "";
        } else {
          col += char;
        }
      }
      cols.push(col.trim().replace(/^"|"$/g, ""));
      
      if (cols.length >= 6) {
        const email = cols[2]?.trim().toLowerCase();
        const uniqueId = cols[5]?.trim();
        if (email) emails.push(email);
        if (uniqueId) uniqueIds.push(uniqueId);
      }
    }
    
    return NextResponse.json({ emails, uniqueIds });
  } catch (error: any) {
    console.error("Error checking records:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
