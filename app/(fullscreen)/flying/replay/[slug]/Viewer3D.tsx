"use client";

import Viewer from "@scottyob/react-igc"
import 'cesium/Source/Widgets/widgets.css';

type Props = {
  igc: string;
  cesiumToken: string;
  locationsXml: string;
}

export default function Viewer3D(props: Props) {
  return <Viewer igc={props.igc} cesiumToken={props.cesiumToken} locationsXml={props.locationsXml} />;
}
