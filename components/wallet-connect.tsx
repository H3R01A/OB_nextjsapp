import { Button } from '@/components/ui/button';
import { WalletCards } from 'lucide-react';
import { useLaserEyes, UNISAT } from '@omnisat/lasereyes';
import { useContext } from 'react';
import { UserContext } from '@/utils/context';

export default function WallectConnect() {

  const { connect, connected, address, balance } = useLaserEyes();

  const { currentUser, setCurrentUser } = useContext(UserContext);

  console.log({ currentUser });
  console.log({ balance });

  const handleConnect = async () => {
    try {
      await connect(UNISAT);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  return (
    <div>
      {!connected ? (
        <Button className="w-64 text-lg bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%" onClick={handleConnect}>
          <WalletCards size={5}/> Connect Wallet
        </Button>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-lg">You are connected!</p>
          <p>Connected Address: {address}</p>
          <p>{JSON.stringify(currentUser)}</p>
        </div>
      )}
    </div>
  );
}
