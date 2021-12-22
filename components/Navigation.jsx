import Link from 'next/link';

import { useRouter } from 'next/router';
import clsx from 'clsx';
import { supabase } from 'lib/initSupabase';
import {
  RiGalleryLine,
  RiHomeLine,
  RiStoreLine,
  RiTaskLine,
  RiUserVoiceLine,
} from 'react-icons/ri';

import { useIsAuthenticated } from 'stores/authorization';
import NavLink from './NavLink';

const links = [
  { href: '/', label: 'Home', icon: <RiHomeLine /> },
  { href: '/lists/todo', label: 'Todo', icon: <RiTaskLine /> },
  { href: '/lists/tobuy', label: 'Tobuy', icon: <RiStoreLine /> },
  { href: '/names', label: 'Names', icon: <RiUserVoiceLine /> },
  { href: '/images', label: 'Images', icon: <RiGalleryLine /> },
];

export const Navbar = () => {
  const isAuthenticated = useIsAuthenticated();

  const router = useRouter();
  const returnUrl =
    router.asPath !== '/'
      ? `?returnUrl=${encodeURIComponent(router.asPath)}`
      : '';

  return (
    <nav className="sticky top-0 left-0 bottom-0 right-0 p-3 row-span-full shadow-md bg-white z-10">
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
