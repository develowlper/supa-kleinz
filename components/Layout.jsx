import { useRouter } from 'next/router';
import Heart from './Heart';
import { Navbar, Footer } from './Navigation';

export default function Layout({ children, ignore = ['/signin'] }) {
  const router = useRouter();

  if (ignore.some((x) => x === router.pathname)) {
    return children;
  }

  return (
    <div>
      <Navbar />
      {/* <Heart /> */}
      <main className="bg-fuchsia-100 h-full">{children}</main>
      <Footer />
    </div>
  );
}
