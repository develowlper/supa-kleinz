import { useRouter } from 'next/router';

export default function useSigninUrl() {
  const returlUrl = useRouter().asPath;
  return `/signin?returnUrl=${returlUrl}`;
}
