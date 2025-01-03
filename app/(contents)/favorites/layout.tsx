import { Inter } from "next/font/google";

import MainHeader from "@/components/main-header"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Favortie Tokens',
  description: 'Page to see information on user\'s favorite BRC20 tokens and current balances',
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
