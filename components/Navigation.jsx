import Link from 'next/link';

import { useRouter } from 'next/router';
import clsx from 'clsx';
import { supabase } from 'lib/initSupabase';

import Button from './Button';
import { baseStyle } from 'styles/button';

const links = [
  { href: '/', label: '> home' },
  { href: '/lists/todo', label: '> todo' },
  { href: '/lists/tobuy', label: '> tobuy' },
];

export const Navbar = () => {
  return (
    <nav>
      <ul>
        {links.map((props) => {
          return (
            <li key={props.href}>
              <a {...props} />
            </li>
          );
        })}
      </ul>
      <ul>
        <Button
          onClick={async () => {
            await supabase.auth.signOut();
          }}
        >
          {'> sing out'}
        </Button>
      </ul>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer>
      Kleinz is an open-source project maintained by{' '}
      <a href="https://github.com/hello-sunshine-dot-dev" target="_black">
        hello-sunshine.dev
      </a>
    </footer>
  );
};

export const NavLink = ({ href, label }) => {
  const { pathname } = useRouter();

  const isCurrentPath = href === pathname;

  return (
    <Link key={href} href={href} passHref>
      <A highlighted={isCurrentPath}>{label}</A>
    </Link>
  );
};

const Navigation = {
  Navbar,
};

export default Navigation;
