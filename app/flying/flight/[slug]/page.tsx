/**
 * Shows a summary page for a flight
 */

import { GetFlights } from '@/lib/flying';
import tw from 'tailwind-styled-components';

const Header = tw.td`text-xd font-medium text-gray-700 pr-4`;
const Value = tw.td``;

type Props = {
  params: { slug: string };
};

export default async function Page(props: Props) {
  const flightNo = props.params.slug;

  const flights = await GetFlights();
  const flight = flights.filter((f) => f.number?.toString() == flightNo)[0];

  return (
    <article className="max-w-3xl">
      <section>
        <div className="text-sm text-gray-500 rounded-xl border border-gray-50 shadow-md flex flex-wrap flex-row p-4">
          <table className="mr-4">
            <thead>
              <tr>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <Header>Flight Number:</Header>
                <Value>{flight.number}</Value>
              </tr>
              <tr>
                <Header>Location:</Header>
                <Value>{flight.location}</Value>
              </tr>
              <tr>
                <Header>Date:</Header>
                <Value>{flight.date}</Value>
              </tr>
              <tr>
                <Header>Duration:</Header>
                <Value>{flight.durationSeconds}</Value>
              </tr>
              <tr>
                <Header>Launch:</Header>
                <Value>{flight.launchName}</Value>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <Header>Max Distance:</Header>
                <Value>{Math.round(flight.maxDistanceMeters ?? 0)}m</Value>
              </tr>
              <tr>
                <Header>Max Altitude:</Header>
                <Value>{flight.maxAltitudeMeters}m</Value>
              </tr>
              <tr>
                <Header>Track Length:</Header>
                <Value>{Math.round(flight.trackLengthMeters ?? 0)}m</Value>
              </tr>
              <tr>
                <Header>Wing:</Header>
                <Value>{flight.wing}</Value>
              </tr>
              <tr>
                <Header>IGC File:</Header>
                <Value>
                  <a href="/flying/tracklogs/{$flight.fileName}">Download</a>
                </Value>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        {flight.comments && (
          <>
            <strong>Comments:</strong>
            <div id="comments">{flight.comments}</div>
          </>
        )}
      </section>
    </article>
  );
}

export async function generateStaticParams() {
  const flights = await GetFlights();
  return flights.map((f) => {
    return { slug: f.number?.toString() };
  });
}
