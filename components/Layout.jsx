import { useRouter } from 'next/router';
import { Navbar, Footer } from './Navigation';

export default function Layout({ children, ignore = ['/signin'] }) {
  const router = useRouter();

  if (ignore.some((x) => x === router.pathname)) {
    return children;
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="bg-fuchsia-100 flex-1">
        <div className="container mx-auto pt-4 px-2 pb-2">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
