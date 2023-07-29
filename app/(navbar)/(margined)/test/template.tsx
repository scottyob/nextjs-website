import { headers } from 'next/headers';

export default function MarginLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
     const domain = headersList.get('host') || "";
    const fullUrl = headersList.get('referer') || ""; 

  return <div>
    <div>I am a layout</div>
    <div>{fullUrl}</div>
    <div>{domain}</div>
    {children}
  </div>;
}
