import { Inter } from "next/font/google";
import '../../globals.css';

import MainHeader from "@/components/main-header"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Order Check',
  description: 'Page to check your the status of any order',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-800">
      <MainHeader />
        {children}
        </body>
    </html>
  )
}
