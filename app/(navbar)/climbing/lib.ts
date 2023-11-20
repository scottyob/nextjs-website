import { google } from 'googleapis';
import { Climb, ClimbType } from './types';

export async function GetClimbs(): Promise<Climb[]> {
  // Authenticate using your credentials
  const auth = new google.auth.GoogleAuth({
    credentials: {
      private_key: Buffer.from(
        process.env.PRIVATE_KEY as string,
        'base64'
      ).toString(),
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID
    },
    projectId: process.env.PROJECT_ID,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
  });

  // Create a Google Sheets API instance
  const sheets = google.sheets({ version: 'v4', auth: auth });

  // Specify the spreadsheet ID and range of cells you want to retrieve
  const spreadsheetId = '1-0OIGspu_3g_SsTvc_D6nc80I7PzXjUFz6QdnQ2-dnc'
  const range = 'Sheet1!A:D';

  // Retrieve the values from the specified range
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range
  });

  // Extract the values from the response
  const values = response.data.values as string[][];

  // Extract the keys from the first entry
  const keys = values[0];

  // Create a list of objects
  const results = values.slice(1).map((entry, j) => {
    j = j + 2;  // Account for index based 0, and the header row
    const obj: Record<string, string> = {};
    keys.forEach((key, index) => {
      obj[key] = entry[index];
    });
    obj["id"] = `g${j}`;  // Set the ID to be the record number
    return obj;
  });


  return results.filter(c => c.Rating != undefined && c.Rating != "").map((r, i) => {
    const date = r['Date'] ?? '01-01-1980';
    return {
      num: i+1,
      date: date,
      type: r.Rating.startsWith("V") || r.Rating == "Partner" ? ClimbType.Bouldering : ClimbType.TopRoping,
      rating: r.Rating,
      location: r.Location,
      comments: r.Comments,
    };
  }).reverse();
}
