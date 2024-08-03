import '../../../globals.css';
import classes from './page.module.css';
import { getTickerData, getTickerBalance } from '@/actions/actions';

type PageProps = {
  params: { ticker: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function TickerPage({ params, searchParams}: PageProps) {
  
  const ticker = params.ticker.toLowerCase();
  const address = searchParams?.address;
  const data = await getTickerData(ticker);
  const tickerInfo = data.result;

  if (!tickerInfo) {
    return (
      <div>
        <p>Unfortinately BRC-20 Token is not available yet</p>
      </div>
    );
  }

  if(!address){
    return (<div>
      <p>Please enter a valid wallet address and try again</p>
    </div>)
  }

   //'bc1pxaneaf3w4d27hl2y93fuft2xk6m4u3wc4rafevc6slgd7f5tq2dqyfgy06'

  const balanceData = await getTickerBalance(address as string, ticker);

  return (
    <main className={classes.main}>
      <div>
        <h2>Ticker: {tickerInfo.original_tick}</h2>
        <p>Max Supply: {tickerInfo.max_supply}</p>
        <p>Remaining Supply: {tickerInfo.max_supply}</p>
        <p>Limit Per Mint: {tickerInfo.limit_per_mint}</p>
        <p>Current Block Height: {tickerInfo.block_height}</p>
        <br></br>
        <h2>Transferable Balance</h2>
        {!balanceData.result ? (
          <p>wallet has a 0 balance of the token</p>
        ) : (
          <>
            <p>Your Overall Balance: {balanceData.result[0].overall_balance}</p>
            <p>
              Available Balance To Transer:{' '}
              {balanceData.result[0].available_balance}
            </p>
          </>
        )}
      </div>
    </main>
  );
}
