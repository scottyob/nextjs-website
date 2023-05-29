// Exports content that should have a non-full screen margin in an appropriate width
export default function MarginLayout({children}: {children: React.ReactNode;}) {
  return <div className="max-w-full self-center mt-7 pl-2 pr-2">{children}</div>
}

