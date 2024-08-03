import { Inter } from "next/font/google";

import MainHeader from "@/components/main-header"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Token Search',
  description: 'Page to find out more information about BRC20 tokens',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <MainHeader />
        {children}
        </body>
    </html>
  )
}
