import Link from 'next/link';

import { useRouter } from 'next/router';
import clsx from 'clsx';
import useIsPageLoading from 'hooks/useIsPageLoading';

export default function NavLink({ href, label, icon }) {
  const { asPath } = useRouter();

  const isPageLoading = useIsPageLoading();
  const isCurrentPath = href === asPath && !isPageLoading;

  return (
    <Link key={href} href={href} passHref>
      <a
        className={clsx(
          'flex items-center gap-1 hover:text-sky-500 transition-colors duration-200',
          isCurrentPath && 'text-sky-500'
        )}
      >
        {icon} {label}
      </a>
    </Link>
  );
}
