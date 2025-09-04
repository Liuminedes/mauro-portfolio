"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Capa de fundido (fade) SOLO mientras se navega.
 * Se desmonta al terminar para no tapar nada en móvil.
 */
const PageTransition = ({ children }) => {
  const pathname = usePathname();
  const prev = useRef(pathname);
  const firstRender = useRef(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      prev.current = pathname;
      return;
    }
    if (prev.current !== pathname) {
      prev.current = pathname;
      setShow(true);
      const t = setTimeout(() => setShow(false), 800); // coincide con el fade
      return () => clearTimeout(t);
    }
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {show && (
          <motion.div
            key={pathname}
            className="fixed inset-0 z-30 pointer-events-none bg-primary h-[100dvh] w-[100dvw]"
            initial={{ opacity: 1 }}
            animate={{
              opacity: 0,
              transition: { delay: 0.6, duration: 0.2, ease: "easeInOut" },
            }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      {children}
    </>
  );
};

export default PageTransition;
