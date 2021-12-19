import Link from 'next/link';

import { useRouter } from 'next/router';
import clsx from 'clsx';
import { supabase } from 'lib/initSupabase';

import Button from './Button';
import { useIsAuthenticated } from 'stores/authorization';

const links = [
  { href: '/', label: 'Home' },
  { href: '/lists/todo', label: 'Todo' },
  { href: '/lists/tobuy', label: 'Tobuy' },
  { href: '/names', label: 'Names' },
];

export const NavLink = ({ href, label }) => {
  const { asPath } = useRouter();

  const isCurrentPath = href === asPath;

  return (
    <Link key={href} href={href} passHref>
      <Button
        link
        className={
          isCurrentPath && 'text-teal-900 shadow-hover shadow-teal-500'
        }
      >
        {label}
      </Button>
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
    <nav className="px-6 py-3 flex flex-wrap justify-between items-center bg-fuchsia-900 gap-3">
      <h1 className="text-white text-xl uppercase">Supa Kleinz</h1>
      <ul className="flex gap-2 items-center">
        {links.map((props) => {
          return (
            <li key={props.href}>
              <NavLink {...props} />
            </li>
          );
        })}
      </ul>
      <ul>
        <li>
          <Button
            onClick={async () => {
              await supabase.auth.signOut();
            }}
          >
            {'Signout'}
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="px-2 py-1 bg-fuchsia-900 text-white">
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
