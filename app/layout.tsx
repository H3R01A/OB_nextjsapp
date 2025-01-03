'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LaserEyesProvider, MAINNET, TESTNET } from '@omnisat/lasereyes';
import { useState } from 'react';
import { UserContext } from '@/utils/context';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'OB Next App',
//   description: 'OB Next App for Your Bitcoin and Ordinal Needs',
// };



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentUser, setCurrentUser] = useState({address: ""});

  return (
    <html lang="en">
      <body className="bg-zinc-800">
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <LaserEyesProvider config={{ network: MAINNET }}>
            {children}
          </LaserEyesProvider>
        </UserContext.Provider>
      </body>
    </html>
  );
}
