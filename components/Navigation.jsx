import Link from 'next/link';

import { useRouter } from 'next/router';
import clsx from 'clsx';
import { supabase } from 'lib/initSupabase';

import Button from './Button';

const links = [
  { href: '/', label: 'Home' },
  { href: '/lists/todo', label: 'Todo' },
  { href: '/lists/tobuy', label: 'Tobuy' },
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
  return (
    <nav className="px-6 py-3 flex justify-between bg-fuchsia-900">
      <ul className="flex gap-2 items-center">
        {links.map((props) => {
          return (
            <li key={props.href}>
              <NavLink {...props} />
              {/* <Link passHref href={props.href}>
                <Button link>{props.label}</Button>
              </Link> */}
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
          {'Signout'}
        </Button>
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
