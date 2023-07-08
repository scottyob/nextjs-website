"use client";

import 'cesium/Source/Widgets/widgets.css';

import { default as Igc3DViewer, Props } from '@scottyob/react-igc/Igc3DViewer'

export default function FlightViewer(props: Props) {
  return <>
    <Igc3DViewer {...props} />
  </>
}
