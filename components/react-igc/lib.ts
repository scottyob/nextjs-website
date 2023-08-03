// import IGCParser from 'igc-parser'

export type Waypoint = {
  longitude: number
  latitude: number
  altitude: number
  name: string
  description?: string
  radiusMeters?: number
}

function parseCoordinate(position: string, direction: string) {
  const [degrees, minutes, seconds] = toDegreesMinutesSeconds(position)

  let dd = degrees + minutes / 60.0 + seconds / (60 * 60.0)

  if (direction == 'S' || direction == 'W') {
    dd = dd * -1
  } // Don't do anything for N or E
  return dd
}

function toDegreesMinutesSeconds(input: string) {
  let deg = parseInt(input.slice(0, 2), 10)
  let min = parseInt(input.slice(2, 4), 10)
  let sec = parseInt(input.slice(4, 7), 10)

  // East / West has one more degree
  if (input.length == 8) {
    deg = parseInt(input.slice(0, 3), 10)
    min = parseInt(input.slice(3, 5), 10)
    sec = parseInt(input.slice(5, 8), 10)
  }

  return [deg, min, sec]
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

    const taskRegex = /C(?<ns>[0-9]+)(?<nsBearing>[NS])(?<ew>[0-9]+)(?<ewBearing>[EW])(?<name>.*)/g
    const taskGroups = taskRegex.exec(task)?.groups

    if (taskGroups == null) {
      continue
    }

    waypoints.push({
      latitude: parseCoordinate(taskGroups['ns'], taskGroups['nsBearing']),
      longitude: parseCoordinate(taskGroups['ew'], taskGroups['ewBearing']),
      name: taskGroups['name'],
      radiusMeters: radius,
      altitude: 0,
    })
  }

  return waypoints
}
