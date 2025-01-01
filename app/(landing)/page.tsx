'use client';
import NavLink from '@/components/nav-link';
import { getBicoinBlockData, getBitcoinPriceData } from '@/actions/actions';
import '../globals.css';
import { Button } from '@/components/ui/button';
import { WalletCards } from 'lucide-react';
import { useLaserEyes, UNISAT } from '@omnisat/lasereyes';
import { useEffect, useState } from 'react';

export default function WelcomePage() {
  const { connect, connected, address, balance } = useLaserEyes();
  const [currentBitcoinPrice, setcurrentBitcoinPrice] = useState('');
  const [currentBitcoinBlock, setcurrentBitcoinBlock] = useState('');

  const handleConnect = () => {
    connect(UNISAT);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const priceData = await getBitcoinPriceData();

        setcurrentBitcoinPrice(priceData.market_data.current_price.usd);

        setcurrentBitcoinBlock(await getBicoinBlockData());
      } catch (error) {
        console.log('Error occured fetching data: ', error);
      }
    };

    void fetchData()
  }, []);

  return (
    <main>
      <div className="mt-20 flex flex-col items-center text-2xl text-white">
        <h1>Welcome to OB Next! Let&apos;s Get Started!</h1>
        <div className="mt-6 text-xl text-blue-200 hover:text-blue-700 hover:underline">
          <NavLink href={'/order'}>Check Order Status</NavLink>
        </div>
        <div className="text-xl text-blue-200 hover:text-blue-700 hover:underline">
          <NavLink href={'/token'}>Check Token Balance</NavLink>
        </div>
        <div className="mt-6 text-xl">
          Current Bitcoin price:{' '}
          {!currentBitcoinPrice
            ? 'Current bitcoin price is not available'
            : `$${currentBitcoinPrice}`}
        </div>
        <div className="text-xl">
          Current Bitcoin Block:{' '}
          {!currentBitcoinBlock
            ? 'Current block information is not available'
            : `${currentBitcoinBlock}`}
        </div>
        <div className="mt-6 text-lg">
          <div className="">
            {!connected ? (
              <Button onClick={handleConnect}>
                <WalletCards /> Connect Wallet
              </Button>
            ) : (
              <div>
                <p>Connected Address: {address}</p>
                <p>Balance: {balance?.total}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
