'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { Climb, ClimbType } from '../types';
import tw from 'tailwind-styled-components';
import * as Plotly from 'plotly.js';

import dynamic from 'next/dynamic';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

const SelectedA = tw.a`
  active
  border-b-2
  border-blue-600
  dark:border-blue-500
  dark:text-blue-500
  inline-block
  p-4
  rounded-t-lg
  text-blue-600 
`;

const UnselectedA = tw.a`
  border-b-2
  border-transparent
  dark:hover:text-gray-300
  hover:border-gray-300
  hover:text-gray-600
  inline-block
  p-4
  rounded-t-lg
`;

type TabItemProps = {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  title: string;
};

function TabItem(props: TabItemProps) {
  const { title } = props;
  const selected = props.selected == props.title;

  return (
    <li className="mr-2">
      {selected && <SelectedA aria-current="page">{title}</SelectedA>}
      {!selected && (
        <UnselectedA onClick={() => props.setSelected(title)}>
          {title}
        </UnselectedA>
      )}
    </li>
  );
}

function ScatterPlot(props: { climbs: Climb[] }) {
  const { climbs } = props;

  const data: Plotly.Data = {
    type: 'scatter',
    mode: 'markers',
    x: climbs.map((c) => c.date),
    y: climbs.map((c) => c.rating)
  };

  const orderArray = [
    'Partner',
    'V0',
    'V1',
    'V2',
    'V3',
    'V4',
    'V5',
    'V6',
    'Intro',
    ...['5.6', '5.7', '5.8', '5.9'],
    ...['5.10', '5.11', '5.12'].flatMap(
      (prefix) => (
        ['a', 'b', 'c', 'd'].map((suffix) => `${prefix}${suffix}`)
      )
    )
  ];

  return (
    <Plot
      data={[data]}
      className="w-full h-[600px]"
      useResizeHandler={true}
      style={{ width: '100%' }}
      layout={{
        dragmode: false,
        margin: {
          r: 0,
          l: 30,
          t: 30,
          pad: 0
        },
        yaxis: {
          categoryarray: orderArray,
          categoryorder: 'array'
        }
      }}
      config={{
        displayModeBar: false,
        displaylogo: false,
        scrollZoom: false
      }}
    />
  );
}

export default function FlightGraphs(props: { climbs: Climb[] }) {
  const [selected, setSelected] = useState('Bouldering');

  const climbs =
    selected == 'Bouldering'
      ? props.climbs.filter((c) => c.type == ClimbType.Bouldering)
      : props.climbs.filter((c) => c.type == ClimbType.TopRoping);

  return (
    <div className="max-w-full text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-4">
      <ul className="flex flex-wrap -mb-px">
        <TabItem
          selected={selected}
          setSelected={setSelected}
          title="Bouldering"
        />
        <TabItem
          selected={selected}
          setSelected={setSelected}
          title="Top Roping"
        />
      </ul>
      <div className="min-h-[600px]">
        {selected == 'Bouldering' ? (
          <ScatterPlot climbs={climbs} />
        ) : (
          <ScatterPlot climbs={climbs} />
        )}
      </div>
    </div>
  );
}
