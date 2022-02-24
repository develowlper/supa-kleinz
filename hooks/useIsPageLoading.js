import Router from 'next/router';
import { useEffect, useState } from 'react';

export default function useIsPageLoading() {
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    const change = () => setProgress(true);
    const noChange = () => setProgress(false);
    Router.events.on('routeChangeStart', change);
    Router.events.on('routeChangeComplete', noChange);
    return () => {
      Router.events.off('routeChangeStart', change);
      Router.events.off('routeChangeComplete', noChange);
    };
  }, []);

  return progress;
}
