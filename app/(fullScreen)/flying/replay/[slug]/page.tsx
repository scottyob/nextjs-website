import React from "react"
import { Flight, GetFlights } from "@/lib/flying";
import FlightViewer from './FlightViewer';
import { readFileSync } from "fs";

type Props = {
  params: { slug: string };
}

export default async function Page(props: Props) {
  const igcPath = props.params.slug;
  const flights = await GetFlights();

  // Load up my site points of interest
  const poi = readFileSync('public/logbook/poi.kml', {
      flag: 'r',
      encoding: 'utf8'
    });

  // Load the flight from disk
  const flight = flights.find((f) => f.fileName == igcPath) as Flight;
  return <>
    <FlightViewer igc={flight.fileContents as string} locationsXml={poi} />

  </>

}

export async function generateStaticParams() {
  let flights = await GetFlights();
  flights = flights.filter((f) => f.fileName);
  return flights.map((f) => {
    return { slug: f.fileName as string }
  })
}
