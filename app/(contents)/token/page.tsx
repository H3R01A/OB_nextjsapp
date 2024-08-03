import '../../globals.css';
import { handleTickerSubmission } from '@/actions/actions';

export default function TokenLandingPage() {
  return (
    <>
    <h1>Enter a BRC20 Token Below</h1>
      <form action={handleTickerSubmission}>
        <input type='text' name='ticker' />
        <button>Check</button>
      </form>
    </>
  );
}
