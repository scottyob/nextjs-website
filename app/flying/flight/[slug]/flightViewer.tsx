"use client";

// @scottyob/react-igc/dist/esm works
import { lazy, useEffect, useState } from "react";

// Hack from https://github.com/vercel/next.js/discussions/42319#discussioncomment-4061453
const IgcViewer = lazy(() => import("@scottyob/react-igc/dist/esm/components/IgcViewer"));

// import { IgcViewer } from "@scottyob/react-igc";

export default function FlightViewer(props: { igc: string }) {
  const [isClientSide, setClientSide] = useState(false);

  useEffect(() => {
    setClientSide(true);
  }, []);

  if (!isClientSide) {
    return null;
  }

  return <IgcViewer
    igc={props.igc}
    zoom={13}
    scrollWheelZoom={false}
    zoomControl={false}
    keyboard={false}
    tap={false}
    doubleClickZoom={false}
    dragging={false}
  />
}
