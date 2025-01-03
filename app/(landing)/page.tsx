'use client';
import NavLink from '@/components/nav-link';
import { getBicoinBlockData, getBitcoinPriceData } from '@/actions/actions';
import '../globals.css';
import { Button } from '@/components/ui/button';
import { WalletCards } from 'lucide-react';
import { useLaserEyes, UNISAT } from '@omnisat/lasereyes';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '@/utils/context';

export default function WelcomePage() {
  const { connect, connected, address, balance } = useLaserEyes();
  const [currentBitcoinPrice, setcurrentBitcoinPrice] = useState('');
  const [currentBitcoinBlock, setcurrentBitcoinBlock] = useState('');

  const { currentUser, setCurrentUser } = useContext(UserContext);

  console.log({ currentUser });
  console.log({ balance });

  const handleConnect = async () => {
    try {
      await connect(UNISAT);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

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
        <h2>Let&apos;s Get Started!</h2>
        {/* <div className="mt-6 text-xl text-blue-200 hover:text-blue-700 hover:underline">
          <NavLink href={'/token'}>Check Token Balance</NavLink>
        </div>
        <div className="text-xl text-blue-200 hover:text-blue-700 hover:underline">
          <NavLink href={'/order'}>Check Order Status</NavLink>
        </div>
        <div className="text-xl text-blue-200 hover:text-blue-700 hover:underline">
          <NavLink href={`/favorites/${currentUser.address}`}>
            Check Favorite tokens
          </NavLink>
        </div> */}
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
        <div className="mt-6 text-lg">
          <div className="">
            {!connected ? (
              <Button onClick={handleConnect}>
                <WalletCards /> Connect Wallet
              </Button>
            ) : (
              <div className='flex flex-col items-center'>
                <p className='text-lg'>You are connected!</p>
                <p>Connected Address: {address}</p>
                <p>{JSON.stringify(currentUser)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
