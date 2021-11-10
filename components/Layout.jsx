import Heart from './Heart';
import styles from './Layout.module.css';
import { Navbar, Footer } from './Navigation';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Navbar />
      <Heart />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
