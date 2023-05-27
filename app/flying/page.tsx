import { GetFlights } from "@/lib/flying";
import { Duration } from "luxon";

export default async function Flying() {
  const results = await GetFlights();

  const tableRows = results.map(async (r, i) => {
    const duration = Duration.fromMillis(r?.durationSeconds ?? 0 * 1000);

    return <tr key={i} className="odd:bg-slate-100">
      < td > {i + 1}</td >
      <td>{r.location}</td>
      <td>{r.date}</td>
      <td>{duration.toFormat("hh:mm")}</td>
      <td></td>
      <td></td>
      <td>{r.fileName}</td>
      <td>{r.comments}</td>
    </tr >
  });

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>#</th>
          <th>Location</th>
          <th>Date</th>
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
