'use client';

import { Climb, ClimbType } from "./types";

export default function ScatterPlot(props: { climbs: Climb[], type: ClimbType }) {
  const climbs = props.climbs.filter(c => c.type == props.type);

  const data: Plotly.Data = {
    type: 'scatter',
    mode: 'markers',
  }

}
