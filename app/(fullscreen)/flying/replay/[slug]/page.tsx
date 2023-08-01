import { GetFlights } from "@/lib/flying";
import Viewer from "./Viewer3D" 
import { readFileSync } from "fs";

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
    <div className="flex flex-col h-full">
      {(igcFileContents ? <Viewer igc={igcFileContents} cesiumToken={cesiumToken} locationsXml={locationsXml} /> : <div>File Not Found</div>)}
    </div>
  )
}
