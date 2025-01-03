import '../../../globals.css';
import { getOrderData } from '@/actions/actions';

interface PageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

enum OrderStatus {
  OK = 'ok',
  ERROR = 'error',
}
export default async function OrderPage(props: PageProps) {
  const orderID = props.params.id;

  const orderData = await getOrderData(orderID);

  if (orderData.status === OrderStatus.ERROR) {
    return (
      <>
        <p>Sorry something unexpected happened</p>
        <p>Seems like: {orderData.error}</p>
      </>
    );
  }

  return (
    <main>
      <div>
        <h2>Order Info</h2>
        <p>Order ID: {orderData.id}</p>
        <p>Payment Status: {orderData.charge.status}</p>
        <p>Order Type: {orderData.orderType}</p>
        <p>Inscribed Count: {orderData.inscribedCount}</p>
        <p>Base Fee: {orderData.baseFee}</p>
        <p>Chain Fee: {orderData.chainFee}</p>
      </div>
    </main>
  );
}
