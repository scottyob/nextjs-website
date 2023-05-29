'use client';

import { Flight } from '@/lib/flying';
import dynamic from 'next/dynamic';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export function HoursByYear(props: { flights: Flight[] }) {
  const { flights } = props;

  // Grouping data by year and location
  const groupedData: { [year: number]: { [location: string]: number } } = {};
  flights.forEach((f) => {
    const location = f.location ?? 'Unknown';

    const year = new Date(f.date).getFullYear();
    if (!groupedData[year]) {
      groupedData[year] = {};
    }
    if (!groupedData[year][location]) {
      groupedData[year][location] = 0;
    }
    // Seconds to hours
    groupedData[year][location] += (f.durationSeconds ?? 0) / 60 / 60;
  });

  // Extracting years and locations
  const years = Object.keys(groupedData)
    .map((year) => parseInt(year))
    .sort();
  const locations = Array.from(
    new Set(flights.map((entry) => entry.location ?? 'Unknown'))
  );

  // Creating data series
  const series: Plotly.Data[] = locations.map((location) => ({
    x: years,
    y: years.map((year) => groupedData[year][location] || 0),
    type: 'bar',
    name: location
  }));

  const layout: Partial<Plotly.Layout> = {
    barmode: 'stack',
    yaxis: { title: 'Duration (hrs)', tickformat: 'd' },
    height: 400,
    legend: { orientation: 'h', font: { size: 9 } },
    margin: {
      r: 0,
      l: 40,
      t: 30,
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
