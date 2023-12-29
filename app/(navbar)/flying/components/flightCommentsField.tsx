import { Flight } from '@/lib/flying';

export default function FlightCommentsField(props: { flight: Flight }) {
  const { flight } = props;

  let taskBadge = undefined;
  if(flight.waypoints?.length && flight.waypoints[0].achievedTime) {
    taskBadge = 
        <span className="bg-green-300 rounded-md p-1 ">
          TASK{' '}
          <span className="text-xs">
            (
            {flight.waypoints.reduce((v, w) => {
              return v + (w.achievedTime ? 1 : 0);
            }, 0)}
            /{flight.waypoints.length})
          </span>
        </span>
  }

  return (
    <>
      {taskBadge}
      {" "}
      {flight.commentsTruncated}
    </>
  );
}
