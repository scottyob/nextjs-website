import FlightGraphs from './components/FlightGraphs';
import { GetClimbs } from './lib';
import { Climb } from './types';

function FlightTable(props: { climbs: Climb[] }) {
  const tableRows = props.climbs.map((c, i) => {
    return (
      <tr key={i}>
        <td className="px-5 py-1 whitespace-nowrap">{c.num}</td>
        <td className="px-5 py-1 whitespace-nowrap">{c.date}</td>
        <td className="px-5 py-1 whitespace-nowrap">{c.rating}</td>
        <td className="px-5 py-1 whitespace-nowrap">{c.location}</td>
        <td className="px-5 py-1 whitespace-nowrap">{c.type}</td>
        <td className="px-5 py-1 whitespace-nowrap">{c.comments}</td>
      </tr>
    );
  });

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="font-extrabold text-sm">
            <th className="px-5 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              #
            </th>
            <th className="px-5 py-3 whitespace-nowrap">Date</th>
            <th className="px-5 py-3 whitespace-nowrap">Rating</th>
            <th className="px-5 py-3 whitespace-nowrap">Location</th>
            <th className="px-5 py-3 whitespace-nowrap">Type</th>
            <th className="px-5 py-3">Comments</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}

export default async function Page() {
  const climbs = await GetClimbs();
  return (
    <>
    <title>Climbing - {"Scott O'Brien"}</title>
    <div>
      <FlightGraphs climbs={climbs} />
      <FlightTable climbs={climbs} />
    </div>
    </>
  );
}
