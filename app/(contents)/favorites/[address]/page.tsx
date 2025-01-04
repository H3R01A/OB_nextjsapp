'use client';
import '../../../globals.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { ThreeCircles } from 'react-loader-spinner';

interface PageProps {
  params: { address: string };
}

export default function FavoritesPage(props: PageProps) {
  const [tokens, setTokens] = useState<any[]>([]);
  const userAddress = props.params.address;

  const handleDeleteTokenFrmDB = async (index: number) => {
    const updatedTokens = tokens.filter((_, i) => i !== index);
    setTokens(updatedTokens);

    try {
      await fetch('/api/tokenhandlers/deleteToken', {
        method: 'POST',
        body: JSON.stringify({
          ticker: tokens[index].ticker,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Failed to delete token:', error);
      setTokens(tokens); // Rollback to the original state
    }
  };

  const handleFavoriteTokenFrmDB = async () => {
    const response = await fetch('/api/tokenhandlers/favoriteToken', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await handleFavoriteTokenFrmDB();
      setTokens(data);
    };

    void fetchData();
  }, []);

  if (tokens.length === 0) {
    return (
      <div className="mt-20 flex flex-col items-center text-white">
        <p>Fetching data...</p>
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#ffffff"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

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
                <Button
                  variant="secondary"
                  className="mt-8 w-full bg-sky-500 p-5 hover:bg-sky-800"
                  onClick={() => handleDeleteTokenFrmDB(index)}
                >
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
