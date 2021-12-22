import { useIsAuthenticated, useSession } from 'stores/authorization';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSigninUrl from 'hooks/useSigninUrl';

const useIsPublicRoute = () => {
  const router = useRouter();

  return ['/signin'].some((x) => x === router.route);
};

export default function Authorization({ children }) {
  return children;
}
