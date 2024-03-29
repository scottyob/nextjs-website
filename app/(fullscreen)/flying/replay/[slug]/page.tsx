import { GetFlights } from "@/lib/flying";
import Viewer from "./Viewer3D" 
import { readFileSync } from "fs";
import Head from 'next/head';

type Props = {
  params: { slug: string };
};


export default async function Replay(props: Props) {
  // Get the flight
  const flightId = props.params.slug;
  const flight = (await GetFlights()).filter((f) => f.id == flightId)[0];
  const igcFileContents = flight?.igcFile ? readFileSync(flight.igcFile.filePath, { encoding: 'utf8', flag: 'r'}) : undefined;

  // Get the Cesium access token from the environment variable
  const cesiumToken = process.env.CESIUM_TOKEN ?? "";

  // Load up the points of interest
  const locationsXml = readFileSync('./public/logbook/poi.kml', 'utf-8');

  return (
    <div className="flex flex-col h-100-svh">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>
      {(igcFileContents ? <Viewer igc={igcFileContents} cesiumToken={cesiumToken} locationsXml={locationsXml} /> : <div>File Not Found</div>)}
    </div>
  )
}

export async function generateStaticParams() {
  const flights = await GetFlights();
  return flights.map((f) => {
    return { slug: f.id.toString() };
  });
}

