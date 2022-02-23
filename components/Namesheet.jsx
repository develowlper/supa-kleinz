import clsx from 'clsx';

import { motion } from 'framer-motion';
import listTransition from './animations/listTransition';

export default function NameSheet({ children, className }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={listTransition}
      className={clsx('space-y-2', className)}
    >
      {children}
    </motion.div>
  );
}
