'use client';

import { Exo_2 } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const exo_2 = Exo_2({ weight: '500', subsets: ['latin'], style: 'italic' });

export default function Navbar() {
  // Get the current page
  const pathname = usePathname();

  const liClass = 'transition group duration-300 whitespace-nowrap';

  // Underline components
  const underlineClass =
    'block group-hover:max-w-[70%] ml-2 transition-all duration-500 h-0.5';
  const unselected = (
    <span
      className={
        underlineClass + ' max-w-0 bg-orange-50 group-hover:bg-orange-400'
      }
    />
  );
  const selected = (
    <span className={underlineClass + ' max-w-[70%] bg-orange-500'} />
  );

  return (
    <ul
      className={[
        'flex flex-wrap justify-center space-x-2 text-gray-400 italic pt-3 max-w-full',
        exo_2.className
      ].join(' ')}
    >
      <li className={liClass}>
        <Link href="/">Writings/Projects</Link>
        {pathname === '/' || pathname.toLowerCase().startsWith('/post')
          ? selected
          : unselected}
      </li>
      <li className={liClass}>
        <Link href="/about">About</Link>
        {pathname.startsWith('/about') ? selected : unselected}
      </li>
      <li className={liClass}>Bucket List{unselected}</li>
      <li className={liClass}>
        <Link href="/recipes">Cooking</Link>
        {pathname.startsWith('/recipes') ? selected : unselected}
      </li>
      <li className={liClass}>
        <Link href="/flying">Flying</Link>
        {pathname.startsWith('/flying') ? selected : unselected}
      </li>
    </ul>
  );
}
