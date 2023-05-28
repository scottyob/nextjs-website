import { GetFlights } from "@/lib/flying";
import { Duration } from "luxon";

export default async function Flying() {
	const results = await GetFlights();

	const tableRows = results.map(async (r, i) => {
		const duration = Duration.fromMillis((r?.durationSeconds ?? 0) * 1000);

		return <tr key={i} className="odd:bg-slate-100">
			<td className="px-6 py-4">{r.number}</td >
			<td className="px-6 py-4">{r.location}</td>
			<td className="px-6 py-4">{r.date}</td>
			<td className="px-6 py-4">{duration.toFormat("hh:mm")}</td>
			<td className="px-6 py-4">{r.maxAltitudeMeters}</td>
			<td className="px-6 py-4">{r.altitudeGainMeters}</td>
			<td className="px-6 py-4 whitespace-nowrap">{r.wing}</td>
			<td className="px-6 py-4">{r.comments}</td>
		</tr >
	});

	return (
		<div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">#</th>
						<th className="px-6 py-3 whitespace-nowrap">Location</th>
						<th className="px-6 py-3 whitespace-nowrap">Date</th>
						<th className="px-6 py-3 whitespace-nowrap">Duration</th>
						<th className="px-6 py-3 whitespace-nowrap">Max Altitude</th>
						<th className="px-6 py-3 whitespace-nowrap">Altitude Gain</th>
						<th className="px-6 py-3 whitespace-nowrap">Wing</th>
						<th className="px-6 py-3">Comments</th>
					</tr>
				</thead>
				<tbody>{tableRows}</tbody>
			</table>
		</div>
	);
}
