import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={`${inter.className} h-full`}>
        <div className="flex w-full max-w-full h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
