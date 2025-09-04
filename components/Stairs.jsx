import { motion } from "framer-motion";

const TOTAL_STEPS = 6;

const stairAnimation = {
  initial: { top: "0%" },
  animate: { top: "100%" },
  exit: { top: "100%" },
};

const reverseIndex = (i) => TOTAL_STEPS - i - 1;

/** Cada panel cubre su columna y baja; luego el contenedor se desmonta. */
const Stairs = () => {
  return (
    <>
      {[...Array(TOTAL_STEPS)].map((_, index) => (
        <motion.div
          key={index}
          variants={stairAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.3,
            ease: "easeInOut",
            delay: reverseIndex(index) * 0.1,
          }}
          className="relative h-full w-full bg-primary"
        />
      ))}
    </>
  );
};

export default Stairs;
