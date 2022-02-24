import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import { Navbar, Footer } from './Navigation';
import Toolbar from './Toolbar';

export default function Layout({ children, ignore = ['/signin'] }) {
  const router = useRouter();

  const [progress, setProgress] = useState(false);

  Router.events.on('routeChangeStart', () => {
    setProgress(true);
    //function will fired when route change started
  });

  Router.events.on('routeChangeComplete', () => {
    setProgress(false);
    //function will fired when route change ended
  });

  if (ignore.some((x) => x === router.pathname)) {
    return children;
  }

  return (
    <>
      {progress && <div className="h-1 bg-fuchsia-700 animate-pulse"></div>}
      <div className="flex flex-col h-screen">
        <Toolbar />
        <Navbar />
        <main role="main" className="flex-1 bg-fuchsia-50">
          <div className="container mx-auto h-full">{children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
}
