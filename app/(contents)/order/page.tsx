import '../../globals.css';
import { handleOrderSubmission } from '@/actions/actions';

export default function OrderPage() {


  return (
    <>
    <h1>Enter Order ID below to check the status of your order</h1>
    <form action={handleOrderSubmission}>
        Order ID: <input type='text' name='order' />
        <br></br>
        <button>Check</button>
      </form>
    </>
  );
}
