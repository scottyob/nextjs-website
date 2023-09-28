import { Flight } from "@/lib/flying";
import Link from "next/link";
import { FaRuler } from "react-icons/fa";
import { GiFilmProjector, GiRunningShoe } from "react-icons/gi";

export type Props = {
  sportsTrackLiveUrl?: string;
  flight: Flight;
}

const LinkClassName = "rounded-lg bg-orange-50 m-2 p-2";

export default function FlightLinks(props: Props) {
  const { sportsTrackLiveUrl, flight } = props;

  const replay = <Link className={LinkClassName} href={`/flying/replay/${flight.id}`} target='_blank'>
    <GiFilmProjector className="text-5xl m-auto" />
    Replay flight
  </Link>

  const stl = sportsTrackLiveUrl ?
    <a href={sportsTrackLiveUrl} className={LinkClassName} target='_blank'>
      <GiRunningShoe className="text-5xl m-auto" />
      <div>SportsTrackLive</div>
    </a> :
    undefined;

  const flightUrl = `https://www.scottyob.com/${flight.igcFile?.filePath.replace(/^public\//, '')}`;
  const replayFlights = <a href={`https://replay.flights?files=${flightUrl}`} className={LinkClassName} target='_blank' >
    <FaRuler className="text-5xl m-auto" />
    <div>replay.flights</div>
  </a>;

  return <div className="flex flex-row pb-4 m-auto justify-center">
    {replay}
    {stl}
    {replayFlights}
  </div>;
}
