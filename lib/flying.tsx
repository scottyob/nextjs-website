// Flights are in the format that looks something like:
// {
//   date: '2019-03-21',
//   location: 'Mussel Rock',
//   launchName: '',
//   durationSeconds: '7320',
//   wing: 'BGD Epic M',
//   fileName: undefined,
//   comment: undefined
// },

import { google } from "googleapis";


export interface Flight {
  number: number;
  date: string;
  location?: string;
  launchName: string;
  durationSeconds: number;
  wing?: string;
  fileName?: string;
  comment?: string;
}

// Cache of all the flights in the database
let flights: Flight[] = [];

// Gets flights from google docs
async function getSpreadsheetFlights(): Promise<Flight[]> {
  // Authenticate using your credentials
  const auth = new google.auth.GoogleAuth({
    credentials: {
      private_key: Buffer.from(
        process.env.private_key as string,
        "base64"
      ).toString(),
      client_email: process.env.client_email,
      client_id: process.env.client_id,
    },
    projectId: process.env.project_id,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  // Create a Google Sheets API instance
  const sheets = google.sheets({ version: "v4", auth: auth });

  // Specify the spreadsheet ID and range of cells you want to retrieve
  const spreadsheetId = "1-rd2b-_l5IgavBxVe50O817AjAbI5qAVc0leU2bxUM8";
  const range = "Sheet1!A:G";

  // Retrieve the values from the specified range
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  // Extract the values from the response
  const values = response.data.values as string[][];

  // Extract the keys from the first entry
  const keys = values[0];

  // Create a list of objects
  const results = values.slice(1).map((entry) => {
    const obj: Record<string, string> = {};
    keys.forEach((key, index) => {
      obj[key] = entry[index];
    });
    return obj;
  });

  return results.map(r => {
    return {
      number: 0,  // Needs to be populated after the fact
      date: r["date"] ?? "01-01-1980",
      launchName: r.launchName ?? "",
      durationSeconds: Number(r.durationSeconds ?? 0),
      wing: r.wing,
      fileName: r.fileName,
      comment: r.comment,
      location: r.location,
    }
  })
}


// Load up the flights from the GSC files
async function gscFlights(): Promise<Flight[]> {
  
  return [];
}



// Caches and returns a list of our flights
async function populateFlights() {
  flights = await getSpreadsheetFlights();
}

// Gets, caches, and returns flights
export async function GetFlights(): Promise<Flight[]> {
  if (flights.length == 0) {
    await populateFlights();
  }
  return flights;
}
