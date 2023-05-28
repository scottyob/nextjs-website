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
import IGCParser from "igc-parser";
import { distanceTo } from "geolocation-utils";
import { readFileSync } from "fs";
import { glob } from "glob";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import {DateTime} from "luxon";

export interface Flight {
  date: string;
  wing?: string;
  durationSeconds?: number;
  maxDistanceMeters?: number;
  maxAltitudeMeters?: number;
  trackLengthMeters?: number;
  altitudeGainMeters?: number;
  fileName?: string;
  comments?: string;

  /*
   * Additional information from launch database (or manual CSV)
   */
  location?: string;
  launchName?: string;

  /*
   * Computed fields
   */
  number?: number; // The record number of the flight
  launchTime: number; //Timestamp, useful for orderinhg and sequence
}

/*
 * A launch or landing site, as pulled from the paragliding launches database
 */
export type Launch = {
  name: string;
  longitude: number;
  latitude: number;
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

  return results.map((r, i) => {
    const date = r["date"] ?? "01-01-1980";
    return {
      date: date,
      launchTime: DateTime.fromISO(date).toMillis() + i,
      launchName: r.launchName ?? "",
      durationSeconds: Number(r.durationSeconds ?? 0),
      wing: r.wing,
      fileName: r.fileName,
      comments: r.comment,
      location: r.location,
    }
  })
}

/*
  * Parse an IGC file into a flight record
*/
function parseFile(igc: IGCParser.IGCFile, launches: Launch[]): Flight {
  // Calculate the closest launch (within a 1km margin)
  const launchDistances = launches.map((l) => distanceTo(igc.fixes[0], l));
  const shortestDistance = Math.min(...launchDistances);
  const closestLaunch =
    shortestDistance < 1000
      ? launches[launchDistances.indexOf(shortestDistance)]
      : undefined;

  return {
    date: igc.date,
    wing: igc.gliderType!,
    durationSeconds:
      (igc.fixes[igc.fixes.length - 1].timestamp - igc.fixes[0].timestamp) /
      1000,
    maxDistanceMeters: Math.max(
      ...igc.fixes.map((f) => distanceTo(igc.fixes[0], f))
    ),
    maxAltitudeMeters: Math.max(...igc.fixes.map((f) => f.gpsAltitude!)),
    trackLengthMeters: igc.fixes.reduce(
      (previousValue, currentValue, currentIndex) => {
        if (currentIndex === 0) {
          return 0;
        }
        // Work out the distance to the last point
        return (
          previousValue + distanceTo(igc.fixes[currentIndex - 1], currentValue)
        );
      },
      0
    ),
    altitudeGainMeters: igc.fixes
      .map((value, index) => {
        if (index == 0) {
          return 0;
        }
        const difference =
          value.gpsAltitude! - igc.fixes[index - 1].gpsAltitude!;
        return difference > 0 ? difference : 0;
      })
      .reduce((partialSum, a) => partialSum + a, 0),
    launchTime: igc.fixes[0].timestamp,
    ...(igc?.task?.comment && { comment: igc?.task?.comment }),
    launchName: closestLaunch?.name,
  };
}


/*
 * Gets all flights from gsc files on disk
 */
async function gscFlights(): Promise<Flight[]> {
  // Load up the launches
  const buffer = readFileSync('public/logbook/launches.json', { flag: "r", encoding: "utf8" })
  const launches: Launch[] = JSON.parse(buffer);

  const igcs = await glob('public/logbook/flights/**/*.igc', { nocase: true });
  return await Promise.all(igcs.map(async (f) => {
    // Load the igc file into memory
    const buffer = readFileSync(f, { flag: "r", encoding: "utf8" });
    const igc = IGCParser.parse(buffer);
    let ret = parseFile(igc, launches);
    ret.fileName = f;

    // Load in the comments from disk
    const igcDirectory = path.dirname(f);
    const commentsFile = path.join(igcDirectory, 'comments.mdx');
    if (fs.existsSync(commentsFile)) {
      const m = matter.read(commentsFile, { excerpt: true, excerpt_separator: "{/* EXCERPT */}" });
      ret.comments = m.excerpt || m.content;
    }

    return ret;
  }))
}

/*
  * Builds a cache for all local flights
  */
async function populateFlights() {
  const spreadsheetFlights = await getSpreadsheetFlights();
  const igcFlights = await gscFlights();
  flights = [...spreadsheetFlights, ...igcFlights];
  flights.sort((a, b) => a.launchTime - b.launchTime);
  flights.forEach((f, i) => {
    f.number = i + 1;
  });
  // Sort from most recent first
  flights = flights.reverse();
}

// Gets, caches, and returns flights
export async function GetFlights(): Promise<Flight[]> {
  if (flights.length == 0) {
    await populateFlights();
  }
  return flights;
}
