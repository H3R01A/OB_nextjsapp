import '../../../globals.css';
import { getFavoritesFrmDB } from '@/db/supabase/utils/database-helpers';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: { address: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function FavoritesPage(props: PageProps) {
  const userAddress = props.params.address;
  const tokens = await getFavoritesFrmDB();

  return (
    <main className="container mx-auto px-4">
      <div className="mt-20 flex flex-col items-center text-white">
        <h1 className="mb-24 text-3xl font-bold">Favorites</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tokens.map((token, index) => (
            <Card
              className="h-[22rem] border-white/[.30] bg-gradient-to-b from-gray-800 to-gray-900 text-white"
              key={index}
            >
              <CardHeader>
                <CardTitle className="text-xl">{token.name}</CardTitle>
                <CardDescription className="text-gray-300">{`Ticker Symbol: ${token.ticker}`}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{`Total Token Supply: ${token.total_supply.slice(0, 8)}`}</p>
                <p className="text-sm">{`Wallet Balance: ${token.user_balance}`}</p>
                <p className="text-sm">{`Wallet Address: ${userAddress.slice(0, 4)}...${userAddress.slice(-5)}`}</p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full mt-8 bg-sky-500 p-5 hover:bg-sky-800">
                  Remove from Favorites
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}

