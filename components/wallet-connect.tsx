import { Button } from '@/components/ui/button';
import { WalletCards } from 'lucide-react';
import { useLaserEyes, UNISAT } from '@omnisat/lasereyes';
import { useContext, useEffect } from 'react';
import { UserContext } from '@/utils/context';

export default function WallectConnect() {
  const { connect, connected, address, balance } = useLaserEyes();

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleConnect = async () => {
    try {
      await connect(UNISAT);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  useEffect(() => {
      if (connected && address && currentUser.address !== address) {
        setCurrentUser((prevUser) => ({
          ...prevUser,
          address,
        }));
      }
    }, [connected, address, setCurrentUser, currentUser.address]);

  return (
    <div>
      {!connected && (
        <Button
          className="w-64 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-lg font-bold"
          onClick={handleConnect}
        >
          <WalletCards size={5} /> Connect Wallet
        </Button>
      )}
    </div>
  );
}
