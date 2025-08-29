"use client";

import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaFigma,
  FaNodeJs,
  FaDatabase,
} from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs } from "react-icons/si";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const about = {
  title: "Sobre mí",
  description: "Tengo 22 años y soy la mera verga",
  info: [
    { fieldName: "Nombre", fieldValue: "Mauricio Rodriguez L." },
    { fieldName: "Celular", fieldValue: "(+57) 317 768 6358" },
    { fieldName: "Experencia", fieldValue: "3 años" },
    { fieldName: "Correo", fieldValue: "maurorl200318@gmail.com" },
    { fieldName: "Discord", fieldValue: "liu_galax_dev_ops" },
    { fieldName: "Freelance", fieldValue: "Disponible" },
    { fieldName: "Idiomas", fieldValue: "Español e Inglés" },
  ],
};

const experience = {
  icon: "/assets/resume/badge.svg",
  title: "Experiencia",
  description:
    "Llevo como experiencia una mujer que me dio un desarrollo de personaje el gonorrea",
  items: [
    {
      company: "Almotores S.A",
      position: "Auxiliar de Informática",
      duration: "2022 - Actual",
    },
    {
      company: "Independiente",
      position: "Desarrollador de website E-Commerce",
      duration: "2023",
    },
    {
      company: "Independiente",
      position: "Desarrollador de website Firma de Abogados",
      duration: "2024 - 2025",
    },
  ],
};

const education = {
  icon: "/assets/resume/cap.svg",
  title: "Formación",
  description:
    "En la siguiente sección se demuestra mis conocimientos y aprendizaje a lo largo de los años como desarrollador",
  items: [
    {
      institution: "CECEP",
      degree: "Tecnólogo Desarrollador de IT",
      duration: "2021 - Actual",
    },
    {
      institution: "Normativa ISO 27000 - 270001",
      degree: "Certificado de Seguridad Informática",
      duration: "2025",
    },
    {
      institution: "Udemy",
      degree: "Curso de Desarrollo Full-Stack",
      duration: "2024",
    },
    {
      institution: "Udemy",
      degree: "Bootcamp de Frontend con ReactJS",
      duration: "2024",
    },
    {
      institution: "Udemy",
      degree: "Bootcamp de Backend con NodeJS",
      duration: "2024",
    },
    {
      institution: "Certificación de Investigación e Innovación",
      degree: "Investigación de integraciones con IA",
      duration: "2022",
    },
  ],
};

const skills = {
  title: "Mis habilidades",
  description:
    "Estas son las habilidades tecnicas que poseo en el desempeño de desarrollo de apps webs, moviles o de escritorio",
  skillList: [
    { icon: <FaHtml5 />, name: "Html 5" },
    { icon: <FaCss3 />, name: "Css 5" },
    { icon: <FaJs />, name: "Javacript" },
    { icon: <FaReact />, name: "React.JS" },
    { icon: <FaFigma />, name: "Figma" },
    { icon: <FaNodeJs />, name: "Node.JS" },
    { icon: <SiTailwindcss />, name: "Tailwind.CSS" },
    { icon: <SiNextdotjs />, name: "Next.JS" },
    { icon: <FaDatabase />, name: "MySQL/MariaDB" },
  ],
};

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          delay: 2.4,
          duration: 0.4,
          ease: "easeIn",
        },
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          <TabsList className="flex flex-col w-full max-w-[350px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="experience">Experiencia</TabsTrigger>
            <TabsTrigger value="education">Conocimientos</TabsTrigger>
            <TabsTrigger value="skills">Habilidades</TabsTrigger>
            <TabsTrigger value="about">Sobre mi</TabsTrigger>
          </TabsList>

          <div className="min-h-[70vh] w-full">
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{experience.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:m-0">
                  {experience.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {experience.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col 
                        justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                            {item.position}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white">{item.company}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{education.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:m-0">
                  {education.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {education.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col 
                        justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                            {item.degree}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white">{item.institution}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <div>
                    <h3 className="text-4xl font-bold">{skills.title}</h3>
                    <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                      {skills.description}
                    </p>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:gap[30px]">
                      {skills.skillList.map((skill, index) => {
                        return <li key={index}>{skill.name}</li>;
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="about" className="w-full"></TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
