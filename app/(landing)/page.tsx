import Link from 'next/link';
import styles from '../page.module.css';
import NavLink from '@/components/nav-link';

export default function WelcomePage() {
  return (
    <main className={styles.main}>
      <div>
        <h1>Welcome! Let&apos;s Get Started</h1>
        <br></br>
        <div>
          <NavLink href={'/order'}>Check Order</NavLink>
          <br></br>
          <NavLink href={'/token'}>Check Token</NavLink>
        </div>
      </div>
    </main>
  );
}
