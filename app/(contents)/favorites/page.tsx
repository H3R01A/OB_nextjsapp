'use client';
import WalletConnect from '@/components/wallet-connect';
import { useEffect } from 'react';
import { useUserContext } from '@/utils/hooks/useUserContext';
import { useRouter } from 'next/navigation';

export default function FavoritesFallback() {
  const { currentUser } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (currentUser?.address) {
      router.push(`/favorites/${currentUser.address}`);
    }
  }, [currentUser?.address, router]); // Run this effect when `currentUser.address` changes

  return (
    <div className="mt-20 flex flex-col items-center text-white">
      <h1 className="mb-20 text-3xl font-bold">Favorites</h1>
      <h2 className="mb-16 text-2xl">
        No address was provided. Please Connect to Your Wallet to View Favorites
      </h2>
      <WalletConnect />
    </div>
  );
}
