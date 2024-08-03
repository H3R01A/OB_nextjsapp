import '../../globals.css';
import { handleTickerSubmission } from '@/actions/actions';

export default function TokenLandingPage() {
  return (
    <>
      <h1>Enter a BRC20 Token Below and Check Your Balance</h1>
      <form action={handleTickerSubmission}>
        Enter Ticker: <input type="text" name="ticker" />
        <br></br>
        Enter Wallet Address: <input type="text" name="address" />
        <br></br>
        <button>Check</button>
      </form>
    </>
  );
}
