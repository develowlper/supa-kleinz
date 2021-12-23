import { supabase } from 'lib/supabaseClient';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useRedirectOnAuthChange() {
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          router.replace(
            '/signin?returnUrl=' + encodeURIComponent(router.asPath)
          );
        }
        if (event === 'SIGNED_IN') {
          router.replace(router.query.returnUrl || '/');
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  });
}
