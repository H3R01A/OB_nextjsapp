import '../../globals.css';
import { handleOrderSubmission } from '@/actions/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function OrderPage() {
  return (
    <div className="mt-20 flex flex-col items-center text-white">
      <Card className="h-[28rem] w-[50rem] border-white/[.30] bg-gradient-to-b from-gray-800 to-gray-900 text-white">
        <CardHeader className="mt-20 items-center">
          <CardTitle>
            Enter Order ID below to check the status of your order
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-8 flex flex-col items-center">
          <form
            action={handleOrderSubmission}
            className="mt-4 flex flex-col items-center"
          >
            <div className="flex flex-row items-center space-x-5">
              <p className="text-lg">Order ID</p>
              <input
                className="w-[31rem] border border-x-0 border-t-0 border-solid border-white bg-transparent text-left text-white focus:outline-none focus:ring-0"
                type="text"
                name="order"
              />
            </div>
            <div className="mt-16">
              <Button className="w-[17rem] bg-sky-500 p-5 hover:bg-sky-800">
                Check
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4"></CardFooter>
      </Card>
    </div>
  );
}
