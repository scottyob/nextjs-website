import { google } from "googleapis";

export default async function Flying() {
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

  const tableRows = results.map((r, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{r.date}</td>
      <td>{r.location}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>{r.comment}</td>
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Location</th>
          <th>Duration</th>
          <th>Max Altitude</th>
          <th>Altitude Gain</th>
          <th>Wing</th>
          <th>Comments</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
}
