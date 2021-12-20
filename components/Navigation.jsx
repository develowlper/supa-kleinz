import Link from 'next/link';

import { useRouter } from 'next/router';
import clsx from 'clsx';
import { supabase } from 'lib/initSupabase';
import {
  RiHomeLine,
  RiStoreLine,
  RiTaskLine,
  RiUserVoiceLine,
} from 'react-icons/ri';

import Button from './Button';
import { useIsAuthenticated } from 'stores/authorization';

const links = [
  { href: '/', label: 'Home', icon: <RiHomeLine /> },
  { href: '/lists/todo', label: 'Todo', icon: <RiTaskLine /> },
  { href: '/lists/tobuy', label: 'Tobuy', icon: <RiStoreLine /> },
  { href: '/names', label: 'Names', icon: <RiUserVoiceLine /> },
];

export const NavLink = ({ href, label, icon }) => {
  const { asPath } = useRouter();

  const isCurrentPath = href === asPath;

  return (
    <Link key={href} href={href} passHref>
      <a
        className={clsx(
          'flex items-center gap-1 text-lg hover:text-fuchsia-500',
          isCurrentPath && 'text-emerald-500'
        )}
      >
        {icon} {label}
      </a>
    </Link>
  );
};

export const Navbar = () => {
  const isAuthenticated = useIsAuthenticated();

  const router = useRouter();
  const returnUrl =
    router.asPath !== '/'
      ? `?returnUrl=${encodeURIComponent(router.asPath)}`
      : '';

  return (
    <nav className="sticky top-0 left-0 bottom-0 right-0 p-3 row-span-full shadow-md bg-white">
      <ul className="md:flex gap-5 overflow-hidden justify-center">
        {links.map((props) => {
          return (
            <li key={props.href}>
              <NavLink {...props} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="px-2 py-1 bg-fuchsia-200">
      Kleinz is an open-source project maintained by{' '}
      <a href="https://github.com/hello-sunshine-dot-dev" target="_black">
        hello-sunshine.dev
      </a>
    </footer>
  );
};

const Navigation = {
  Navbar,
};

export default Navigation;
