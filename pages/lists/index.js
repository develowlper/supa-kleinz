import Head from 'components/Head';
import { NavLink } from 'components/Navigation';
import styles from './index.module.css';

export default function Lists() {
  return (
    <div>
      <Head title="lists" />
      <div>
        <h2>Lists:</h2>
        <div className={styles.links}>
          <NavLink href="/lists/todo" label="> todo" />
          <NavLink href="/lists/tobuy" label="> tobuy" />
        </div>
      </div>
    </div>
  );
}
