import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AccessDenied() {
  const router = useRouter();
  const returnUrl =
    router.asPath !== '/'
      ? `?returnUrl=${encodeURIComponent(router.asPath)}`
      : '';

  return (
    <div>
      <Link href={`/signin${returnUrl}`} passHref>
        <a>{'Please login to access this page >'}</a>
      </Link>
    </div>
  );
}
