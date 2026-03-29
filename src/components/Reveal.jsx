import { motion } from 'framer-motion';

const Reveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.165, 0.84, 0.44, 1] }}
  >
    {children}
  </motion.div>
);

export default Reveal;
