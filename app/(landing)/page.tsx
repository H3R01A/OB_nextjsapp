import NavLink from '@/components/nav-link';
import { getBicoinBlockData, getBitcoinPriceData } from '@/actions/actions';
import '../globals.css';

export default async function WelcomePage() {
  const priceData = await getBitcoinPriceData();
  const currentBitcoinPrice = priceData.market_data.current_price.usd;
  const currentBitcoinBlock = await getBicoinBlockData();

  return (
    <main>
      <div className="text-white flex flex-col items-center text-2xl space-y-6">
        <h1>Welcome to OB Next! Let&apos;s Get Started!</h1>
        <div className="text-blue-200 hover:underline hover:text-blue-700 text-xl">
          <NavLink href={'/order'}>Check Order Status</NavLink>
        </div>
        <div className="text-blue-200 hover:text-blue-700 hover:underline text-xl">
          <NavLink href={'/token'}>Check Token Balance</NavLink>
        </div>
        <div className='text-xl'>
          Current Bitcoin price:{' '}
          {!currentBitcoinPrice
            ? 'Current bitcoin price is not available'
            : `$${currentBitcoinPrice}`}
        </div>
        <div className='text-xl'>
          Current Bitcoin Block:{' '}
          {!currentBitcoinBlock
            ? 'Current block information is not available'
            : `${currentBitcoinBlock}`}
        </div>
      </div>
    </main>
  );
}
