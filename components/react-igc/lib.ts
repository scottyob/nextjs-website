// import IGCParser from 'igc-parser'

export type Waypoint = {
  longitude: number
  latitude: number
  altitude: number
  name: string
  description?: string
  radiusMeters?: number
}

// Parses an IGC file to extract tasks
// This works with FlySkyHy files and
// SeeYou Navigator
// See https://xp-soaring.github.io/igc_file_format/igc_format_2008.html
// for more details
export function GscWaypoints(input: string) {
  // This will match up the C records that contain the waypoint in Navigator files
  // With the log information that contains width
  // C3645907N11905878WDNLNCH
  // LXNAOZN=0,Style=1,R1=1000.0m,A1=180.0,R2=0.0m,A2=0.0,PntElev=1511.0m

  const lines = input.split('\n')
  let taskRecords = lines.filter((l) => l.startsWith('C'))
  const commentRecords = lines.filter((l) => l.startsWith('LXNAOZN'))

  // First C is task date
  // Then takeoff
  // Last is landing
  taskRecords = taskRecords.slice(2, -1)

  const waypoints: Waypoint[] = []

  for (let i = 0; i < taskRecords.length; i++) {
    let radius: number | undefined = undefined

    const task = taskRecords[i]

    const comment = commentRecords.filter((l) => l.includes(`LXNAOZN=${i - 1}`) && l.includes('R1='))[0]
    const commentRadius = /R1=(\d+)/.exec(comment)?.[1]

    // Pull the radius from the comments for Navigator tracklogs
    if (comment != null && commentRadius != null) {
      radius = parseInt(commentRadius, 10)
    } else {
      // The first characters are where the C, and coordinates.
      // "C....0012000 0032000 122000 182000TURN AREA" would be an area from 12 to 32 km from the WP between the bearings 122 and 182 from the Point
      const str = task.slice(18).slice(8, 7 * 2)
      radius = parseInt(str, 10)
    }

    // Pull from C records
    const taskRegex = /C(?<nsDegree>[0-9]{2})(?<nsMinute>[0-9]{2})(?<nsMinuteFraction>[0-9]{3})(?<nsBearing>[NS])(?<ewDegree>[0-9]{3})(?<ewMinute>[0-9]{2})(?<ewMinuteFraction>[0-9]{3})(?<ewBearing>[EW])[0-9]*\ ?(?<name>.*)/g;
    const taskGroups = taskRegex.exec(task)?.groups;

    if (taskGroups == null) {
      continue
    }
   
    // Build the Degrees, Minutes, Seconds for latitude and longitude
    const latitude = (
      (Number.parseInt(taskGroups['nsDegree']) + 
      (Number.parseFloat(`${taskGroups['nsMinute']}.${taskGroups['nsMinuteFraction']}`) / 60))
      * (taskGroups['nsBearing'] == 'S' ? -1 : 1)
    );
    const longitude = (
      (Number.parseInt(taskGroups['ewDegree']) + 
      (Number.parseFloat(`${taskGroups['ewMinute']}.${taskGroups['ewMinuteFraction']}`) / 60))
      * (taskGroups['ewBearing'] == 'W' ? -1 : 1)
    );

    waypoints.push({
      latitude,
      longitude,
      name: taskGroups['name'],
      radiusMeters: radius,
      altitude: 0,
    })
  }


  return waypoints
}
