import styles from '../../../page.module.css';

async function getOrderData(id: String) {
  const response = await fetch(`https://api.ordinalsbot.com/order?id=${id}`);

  if (!response.ok) {
    new Error('Error with the call');
  }

  return await response.json();
}


export default async function OrderPage() {
  const orderID = 'c411ca33-53dd-4d4f-b959-6c6dffcc88e5';

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
    <main className={styles.main}>
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
