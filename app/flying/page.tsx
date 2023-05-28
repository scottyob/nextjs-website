import { GetFlights } from "@/lib/flying";
import FlightTable from "./components/flightTable.react";
import DescriptionList from "./components/descriptionList.react";
import FlightStats from "./components/flightStats";

export default async function Flying() {
  const results = await GetFlights();

  return <div>
    <FlightStats flights={results} />
    <div className="hidden sm:block">
      <FlightTable flights={results} />
    </div>
    <div className="sm:hidden">
      <DescriptionList flights={results} />
    </div>
  </div>;
}
