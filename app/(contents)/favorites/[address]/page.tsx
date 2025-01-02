import '../../../globals.css';
import {
  getFavoritesFrmDB
} from '@/db/supabase/utils/database-helpers';
interface PageProps {
  params: { address: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function FavoritesPage(props: PageProps) {
  const userAddress = props.params.address;

  const tokens = await getFavoritesFrmDB()

  

  return (
    <main>
      <div className="mt-20 flex flex-col items-center text-2xl text-white">
        <h1>Favorite tokens</h1>
        {<p>User address: {userAddress}</p>}
        {JSON.stringify(tokens)}
      </div>
    </main>
  );
}
