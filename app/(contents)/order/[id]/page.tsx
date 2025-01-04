import '../../../globals.css';
import { getOrderData } from '@/actions/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { OrderInfo } from '@/utils/types';

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

  const orderData: OrderInfo = await getOrderData(orderID);

  if (orderData.status === OrderStatus.ERROR) {
    return (
      <>
        <div className="mt-20 flex flex-col items-center text-xl text-white">
          <p>Sorry something unexpected happened</p>
          <p>Seems like: {orderData.error}</p>
        </div>
      </>
    );
  }

  return (
    <main>
      <div className="mt-20 flex flex-col items-center text-white">
        <Card className="h-[28rem] w-[50rem] border-white/[.30] bg-gradient-to-b from-gray-800 to-gray-900 text-white">
          <CardHeader className="mt-4 flex flex-col">
            <CardTitle>Order Info</CardTitle>
            <CardDescription>Order ID: {`${orderData.id}`}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p>Payment Status: {orderData.charge.status}</p>
            <p>Order Type: {orderData.orderType}</p>
            <p>Inscribed Count: {orderData.inscribedCount}</p>
            <p>Base Fee: {orderData.baseFee}</p>
            <p>Chain Fee: {orderData.chainFee}</p>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4">
            <Button className="w-[17rem] bg-sky-500 p-5 hover:bg-sky-800">
              <a href={'/order'}>Check Another Order</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
