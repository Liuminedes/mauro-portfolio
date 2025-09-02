"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import "swiper/css";
import WorkSliderBtns from "@/components/WorkSliderBtns";

const projects = [
  {
    num: "1",
    category: "IntraCom",
    title: "Proyecto 1",
    description:
      "IntraCom es un chat corporativo privado para equipos. Mensajería en tiempo real, envío y vista previa de documentos (PDF, Word, Excel), imágenes y ZIP, con roles, búsqueda y panel de administración para ordenar usuarios y permisos.",
    stack: [
      { name: "React.js" },
      { name: "Node.js/Express" },
      { name: "Tailwind.css" },
      { name: "Mysql/MariaDB" },
    ],
    image: "/assets/work/Intracom.png",
    live: "",
    github: "",
  },
  {
    num: "2",
    category: "Firma de Abogados",
    title: "Proyecto 2",
    description:
      "Website comercial de Tirado Escobar: landing page que presenta servicios legales y experiencia del equipo, orientada a convertir visitas en consultas de contacto. Incluye una IA personalizada que da mensajes precisos y unicos sobre los servicios que ofrece la Firma de Abogados.",
    stack: [
      { name: "Next.js" },
      { name: "Tailwind.css" },
      { name: "BotPress" },
    ],
    image: "/assets/work/tirado.png",
    live: "",
    github: "",
  },
  {
    num: "3",
    category: "Victoria Fashion",
    title: "Proyecto 3",
    description:
      "e-Commerce enfocada a la venta de pijamas, ropa casual, ropa íntima y demás productos de vestir para el público femenino. Se integraron formas de metodos de pago y tambien contacto directo para solicitudes de compra por via whatsapp",
    stack: [
      { name: "Wordpress" },
      { name: "Bootstrap" },
      { name: "Elementor" },
    ],
    image: "/assets/work/victoriafashion.png",
    live: "",
    github: "",
  },
  {
    num: "4",
    category: "Commission Maker",
    title: "Proyecto 4",
    description:
      "Esta es una plataforma web interna que opera como un gestor de nómina para el área comercial de vehiculos multimarca, en el que analiza cantidad de ventas, porcentaje de comisiones, insentivos que se generan en un PDF final de nómina. También tiene una sección donde se puede tener una trazabilidad de matriculas y entregas de vehiculos y asi conocer bien su proceso con el cliente.",
    stack: [
      { name: "React.js" },
      { name: "Node.js/Express" },
      { name: "MySQL/MariaDB" },
      { name: "JavaScript" },
    ],
    image: "/assets/work/commissionmaker.png",
    live: "",
    github: "",
  },
  {
    num: "5",
    category: "TradeForge AIS",
    title: "Proyecto 5",
    description:
      "Como proyecto personal, está en desarrollo un sistema de trading con inteligencia artificial, en el que se podrán realizar operaciones en el mercado de cryptomonedas de forma autónoma y didactica. La IA estará de tu lado y tu podrás aprender a como mejorar tu capital y hacer trading correctamente.",
    stack: [
      { name: "React.js" },
      { name: "Node.js/Express" },
      { name: "TradingView Widget" },
    ],
    image: "/assets/work/trading.png",
    live: "",
    github: "",
  },
];

const Work = () => {
  const [project, setProject] = useState(projects[0]);
  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    setProject(projects[currentIndex]);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0  select-none"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              {/* Outline */}
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>
              {/* Category */}
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                Proyecto {project.category}
              </h2>
              {/* Description */}
              <p className="text-white/60">{project.description}</p>
              {/* Stock */}
              <ul className="flex gap-4">
                {project.stack.map((item, index) => {
                  return (
                    <li key={index} className="text-xl text-accent">
                      {item.name}
                      {index !== project.stack.length - 1 && ","}
                    </li>
                  );
                })}
              </ul>
              {/* Border */}
              <div className="border border-white/20"></div>
              {/* Buttons */}
              <div className="flex items-center gap-4">
                {/* Live Project Button */}
                <Link href={project.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live Project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                {/* Github Project Button */}
                <Link href={project.github}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsGithub className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Repositorio de Github</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[450px] relative group flex justify-center items-center bg-pink-50/20">
                      {/* Overlay */}
                      <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                      {/* Image */}
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          fill
                          className="object-cover"
                          alt=""
                        ></Image>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              {/* Slider Buttons */}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Work;
