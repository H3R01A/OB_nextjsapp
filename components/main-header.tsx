import NavLink from './nav-link';

export default function MainHeader() {
  return (
    <header id="main-header">
      <nav>
        <ul>
          <li className="text-blue-200 hover:text-blue-700 hover:underline">
            <NavLink href={'/'}>Home</NavLink>
          </li>
          <li className="text-blue-200 hover:text-blue-700 hover:underline">
            <NavLink href={'/token'}>Check Token Balance</NavLink>
          </li>
          <li className="text-blue-200 hover:text-blue-700 hover:underline">
            <NavLink href={'/order'}>Check Order Status</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
