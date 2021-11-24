import Link from 'next/link';

import { useRouter } from 'next/router';
import clsx from 'clsx';
import { supabase } from 'lib/initSupabase';
import { styled } from '@stitches/react';
import Button from './Button';
import { baseStyle } from 'styles/button';

const links = [
  { href: '/', label: '> home' },
  { href: '/lists/todo', label: '> todo' },
  { href: '/lists/tobuy', label: '> tobuy' },
];

const Nav = styled('nav', {
  padding: '1rem',
  backgroundColor: 'var(--primary-color)',
  color: 'var(--primary-text)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const LinkList = styled('ul', {
  display: 'flex',
  margin: 0,
  padding: 0,
  '& >:not(:last-child)': {
    marginRight: '1rem',
  },
});

const Li = styled('li', {
  color: 'var(--primary-text)',
  listStyle: 'none',
  backgroundColor: 'var(--primary-color-light)',
});

const Foot = styled('footer', {
  padding: '0.5rem 1rem',
  backgroundColor: 'var(--primary-color)',
  color: 'var(--primary-text)',
  gridArea: 'footer',
});

const A = styled('a', {
  ...baseStyle,
  variants: {
    highlighted: {
      true: { color: 'var(--secondary-color)' },
    },
  },
});

const FooterLink = styled('a', {
  textDecoration: 'underline',
});

export const Navbar = () => {
  return (
    <Nav>
      <LinkList>
        {links.map((props) => {
          return (
            <Li key={props.href}>
              <NavLink {...props} />
            </Li>
          );
        })}
      </LinkList>
      <LinkList>
        <Button
          onClick={async () => {
            await supabase.auth.signOut();
          }}
        >
          {'> sing out'}
        </Button>
      </LinkList>
    </Nav>
  );
};

export const Footer = () => {
  return (
    <Foot>
      Kleinz is an open-source project maintained by{' '}
      <FooterLink
        href="https://github.com/hello-sunshine-dot-dev"
        target="_black"
      >
        hello-sunshine.dev
      </FooterLink>
    </Foot>
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
