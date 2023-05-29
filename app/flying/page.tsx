import { GetFlights } from "@/lib/flying";
import FlightsList from "./components/flightsList.react";

export default async function Flying() {
  const results = await GetFlights();

  return <FlightsList flights={results} />
}
