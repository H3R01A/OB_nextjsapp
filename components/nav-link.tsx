'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NavLink({
  href,
  children,
}: Readonly<{
  href: URL | String,
  children: React.ReactNode;
}>) {
  const path = usePathname();

  const isCurrentlyActive = path.startsWith(href as string)

  return (
    <Link href={href as URL} className={isCurrentlyActive ? 'active' : undefined}>
      {children}
    </Link>
  );
}
