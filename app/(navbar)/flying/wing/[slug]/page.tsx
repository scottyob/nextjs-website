/**
 * Page will return all of the flights for a given wing
 */

import { GetFlights } from '@/lib/flying';
import FlightsList from '../../components/flightsList.react';
import { DM_Sans } from 'next/font/google';
import Link from 'next/link';

const articleFont = DM_Sans({ weight: '400', subsets: ['latin'] });

type Props = {
  params: { slug: string };
};

export default async function FlightsForLocation(props: Props) {
  let results = await GetFlights();
  const wing = props.params.slug.replaceAll('-', ' ');

  // Filter out the flights that are for this location
  results = results.filter((f) => f.wing == wing);

  return (
    <div className="min-w-full">
      <article className="prose min-w-full">
        <div className={articleFont.className}>
          <h2 className="text-center mt-2">
            <Link href="/flying">Flying</Link> {' > '}Wing {' > '}
            {wing}
          </h2>
        </div>
        {/* TODO Need to load up the dynamic site information here */}
      </article>
      <FlightsList flights={results} />
    </div>
  );
}

export async function generateStaticParams() {
  const flights = await GetFlights();
  return flights.map((f) => {
    let wing = f.wing ?? 'Unknown';
    if (wing == '') {
      wing = 'Unknown';
    }

    return { slug: wing.replaceAll(' ', '-')};
  });
}

