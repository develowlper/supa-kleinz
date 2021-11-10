import { motion } from 'framer-motion';
import styles from './Heart.module.css';

export default function Heart(props) {
  return (
    <>
      <motion.div className={styles.back}></motion.div>
      <div className={styles.container}>
        <div className={styles.heart}></div>
      </div>
    </>
  );
}
