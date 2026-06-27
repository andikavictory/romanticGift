import { motion } from "framer-motion";

export default function Envelope({ open }) {
  return (
    <div className="envelope-premium">

      <motion.div
        className="letter-sheet"
        animate={{
          y: open ? -100 : 0
        }}
        transition={{
          duration: 2,
          delay: 1.6,
          ease: "easeOut"
        }}
      >
      <div className="letter-content">
        <div className="letter-line"></div>
        <div className="letter-line"></div>
        <div className="letter-line short"></div>
      </div>
      </motion.div>

      <div className="envelope-back"></div>

      <motion.div
        className="envelope-flap-premium"
        animate={{
          rotateX: open ? 180 : 0
        }}
        transition={{
          duration: 1.6
        }}
      />

      <motion.div
        className="wax-seal"
        animate={{
          scale: open ? 0 : 1,
          opacity: open ? 0 : 1
        }}
      >
        ❤️
      </motion.div>

        <div className="envelope-front-premium" />

    </div>
  );
}