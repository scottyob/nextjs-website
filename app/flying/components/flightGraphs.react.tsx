'use client';

import { Flight } from '@/lib/flying';

import ScatterPlot from './scatterPlot.react';
import { HoursByYear } from './hoursByYear.react';
import tw from 'tailwind-styled-components';
import { Dispatch, SetStateAction, useState } from 'react';
import HoursBySite from './hoursBySite.react';

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

export default function FlightGraphs(props: { flights: Flight[] }) {
  const { flights } = props;
  const [selected, setSelected] = useState('Flights');

  return (
    <div className="max-w-full text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-4">
      <ul className="flex flex-wrap -mb-px">
        <TabItem
          selected={selected}
          setSelected={setSelected}
          title="Flights"
        />
        <TabItem
          selected={selected}
          setSelected={setSelected}
          title="By Year"
        />
        <TabItem
          selected={selected}
          setSelected={setSelected}
          title="By Location"
        />
      </ul>
      <div className="min-h-[600px]">
        {selected == 'Flights' && <ScatterPlot flights={flights} />}
        {selected == 'By Year' && <HoursByYear flights={flights} />}
        {selected == 'By Location' && <HoursBySite flights={flights} />}
      </div>
    </div>
  );
}
