import styles from '../page.module.css';
import NavLink from '@/components/nav-link';
import { getBicoinBlockData, getBitcoinPriceData } from '@/actions/actions';

export default async function WelcomePage() {
  const priceData = await getBitcoinPriceData();
  const currentBitcoinPrice = priceData.market_data.current_price.usd;

  const currentBitcoinBlock = await getBicoinBlockData();

  return (
    <main className={styles.main}>
      <div>
        <h1>Welcome! Let&apos;s Get Started</h1>
        <br></br>
        <div>
          <NavLink href={'/order'}>Check Order Status</NavLink>
          <br></br>
          <NavLink href={'/token'}>Check Token Balance</NavLink>
        </div>
        <br></br>
        <div>
          Current Bitcoin price:{' '}
          {!currentBitcoinPrice
            ? 'Current bitcoin price information not available'
            : `$${currentBitcoinPrice}`}
          <br></br>
          Current Bitcoin Block:{' '}
          {!currentBitcoinBlock
            ? 'Current block information not available'
            : `${currentBitcoinBlock}`}
        </div>
      </div>
    </main>
  );
}
