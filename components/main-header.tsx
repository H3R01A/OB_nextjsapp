'use client';
import NavLink from './nav-link';
import { UserContext } from '@/utils/context';
import { useContext } from 'react';
import { User } from 'lucide-react';

export default function MainHeader() {
  const { currentUser } = useContext(UserContext);
  return (
    <header id="main-header">
      <nav className="flex items-center justify-between px-5 py-2 text-white">
        {/* Left section */}
        <div className="flex-none bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-clip-text text-2xl font-bold text-transparent">
          <NavLink href={'/'}>OB NEXT</NavLink>
        </div>

        {/* Center section - always centered */}
        <div className="flex flex-1 justify-center">
          <div className="flex items-center space-x-8">
            <div className="px-8 py-5 hover:rounded-md hover:bg-accent-foreground">
              <NavLink href={'/token'}>Check Token Balance</NavLink>
            </div>
            <div className="px-8 py-5 hover:rounded-md hover:bg-accent-foreground">
              <NavLink href={'/order'}>Check Order Status</NavLink>
            </div>
            <div className="px-8 py-5 hover:rounded-md hover:bg-accent-foreground">
              <NavLink href={`/favorites/${currentUser.address}`}>
                Check Favorites
              </NavLink>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex">
          {currentUser.address ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm">
                {`${currentUser.address.slice(0, 4)}...${currentUser.address.slice(-5)}`}
              </span>
              <User className="h-5 w-5" />
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              No Wallet Connected <User className="w-15 h-5" />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
