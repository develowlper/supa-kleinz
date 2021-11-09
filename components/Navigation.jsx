import Link from 'next/link';

import classes from './Navigation.module.css';
import buttonStyles from 'components/Button.module.css';
import { useRouter } from 'next/router';
import clsx from 'clsx';

const links = [
  { href: '/', label: '> home' },
  { href: '/todo', label: '> todo' },
];

export const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <ul className={classes.list}>
        {links.map((props) => {
          return (
            <li key={props.href} className={classes.listItem}>
              <NavLink {...props} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export const NavLink = ({ href, label }) => {
  const { pathname } = useRouter();

  const isCurrentPate = href === pathname;

  return (
    <Link key={href} href={href}>
      <a
        className={clsx(
          buttonStyles.button,
          isCurrentPate && buttonStyles.buttonSelected
        )}
      >
        {label}
      </a>
    </Link>
  );
};

const Navigation = {
  Navbar,
};

export default Navigation;
