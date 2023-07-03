"use client";

import { IgcViewer } from "@scottyob/react-igc";

export default function FlightViewer(props: {igc: string}) {
  return <IgcViewer igc={props.igc} />
}
