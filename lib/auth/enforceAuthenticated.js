import { supabase } from 'lib/supabaseClient';

export default function enforceAuthenticated(inner) {
  return async (context) => {
    const { req } = context;
    const { user } = await supabase.auth.api.getUserByCookie(req);

    if (!user) {
      return {
        props: {},
        redirect: {
          destination:
            '/signin?returnUrl=' + encodeURIComponent(context.resolvedUrl),
        },
      };
    }

    if (inner) {
      return inner(context, user);
    }

    return { props: {} };
  };
}
