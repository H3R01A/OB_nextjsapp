'use client';
import '../../../globals.css';
import { getTickerData, getTickerBalance } from '@/actions/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { WalletBalance, TickerInfo } from '../../../../utils/types';
import { ThreeCircles } from 'react-loader-spinner';

interface PageProps {
  params: { ticker: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function TickerPage(props: PageProps) {
  const ticker = props.params.ticker.toLowerCase();
  const address = props.searchParams?.address;
  let userBalance = '';
  const [balanceData, setBalanceData] = useState<WalletBalance | undefined>(
    undefined
  );
  const [tickerData, setTickerData] = useState<TickerInfo | undefined>(
    undefined
  );
  const [tokenFavorited, setTokenFavorited] = useState(false);

  const tickerInfo = tickerData?.result;

  const handleAddTokenToDB = async () => {
    setTokenFavorited(true);
    await fetch('/api/tokenhandlers/addToken', {
      method: 'POST',
      body: JSON.stringify({
        ticker: tickerInfo?.original_tick,
        name: tickerInfo?.original_tick,
        user_balance: userBalance,
        total_supply: tickerInfo?.max_supply,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const handleDeleteTokenFrmDB = async () => {
    setTokenFavorited(false);
    await fetch('/api/tokenhandlers/deleteToken', {
      method: 'POST',
      body: JSON.stringify({
        ticker: tickerInfo?.original_tick,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const handlefindToken = async (ticker: string) => {
    const response = await fetch('/api/tokenhandlers/findToken', {
      method: 'POST',
      body: JSON.stringify({
        ticker,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log(`data from handlefindToken ${data}`);
    return data;
  };

  if (balanceData?.error === 'no balance found' || !balanceData) {
    userBalance = '0';
  } else if (balanceData?.error) {
    userBalance = 'error retrieving user balance';
  } else {
    userBalance = balanceData?.result[0].available_balance;
  }

  useEffect(() => {
    const fetchData = async () => {
      setTickerData(await getTickerData(ticker));

      setBalanceData(await getTickerBalance(address as string, ticker));

      //fetch to see if token is in database, if so fill in a heart or something
      setTokenFavorited(await handlefindToken(ticker));
    };

    void fetchData();
  }, [ticker, address]);

  useEffect(() => {
    const fetchData = async () => {};

    void fetchData();
  }, [tokenFavorited]);

  if (tickerData?.error) {
    return (
      <div className="mt-20 flex flex-col items-center text-white">
        <p>
          Unfortinately the BRC20 Token you entered is not available yet in our
          application
        </p>
        <p>
          Please submit a request at customersupport@ordinalsbot.com for us to
          add support for this token
        </p>
      </div>
    );
  }

  if (!address) {
    return (
      <div className="mt-20 flex flex-col items-center text-white">
        <p>Please enter a valid wallet address and try again</p>
      </div>
    );
  }

  if (!tickerData?.result) {
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
    <main>
      <div className="mt-20 flex flex-col items-center text-white">
        <Card className="h-[28rem] w-[50rem] border-white/[.30] bg-gradient-to-b from-gray-800 to-gray-900 text-white">
          <CardHeader className="mt-4 flex flex-row">
            <div className="mr-3">{tokenFavorited && <Heart color="red" fill="red" />}</div>
            <CardTitle className="mr-2">{tickerInfo?.original_tick}</CardTitle>
            <CardDescription>Ticker Symbol: {`${tickerInfo?.original_tick}`}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p>Max Supply: {tickerInfo?.max_supply.slice(0, 8)}</p>
            <p>Remaining Supply: {tickerInfo?.max_supply.slice(0, 8)}</p>
            <p>Limit Per Mint: {tickerInfo?.limit_per_mint.slice(0, 8)}</p>
            <p>Current Block Height: {tickerInfo?.block_height}</p>
            <br></br>
            <h2>Transferable Balance</h2>
            {!balanceData?.result ? (
              <p>
                This wallet has a 0 balance of the{' '}
                {`${tickerInfo?.original_tick}`} token
              </p>
            ) : (
              <>
                <p>Your Overall Balance: {userBalance}</p>
                <p>Available Balance To Transer: {userBalance}</p>
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4">
            <Button className="w-[17rem] bg-sky-500 p-5 hover:bg-sky-800" onClick={handleAddTokenToDB}>Add to token favorite</Button>
            <Button className="w-[17rem] bg-sky-500 p-5 hover:bg-sky-800" onClick={handleDeleteTokenFrmDB}>
              Remove Token from Favorites
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
