"use client";

import React from 'react'
import IGCParser from 'igc-parser'
import Map, { Source, Layer } from 'react-map-gl/maplibre';

type Props = {
  igc: string
}

export default function Viewer2D(props: Props) {
  const igc = props.igc
  const flight = IGCParser.parse(igc)

  // const task = flight.task;
  const position = { lat: flight.fixes[0].latitude, lng: flight.fixes[0].longitude }
  const positions = flight.fixes.map((p) => {
    return {
      lat: p.latitude,
      lng: p.longitude,
    }
  })

  const data = {
    type: "Feature",
    geometry: {
      type: 'LineString',
      coordinates: positions.map(p => [p.lng, p.lat])
    }
  }

  return (
    <div className="pb-4">
      <Map
        initialViewState={{
          longitude: position.lng,
          latitude: position.lat,
          zoom: 12
        }}
        style={{ width: "100%", height: 400 }}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=KFYBsfFWC5kx8RrE5mb8"
        attributionControl={false}
        scrollZoom={false}
        touchZoomRotate={false}
        dragPan={false}
        doubleClickZoom={false}
      >
        <Source type='geojson' data={data}>
          <Layer
            type='line'
            paint={{
              "line-width": 2,
              "line-color": "green",
            }}
          />
        </Source>
      </Map>
    </div>
  )
}

