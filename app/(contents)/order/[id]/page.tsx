import '../../../globals.css';
import classes from './page.module.css';
import { getOrderData } from '@/actions/actions';

type PageProps = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};


export default async function OrderPage({ params }: PageProps) {
  
  const orderID = params.id;
  
  //const orderID = 'c411ca33-53dd-4d4f-b959-6c6dffcc88e5';

  //!order to trigger error
  //const orderID = 'c411ca33-53dd-4d4f-b959-6c6dffcc88e4';

  const orderData = await getOrderData(orderID);

  //!console log to see what data is returned
  //console.log(orderData);

  if (orderData.status !== 'ok') {
    return (
      <>
        <p>Sorry something unexpected happened</p>
        <p>Seems like: {orderData.error}</p>
      </>
    );
  }

  return (
    <main className={classes.main}>
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
