import Navbar from "@/components/Navbar.react";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import { Capriola } from "next/font/google";
import Link from "next/link";

// Header font
const capriola = Capriola({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Scott O'Brien",
  description: "My online creative outlet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex w-full flex-col p-8">
          <div className="self-center">
            <h1
              className={["text-center text-4xl", capriola.className].join(" ")}
            >
              <Link href="/">Scott O&apos;Brien</Link>
            </h1>
            <Navbar />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
