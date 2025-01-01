
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LaserEyesProvider, MAINNET, TESTNET } from "@omnisat/lasereyes";


const inter = Inter({ subsets: ['latin'] });

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
        <LaserEyesProvider config={{ network: TESTNET }}>
        {children}
        </LaserEyesProvider>
        
        </body>
    </html>
  );
}