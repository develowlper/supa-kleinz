import { useRouter } from 'next/router';
import Heart from './Heart';
import styles from './Layout.module.css';
import { Navbar, Footer } from './Navigation';

export default function Layout({ children, ignore = ['/signin'] }) {
  const router = useRouter();

  if (ignore.some((x) => x === router.pathname)) {
    return children;
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <Heart />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
