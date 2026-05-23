import { google } from "googleapis";
import { auth } from "./auth";

export async function getLeadCount(): Promise<number> {
  const session = await auth();
  if (!session?.accessToken) return 0;

  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) return 0;

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: session.accessToken });

  const sheets = google.sheets({ version: "v4", auth: oauth2Client });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "A:A",
  });

  const rows = response.data.values;
  return rows ? Math.max(rows.length - 1, 0) : 0;
}
