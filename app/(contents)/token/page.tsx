import '../../globals.css';
import { handleTickerSubmission } from '@/actions/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TokenLandingPage() {
  return (
    <div className="mt-20 flex flex-col items-center text-white">
      <Card className="h-[28rem] w-[50rem] bg-black text-white">
        <CardHeader className="mt-20 items-center">
          <CardTitle>
            Enter a BRC20 Token Below and Check Your Balance
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <form
            action={handleTickerSubmission}
            className="mt-4 flex flex-col items-center space-y-5"
          >
            <div className="flex flex-row items-center space-x-5">
              <p className="text-lg">Ticker</p>
              <Input
                className="w-[25rem] text-center text-white"
                type="text"
                name="ticker"
              />
            </div>
            <div className="flex flex-row items-center space-x-5">
              <p className="text-lg">Wallet</p>
              <Input
                className="w-[25rem] text-white"
                type="text"
                name="address"
              />
            </div>
            <Button className="mt-8">Check</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4"></CardFooter>
      </Card>
    </div>

    // <div className="mx-auto mt-28 flex h-[25rem] max-w-lg flex-col items-center border-2 border-solid border-sky-500 bg-black p-5 text-white">
    //   <h1 className="mt-10">
    //     Enter a BRC20 Token Below and Check Your Balance
    //   </h1>
    //   <form
    //     action={handleTickerSubmission}
    //     className="mt-4 flex flex-col items-center space-y-5"
    //   >
    //     <Label>Enter Ticker</Label>
    //     <Input className="w-[8rem] text-white" type="text" name="ticker" />
    //     <Label> Enter Wallet Address </Label>
    //     <Input className="w-[25rem] text-white" type="text" name="address" />
    //     <Button className="mt-8">Check</Button>
    //   </form>
    // </div>
  );
}
