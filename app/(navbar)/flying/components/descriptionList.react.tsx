"use client";

import { Flight } from '@/lib/flying';
import { Duration } from 'luxon';
import Link from 'next/link';
import tw from 'tailwind-styled-components';
import FlightCommentsField from './flightCommentsField';

const Header = tw.dt`
  p-1
  text-gray-700
  font-bold
  after:content-[':']
`;

const Content = tw.dd`
  
`;

export default function DescriptionList(props: { flights: Flight[] }) {
  const flights = props.flights;

  const tableRows = flights.map((r, i) => {
    const duration = Duration.fromMillis((r?.durationSeconds ?? 0) * 1000);
    let comments = undefined;
    if (r.comments || r.waypoints) {
      comments = (
        <dl className="grid grid-cols-1">
          <Header>Comments</Header>
          <Content className="p-1 pt-0"><FlightCommentsField flight={r} /></Content>
        </dl>
      );
    }

    return (
      <div key={i} className="pb-4 text-sm text-gray-500 text-ellipsis truncate">
        <dl className="grid grid-cols-2">
          <Header>#</Header>
          <Content className="font-bold">
            <Link href={`/flying/flight/${r.id}`}>{r.number}</Link>
          </Content>
        </dl>
        <dl className="grid grid-cols-2">
          <Header>Location</Header>
          <Content>
            <Link href={`/flying/location/${r.locationUrl}`}>
              {r.location}
            </Link>
          </Content>
        </dl>
        <dl className="grid grid-cols-2">
          <Header>Date</Header>
          <Content>{r.date}</Content>
        </dl>
        <dl className="grid grid-cols-2">
          <Header>Duration</Header>
          <Content>{duration.toFormat('hh:mm')}</Content>
        </dl>
        <dl className="grid grid-cols-2">
          <Header>Max Altitude</Header>
          <Content>{r.maxAltitudeMeters}</Content>
        </dl>
        <dl className="grid grid-cols-2">
          <Header>Altitude Gain</Header>
          <Content>{r.altitudeGainMeters}</Content>
        </dl>
        <dl className="grid grid-cols-2">
          <Header>Wing</Header>
          <Content>
            <Link href={`/flying/wing/${r.wing?.replaceAll(' ', '-')}`}>
              {r.wing}
            </Link>
          </Content>
        </dl>
        {comments}
        <hr />
      </div>
    );
  });

  return <dl>{tableRows}</dl>;
}
