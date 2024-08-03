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

  return (
    <Link href={href as URL} className={path.startsWith(href as string) ? 'active' : undefined}>
      {children}
    </Link>
  );
}
