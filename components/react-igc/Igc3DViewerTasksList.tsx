import { Waypoint } from "@/lib/waypoints";

export default function Igc3DViewerTaskList(props: { waypoints: Waypoint[] }) {

  // Styling
  const renderStyles = {
    all: 'm-1 rounded-md',
    achieved: 'bg-green-300',
    failed: 'bg-gray-300'
  };

  // Build the components list
  const items = props.waypoints.map((w, i) => {
    const className = [
      renderStyles.all,
      w.achievedTime ? renderStyles.achieved : renderStyles.failed
    ].join(' ');

    return (
      <div key={i} className={className}>
        {w.name}
      </div>
    );
  });

  // Render the task list
  return (
    <div style={{ position: 'absolute', top: '0', left: '0' }}>{items}</div>
  );
}
