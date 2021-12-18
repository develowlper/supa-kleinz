import { useIsAuthenticated, useSession } from 'stores/authorization';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSigninUrl from 'hooks/useSigninUrl';

const useIsPublicRoute = () => {
  const router = useRouter();

  return ['/signin'].some((x) => x === router.route);
};

export default function Authorization({ children }) {
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();
  const isPublicRoute = useIsPublicRoute();
  const signinUrl = useSigninUrl();
  useEffect(() => {
    if (!isAuthenticated && !isPublicRoute) {
      router.replace(signinUrl);
    }
  }, [isAuthenticated, isPublicRoute, router, signinUrl]);

  return children;
}
