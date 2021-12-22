import Link from 'next/link';

import { useRouter } from 'next/router';
import clsx from 'clsx';

export default function NavLink({ href, label, icon }) {
  const { asPath } = useRouter();

  const isCurrentPath = href === asPath;

  return (
    <Link key={href} href={href} passHref>
      <a
        className={clsx(
          'flex items-center gap-1 hover:text-sky-500',
          isCurrentPath && 'text-sky-500'
        )}
      >
        {icon} {label}
      </a>
    </Link>
  );
}
