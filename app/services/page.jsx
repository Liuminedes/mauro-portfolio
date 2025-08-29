"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowDownRight } from "react-icons/bs";

const services = [
  {
    num: "01",
    title: "Desarrollo de Plataformas",
    description:
      "Desarrollo a medida con foco en rendimiento y seguridad. Integraciones (APIs, pagos), panel de control y CI/CD listos para crecer",
    href: "",
  },
  {
    num: "02",
    title: "Diseño de UI/UX",
    description:
      "UI/UX centrado en el usuario: investigación, arquitectura de información y prototipos. Accesibilidad y handoff impecable para dev",
    href: "",
  },
  {
    num: "03",
    title: "Automatizaciones",
    description:
      "Automatizaciones end-to-end con APIs, webhooks y orquestadores (Zapier/Make) o Node/cron jobs: sincroniza datos, envía alertas, genera reportes y dispara acciones en tus herramientas.",
    href: "",
  },
  {
    num: "04",
    title: "Soporte técnico",
    description:
      "Soporte continuo con performance, seguridad, backups y monitoreo. Respuesta ágil a incidentes y mejoras constantes dentro de tu sistema de atención al cliente basado en correos o websites.",
    href: "",
  },
];

const Services = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {services.map((service, index) => {
            return (
              <div
                key={index}
                className="flex-1 flex flex-col justify-center gap-6 group"
              >
                {/* Top */}
                <div className="w-full flex justify-between items-center">
                  <div
                    className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover
                  transition-all duration-400"
                  >
                    {service.num}
                  </div>
                  <Link
                    href={service.href}
                    className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent
                  transition-all duration-400 flex justify-center items-center hover:-rotate-45"
                  >
                    <BsArrowDownRight className="text-primary text-3xl" />
                  </Link>
                </div>
                {/* Title */}
                <h2
                  className="text-[42px] font-bold leading-none text-white group-hover:text-accent
                transition-all duration-400"
                >
                  {service.title}
                </h2>
                {/* Description */}
                <p className="text-white/60">{service.description}</p>
                <div className="border-b border-white/20 w-full"></div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
