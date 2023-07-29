import { Flight } from '@/lib/flying';
import { Duration } from 'luxon';

function Stat(props: { header: string; value: string }) {
  return (
    <div className="text-sm text-gray-500 inline-block p-2 m-4 rounded-xl border border-gray-50 shadow-md">
      <div className="text-xs font-medium text-gray-700">{props.header}</div>
      <div>{props.value}</div>
    </div>
  );
}

export default function FlightStats(props: { flights: Flight[] }) {
  const { flights } = props;
  const flightTimeSeconds = flights.reduce(
    (partialSum, flight) => partialSum + (flight.durationSeconds ?? 0),
    0
  );
  const flightTime = Duration.fromMillis(flightTimeSeconds * 1000);

  return (
    <div className="flex justify-center pb-4">
      <Stat header="Number of Flights" value={flights.length.toString()} />
      <Stat
        header="Total Flight Time"
        value={flightTime.as('hours').toFixed(2).toString() + ' hours'}
      />
    </div>
  );
}
