import { useRouter } from 'next/router';
import { Navbar, Footer } from './Navigation';
import Toolbar from './Toolbar';

export default function Layout({ children, ignore = ['/signin'] }) {
  const router = useRouter();

  if (ignore.some((x) => x === router.pathname)) {
    return children;
  }

  if (true) {
    return (
      <div className="flex flex-col h-screen">
        <Toolbar />
        <Navbar />
        <main role="main" className="flex-1 bg-fuchsia-50">
          <div className="container mx-auto h-full">{children}</div>
        </main>
        <Footer />
      </div>
    );
  }
}
