import { supabase } from 'lib/initSupabase';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useRedirectOnSignout() {
  const router = useRouter();
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          console.log('REROUTE');
          router.push(
            '/signin?returnUrl=' + encodeURIComponent(router.pathname)
          );
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  });
}
