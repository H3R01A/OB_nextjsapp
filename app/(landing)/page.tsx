'use client';
import { getBicoinBlockData, getBitcoinPriceData } from '@/actions/actions';
import '../globals.css';
import { useLaserEyes, UNISAT } from '@omnisat/lasereyes';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '@/utils/context';
import WallectConnect from '@/components/wallet-connect';

export default function WelcomePage() {
  const { connect, connected, address, balance } = useLaserEyes();
  const [currentBitcoinPrice, setcurrentBitcoinPrice] = useState('');
  const [currentBitcoinBlock, setcurrentBitcoinBlock] = useState('');

  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    if (connected && address && currentUser.address !== address) {
      setCurrentUser((prevUser) => ({
        ...prevUser,
        address,
      }));
    }
  }, [connected, address, setCurrentUser, currentUser.address]);

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

    void fetchData();
  }, []);

  return (
    <main>
      <div className="mt-48 flex flex-col items-center text-2xl text-white">
        <h1 className="py-5 text-5xl font-bold">
          Welcome to {''}
          <span className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-clip-text font-bold text-transparent">
            OB NEXT
          </span>
        </h1>
        <h1 className="mb-16 text-2xl">Let&apos;s Get Started!</h1>
        <div className="mb-16">
          <WallectConnect />
        </div>
        <div className="mt-6 text-4xl">
          Current Bitcoin price:{' '}
          {!currentBitcoinPrice
            ? 'Fetching data...'
            : `$${currentBitcoinPrice}`}
        </div>
        <div className="text-4xl">
          Current Bitcoin Block:{' '}
          {!currentBitcoinBlock ? 'Fetching data...' : `${currentBitcoinBlock}`}
        </div>
        <div>
          <p className="text-white">{JSON.stringify(currentUser)}</p>
        </div>
      </div>
    </main>
  );
}
