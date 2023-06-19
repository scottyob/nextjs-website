'use client';

import { Flight } from '@/lib/flying';
import { Duration } from 'luxon';
import * as Plotly from 'plotly.js';

import dynamic from 'next/dynamic';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

function humanFlightTime(flight: Flight) {
  return Duration.fromMillis((flight.durationSeconds ?? 0) * 1000)
    .rescale()
    .set({ seconds: 0 })
    .rescale()
    .toHuman();
}

export default function ScatterPlot(props: { flights: Flight[] }) {
  const { flights } = props;
  const durations = flights.map((f) => (f.durationSeconds ?? 0) / 60);

  const data: Plotly.Data = {
    type: 'scatter',
    mode: 'markers',
    marker: { size: durations, sizemode: 'area' },
    transforms: [
      {
        type: 'groupby',
        groups: flights.map((f) => f.location ?? 'Unknown')
      }
    ],
    title: {
      text: 'Flight Duration (minutes)',
      position: 'top center'
    },
    x: flights.map((f) => f.date),
    y: durations,
    text: flights.map(
      (f) => {
        let hover = `
          <b>${humanFlightTime(f)}</b><br />
          Flight: ${f.number}<br />
          ${f.location}<br />
          <i>${f.launchName}</i>
          `
        if(f.commentsTruncated) {
          hover += `
            <br /><br />${f.commentsTruncated}
          `
        }
        return hover;
      }
    ),
    hovertemplate: '%{text}'
  };

  return (
    <Plot
      data={[data]}
      className="w-full h-[600px]"
      useResizeHandler={true}
      style={{ width: '100%' }}
      layout={{
        legend: {
          orientation: 'h'
        },
        margin: {
          r: 0,
          l: 30,
          t: 30,
          pad: 0
        }
      }}
      config={{
        displayModeBar: false,
        displaylogo: false
      }}
    />
  );
}
