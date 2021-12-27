import clsx from 'clsx';

import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.25 } },
};

export default function NameSheet({ children, className }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={variants}
      className={clsx('space-y-2', className)}
    >
      {children}
    </motion.div>
  );
}
