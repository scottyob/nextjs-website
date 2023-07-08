'use client';

import { Flight } from '@/lib/flying';
import React from 'react';
import dynamic from 'next/dynamic';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface HoursByLocationProps {
  flights: Flight[];
}

export default function HoursBySite(props: HoursByLocationProps) {
  const { flights } = props;

  // Grouping data by location and year
  const groupedData: { [location: string]: { [year: number]: number } } = {};
  const timeByLocation: { [location: string]: number } = {};
  flights.forEach((f) => {
    const location = f.location ?? 'Unknown';
    const year = new Date(f.date).getFullYear();

    if (!groupedData[location]) {
      groupedData[location] = {};
      timeByLocation[location] = 0;
    }
    if (!groupedData[location][year]) {
      groupedData[location][year] = 0;
    }
    // Seconds to hours
    const hrs = (f.durationSeconds ?? 0) / 60 / 60;
    groupedData[location][year] += hrs;
    timeByLocation[location] += hrs;
  });

  // Extracting locations and years
  const locations = Object.keys(groupedData);
  locations.sort((a, b) => { return timeByLocation[b] - timeByLocation[a] });

  const years = Array.from(
    new Set(flights.map((entry) => new Date(entry.date).getFullYear()))
  ).sort();

  // Creating data series
  const series: Plotly.Data[] = years.map((year) => ({
    x: locations,
    y: locations.map((location) => groupedData[location][year] || 0),
    type: 'bar',
    name: year.toString()
  }));

  const layout: Partial<Plotly.Layout> = {
    barmode: 'stack',
    yaxis: { title: 'Duration (hrs)', tickformat: 'd' },
    xaxis: { tickangle: -45 },
    legend: {
      orientation: 'h',
      font: { size: 9 },
      yanchor: 'bottom',
      y: 130,
      xanchor: 'center'
    },
    margin: {
      r: 0,
      l: 40,
      t: 30,
      b: 100,
      pad: 0
    }
  };

  const config: Partial<Plotly.Config> = {
    displayModeBar: false,
    displaylogo: false
  };

  return (
    <Plot
      className="w-full h-[400px]"
      data={series}
      layout={layout}
      config={config}
      useResizeHandler={true}
    />
  );
}
