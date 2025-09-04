"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Stairs from "./Stairs";

/**
 * Renderiza los “escalones” SOLO durante el cambio de ruta.
 * En móvil esto evita que quede un fixed invisible ocupando el viewport.
 */
const StairTransition = () => {
  const pathname = usePathname();
  const prev = useRef(pathname);
  const firstRender = useRef(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Evitar animación en el primer render
    if (firstRender.current) {
      firstRender.current = false;
      prev.current = pathname;
      return;
    }

    // Si la ruta cambió, dispara transición y desmóntala al finalizar
    if (prev.current !== pathname) {
      prev.current = pathname;
      setShow(true);
      const totalMs = 900; // 6 steps * (0.3s dur + 0.1s delay) ≈ 0.9s
      const t = setTimeout(() => setShow(false), totalMs);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  if (!show) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        aria-hidden
        className="fixed inset-0 z-40 pointer-events-none h-[100dvh] w-[100dvw]"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }}
      >
        <div className="absolute inset-0 flex">
          <Stairs />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StairTransition;
