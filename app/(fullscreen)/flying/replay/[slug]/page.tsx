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

  return (
    <div className="flex flex-col h-full">
      {(igcFileContents ? <Viewer igc={igcFileContents} /> : <div>File Not Found</div>)}
    </div>
  )
}
