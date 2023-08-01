
export default function FullScreenLayout({ children }: { children: React.ReactNode }) {
  return <body className="h-screen m-0 p-0">
    {children}
  </body>;
}

