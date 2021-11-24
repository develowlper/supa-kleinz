import { Auth as SupaAuth } from '@supabase/ui';
import { styled } from '@stitches/react';
import { useIsAuthenticated } from 'stores/authorization';
import AccessDenied from './AccessDenied';
import { useRouter } from 'next/router';

const useIsPublicRoute = () => {
  const router = useRouter();

  return ['/signin'].some((x) => x === router.route);
};

export default function Authorization({ children }) {
  const isAuthenticated = useIsAuthenticated();

  const isPublicRoute = useIsPublicRoute();
  switch (true) {
    case isPublicRoute || isAuthenticated:
      return children;
    default:
      return <AccessDenied />;
  }
}
