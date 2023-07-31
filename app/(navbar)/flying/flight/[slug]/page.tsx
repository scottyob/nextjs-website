/**
 * Shows a summary page for a flight
 */

import ClientMdxRenderer from '@/components/MdxRenderer.react';
import { GetFlights } from '@/lib/flying';
import { getSingleFlight } from '@/lib/mdx';
import { Duration } from 'luxon';
import tw from 'tailwind-styled-components';
import Viewer2D from './Viewer2D';
import { readFileSync } from 'fs';
import Link from 'next/link';

const Header = tw.td`text-xd font-medium text-gray-700 pr-4`;
const Value = tw.td``;

type Props = {
  params: { slug: string };
};

export default async function Page(props: Props) {
  const flightId = props.params.slug;

  const flights = await GetFlights();

  // Look up the flight based on the ID number
  const flight = flights.filter((f) => f.id == flightId)[0];

  const igcFileContents = flight?.igcFile ? readFileSync(flight.igcFile.filePath , { encoding: 'utf8', flag: 'r' }) : undefined;

  // Allow us to display mdx based comments
  let commentsCode = undefined;
  if (flight.commentsFileName) {
    const flightMdx = await getSingleFlight(flight);
    commentsCode = flightMdx.code;
  }

  const duration = Duration.fromMillis((flight?.durationSeconds ?? 0) * 1000);


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
                <Value>{duration.toFormat('hh:mm')}</Value>
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
                {
                  flight.igcFile && (
                    <>
                      <Header>IGC File:</Header>
                      <Value>
                        <a href={`/${flight.igcFile.filePath.replace(/^public\//, '')}`}>Download</a>
                      </Value>
                    </>
                  )
                }
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        {igcFileContents &&
          <div className="w-full">
            <Link href={`/flying/replay/${flight.id}`}>Replay flight</Link>
            <Viewer2D igc={igcFileContents} />
          </div>
        }
        {commentsCode && (
          <>
            <strong>Comments:</strong>
            <div id="comments" className="prose">
              <ClientMdxRenderer code={commentsCode} />
            </div>
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
