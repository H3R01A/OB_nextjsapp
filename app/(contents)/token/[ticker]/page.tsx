import '../../../globals.css';
import { getTickerData, getTickerBalance } from '@/actions/actions';

interface PageProps {
  params: { ticker: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function TickerPage(props: PageProps) {
  const ticker = props.params.ticker.toLowerCase();
  const address = props.searchParams?.address;
  const tickerData = await getTickerData(ticker);

  if (tickerData.error) {
    return (
      <div>
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
      <div>
        <p>Please enter a valid wallet address and try again</p>
      </div>
    );
  }

  const balanceData = await getTickerBalance(address as string, ticker);
  const tickerInfo = tickerData.result;
  return (
    <main>
      <div>
        <h2>Ticker: {tickerInfo.original_tick}</h2>
        <p>Max Supply: {tickerInfo.max_supply}</p>
        <p>Remaining Supply: {tickerInfo.max_supply}</p>
        <p>Limit Per Mint: {tickerInfo.limit_per_mint}</p>
        <p>Current Block Height: {tickerInfo.block_height}</p>
        <br></br>
        <h2>Transferable Balance</h2>
        {!balanceData.result ? (
          <p>
            Wallet has a 0 balance of the {`${tickerInfo.original_tick}`} token
          </p>
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
