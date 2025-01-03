
import MainHeader from "@/components/main-header"


export const metadata = {
  title: 'Token Search',
  description: 'Page to find out more information about BRC20 tokens and current balances',
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
