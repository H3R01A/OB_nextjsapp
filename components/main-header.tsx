'use client';
import NavLink from './nav-link';
import { UserContext } from '@/utils/context';
import { useContext } from 'react';
import { User } from 'lucide-react';

export default function MainHeader() {
  const { currentUser } = useContext(UserContext);
  return (
    <header id="main-header">
      <nav className="mt-2 flex flex-wrap items-center space-x-[35rem] text-white">
        <div className="ml-5 flex justify-start text-2xl font-bold">
          <NavLink href={'/'}>OB NEXT</NavLink>
        </div>
        <div className="flex flex-row items-center justify-evenly space-x-20">
          <div className="rounded-lg border-2 border-solid border-sky-500 p-0.5 hover:bg-accent-foreground">
            <NavLink href={'/token'}>Check Token Balance</NavLink>
          </div>
          <div className="rounded-lg border-2 border-solid border-sky-500 p-0.5 hover:bg-accent-foreground">
            <NavLink href={'/order'}>Check Order Status</NavLink>
          </div>
          {currentUser.address && (
            <div className="rounded-lg border-2 border-solid border-sky-500 p-0.5 hover:bg-accent-foreground">
              <NavLink href={`/favorites/${currentUser.address}`}>
                See Favorites
              </NavLink>
            </div>
          )}
        </div>
        {currentUser.address && (
          <div className="flex flex-row space-x-5">
            <div>
              {`${currentUser.address.slice(0, 4)}...${currentUser.address.slice(-5)}`}
            </div>
            <div>
              <User />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
