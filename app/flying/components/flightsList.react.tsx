import { Flight } from "@/lib/flying";
import FlightTable from "./flightTable.react";
import DescriptionList from "./descriptionList.react";
import FlightStats from "./flightStats";
import FlightGraphs from "./flightGraphs.react";

export type Props = {
  flights: Flight[];
}

export default function FlightsList(props: Props) {
  const {flights} = props;

  return <div className="lg:pl-4 lg:pr-4">
    {/* Flight Statistic Bubbles */}
    <FlightStats flights={flights} />

    {/* Flight charts */}
    <FlightGraphs flights={flights} />

    <div className="hidden sm:block">
      <FlightTable flights={flights} />
    </div>
    <div className="sm:hidden">
      <DescriptionList flights={flights} />
    </div>
  </div>;
}
