import styles from '../../../page.module.css';

async function getTickerData(ticker: String) {
  const response = await fetch(
    `https://api.ordinalsbot.com/opi/v1/brc20/ticker_info?ticker=${ticker}`,
    {
      headers: {
        'x-api-key': process.env.API_KEY,
      },
    }
  );

  if (!response.ok) {
    new Error('Error with the call');
  }

  return await response.json();
}

async function getTickerBalance(address: String, ticker: String) {
  const response = await fetch(
    `https://api.ordinalsbot.com/opi/v1/brc20/get_current_balance_of_wallet?address=bc1pxaneaf3w4d27hl2y93fuft2xk6m4u3wc4rafevc6slgd7f5tq2dqyfgy06&ticker=${ticker}`,
    {
      headers: {
        'x-api-key': process.env.API_KEY,
      },
    }
  );

  if (!response.ok) {
    new Error('Error with the call');
  }

  return await response.json();
}

export default async function TokenPage({ params }) {
  const ticker = params.ticker.toLowerCase();
  //!ORDI WALLET ADDRESS TO PROVE API CALL WORKS!
  const address =
    'bc1pxaneaf3w4d27hl2y93fuft2xk6m4u3wc4rafevc6slgd7f5tq2dqyfgy06';

  const data = await getTickerData(ticker);
  const tickerInfo = data.result;

  console.log(tickerInfo);

  if (!tickerInfo) {
    return (
      <div>
        <p>Unfortinately BRC-20 Token is not available yet</p>
      </div>
    );
  }

  const balanceData = await getTickerBalance(address, ticker);
  
  return (
    <main className={styles.main}>
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
            <p>Available Balance To Transer: {balanceData.result[0].available_balance}</p>
          </>
        )}
      </div>
    </main>
  );
}
