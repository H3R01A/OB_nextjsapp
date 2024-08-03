
import Link from 'next/link';
import NavLink from './nav-link';

export default function MainHeader() {
  return (
    <header id="main-header">
      <nav>
        <ul>
          <li>
            <NavLink href={'/'}>Home</NavLink>
          </li>
          <li>
            <NavLink href={'/token'}>Check Token Balance</NavLink>
          </li>
          <li>
            <NavLink href={'/order'}>Check Order Status</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
