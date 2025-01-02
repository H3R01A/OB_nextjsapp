import '../../../globals.css';
import {
  getTickerData,
  getTickerBalance,
  handleAddTokenToDB,
  handleDeleteTokenFrmDB,
} from '@/actions/actions';
import { findTokenInDB } from '@/db/supabase/utils/database-helpers';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: { ticker: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function TickerPage(props: PageProps) {
  const ticker = props.params.ticker.toLowerCase();
  const address = props.searchParams?.address;
  const tickerData = await getTickerData(ticker);

  //fetch to see if token is in database, if so fill in a heart or something
  const tokenFavorited = await findTokenInDB(ticker);

  let userBalance = '';

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

  if (balanceData.error === 'no balance found') {
    userBalance = '0';
  } else if (balanceData.error) {
    userBalance = 'error retrieving user balance';
  } else {
    userBalance = balanceData.result[0].available_balance;
  }

  return (
    <main>
      <div className="mt-20 flex flex-col items-center text-white">
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
            <p>Your Overall Balance: {userBalance}</p>
            <p>Available Balance To Transer: {userBalance}</p>
          </>
        )}
        {tokenFavorited ? <p>true</p> : <p>false</p>}
        <form action={handleAddTokenToDB}>
          <input
            hidden={true}
            value={tickerInfo.original_tick}
            name={'ticker'}
            readOnly
          ></input>

          <input
            hidden={true}
            value={tickerInfo.original_tick}
            name={'name'}
            readOnly
          ></input>

          <input
            hidden={true}
            value={userBalance}
            name={'user_balance'}
            readOnly
          ></input>

          <input
            hidden={true}
            value={tickerInfo.max_supply}
            name={'total_supply'}
            readOnly
          ></input>

          <Button>Add to token favorite</Button>
        </form>
        <div className='mt-4'>
        <form action={handleDeleteTokenFrmDB}>
          <input
            hidden={true}
            value={tickerInfo.original_tick}
            name={'ticker'}
            readOnly
          ></input>
          <Button>Remove Token from Favorites</Button>
        </form>
        </div>
      </div>
    </main>
  );
}
