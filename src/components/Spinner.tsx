import { motion } from 'framer-motion';

export default function Spinner() {
  return (
    <motion.div
      className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 0.6,
        ease: 'linear',
      }}
    />
  );
}
