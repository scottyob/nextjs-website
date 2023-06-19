import Navbar from '@/components/Navbar.react';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
import { Capriola } from 'next/font/google';
import Link from 'next/link';

// Header font
const capriola = Capriola({ weight: '400', subsets: ['latin'] });

export const metadata = {
  title: "Scott O'Brien",
  description: 'My online creative outlet'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex max-w-full w-full flex-col pt-8 pb-8">
          <div className="self-center w-full">
            <h1
              className={['text-center text-4xl', capriola.className].join(' ')}
            >
              <Link href="/">{"Scott O'Brien"}</Link>
            </h1>
            <Navbar />
          </div>
          <div className="w-full flex flex-col" id='main-content'>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
