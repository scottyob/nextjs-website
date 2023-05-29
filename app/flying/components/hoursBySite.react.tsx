"use client";

import { Flight } from "@/lib/flying";
import React from "react";
import Plot from "react-plotly.js";

interface HoursByLocationProps {
  flights: Flight[];
}

export default function HoursBySite(props: HoursByLocationProps) {
  const { flights } = props;

  // Grouping data by location and year
  const groupedData: { [location: string]: { [year: number]: number } } = {};
  flights.forEach((f) => {
    const location = f.location ?? "Unknown";
    const year = new Date(f.date).getFullYear();

    if (!groupedData[location]) {
      groupedData[location] = {};
    }
    if (!groupedData[location][year]) {
      groupedData[location][year] = 0;
    }
    // Seconds to hours
    groupedData[location][year] += (f.durationSeconds ?? 0) / 60 / 60;
  });

  // Extracting locations and years
  const locations = Object.keys(groupedData);
  const years = Array.from(
    new Set(flights.map((entry) => new Date(entry.date).getFullYear()))
  ).sort();

  // Creating data series
  const series: Plotly.Data[] = years.map((year) => ({
    x: locations,
    y: locations.map((location) => groupedData[location][year] || 0),
    type: "bar",
    name: year.toString(),
  }));

  const layout: Partial<Plotly.Layout> = {
    barmode: "stack",
    yaxis: { title: "Duration (hrs)", tickformat: "d" },
    xaxis: {tickangle: -45},
    legend: { orientation: "h", font: {size: 9}, yanchor: "bottom", y: 130, xanchor: "center"},
    margin: {
      r: 0,
      l: 40,
      t: 30,
      b: 100,
      pad: 0
    },
  };

  const config: Partial<Plotly.Config> = {
    displayModeBar: false,
    displaylogo: false,
  }

  return <Plot 
    className="w-full h-[400px]"
    data={series} layout={layout} config={config}
    useResizeHandler={true}
  />;
};

