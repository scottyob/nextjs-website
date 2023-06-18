import { Flight } from '@/lib/flying';
import { Duration } from 'luxon';
import Link from 'next/link';
import tw from 'tailwind-styled-components';

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

  const tableRows = flights.map(async (r, i) => {
    const duration = Duration.fromMillis((r?.durationSeconds ?? 0) * 1000);
    let comments = undefined;
    if (r.comments) {
      comments = (
        <div className="grid grid-cols-1">
          <Header>Comments</Header>
          <Content className="p-1 pt-0">{r.commentsTruncated}</Content>
        </div>
      );
    }

    return (
      <div key={i} className="pb-4 text-sm text-gray-500">
        <div className="grid grid-cols-2">
          <Header>#</Header>
          <Content>
            <Link href={`/flying/flight/${r.number}`}>{r.number}</Link>
          </Content>
        </div>
        <div className="grid grid-cols-2">
          <Header>Location</Header>
          <Content>
            <Link href={`/flying/location/${r.location?.replace(' ', '-')}`}>
              {r.location}
            </Link>
          </Content>
        </div>
        <div className="grid grid-cols-2">
          <Header>Date</Header>
          <Content>{r.date}</Content>
        </div>
        <div className="grid grid-cols-2">
          <Header>Duration</Header>
          <Content>{duration.toFormat('hh:mm')}</Content>
        </div>
        <div className="grid grid-cols-2">
          <Header>Max Altitude</Header>
          <Content>{r.maxAltitudeMeters}</Content>
        </div>
        <div className="grid grid-cols-2">
          <Header>Altitude Gain</Header>
          <Content>{r.altitudeGainMeters}</Content>
        </div>
        <div className="grid grid-cols-2">
          <Header>Wing</Header>
          <Content>{r.wing}</Content>
        </div>
        {comments}
        <hr />
      </div>
    );
  });

  return <dl>{tableRows}</dl>;
}
