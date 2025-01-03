import type { Metadata } from 'next';
import '../globals.css';
import MainHeader from '@/components/main-header';

export const metadata: Metadata = {
  title: 'OB Next App',
  description: 'OB Next App for Your Bitcoin and Ordinal Needs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-zinc-800">
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
