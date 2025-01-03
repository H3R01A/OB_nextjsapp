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
    <main>
      <div className="mt-20 flex flex-col items-center text-2xl text-white">
        <h1>Favorite tokens</h1>
        {/* {JSON.stringify(tokens)} */}
        <div className="space-y-2">
          {tokens.map((token, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{token.name}</CardTitle>
                <CardDescription>{`Ticker Symbol: ${token.ticker}`}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{`Total Token Supply: ${token.total_supply.slice(0,8)}`}</p>
                <p>{`Wallet Balance: ${token.user_balance}`}</p>
                <p>{`Wallet Address: ${userAddress}`}</p>
              </CardContent>
              <CardFooter>
                <Button>Remove Token from Favorites</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
