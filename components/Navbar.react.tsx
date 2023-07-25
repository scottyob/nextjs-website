'use client';

import { Exo_2 } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ImPencil2, ImMan, ImList2 } from "react-icons/im";
import { GiCampCookingPot, GiLibertyWing } from "react-icons/gi";

const exo_2 = Exo_2({ weight: '500', subsets: ['latin'], style: 'italic' });

export default function Navbar() {
  // Get the current page
  const pathname = usePathname();

  const liClass = 'transition group duration-300 whitespace-nowrap';

  // Underline components
  const underlineClass =
    'block group-hover:max-w-[50%] ml-2 transition-all duration-500 h-0.5';
  const unselected = (
    <span
      className={
        underlineClass + ' max-w-0 bg-orange-50 group-hover:bg-orange-400'
      }
    />
  );
  const selected = (
    <span className={underlineClass + ' max-w-[50%] bg-orange-500'} />
  );

  return (
    <ul
      className={[
        'flex flex-wrap justify-around space-x-4 text-gray-400 italic pt-3 mb-8 max-w-2xl w-[80%] m-auto',
        '[&_svg]:inline [&_svg]:mr-1',
        exo_2.className,
      ].join(' ')}
    >
      <li className={liClass}>
        <Link href="/"><ImPencil2 />Writings/Projects</Link>
        {pathname === '/' || pathname.toLowerCase().startsWith('/post')
          ? selected
          : unselected}
      </li>
      <li className={liClass}>
        <Link href="/about"><ImMan />About</Link>
        {pathname.startsWith('/about') ? selected : unselected}
      </li>
      <li className={liClass}>
        <Link href="/bucketlist"><ImList2 />Bucket List</Link>
        {pathname.startsWith('/bucketlist') ? selected : unselected}
      </li>
      <li className={liClass}>
        <Link href="/recipes"><GiCampCookingPot />Cooking</Link>
        {pathname.startsWith('/recipes') ? selected : unselected}
      </li>
      <li className={liClass}>
        <Link href="/flying"><GiLibertyWing />Flying</Link>
        {pathname.startsWith('/flying') ? selected : unselected}
      </li>
    </ul>
  );
}
