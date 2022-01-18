import { supabase } from 'lib/supabaseClient';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

async function updateSupabaseCookie(event, session) {
  return fetch('/api/auth', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify({ event, session }),
  });
}

export default function useAuthStateChangeHandling() {
  const router = useRouter();
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        await updateSupabaseCookie(event, session);
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
