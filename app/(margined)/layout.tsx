// Exports content that should have a non-full screen margin in an appropriate width
export default function MarginLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className="self-center mt-7 max-w-2xl w-[80%]">{children}</div>;
}
