"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { FaPhoneAlt, FaEnvelope, FaDiscord, FaPaperPlane, FaSpinner } from "react-icons/fa";

const info = [
  { icon: <FaPhoneAlt />, title: "Celular", description: "(+57) 317 768 6358" },
  { icon: <FaEnvelope />, title: "Email", description: "liu.galax.dev.ops@gmail.com" },
  { icon: <FaDiscord />, title: "Discord", description: "liu_galax_dev_ops" },
];

const Contact = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // null | "ok" | "error"

  const handle = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setStatus("ok");
        setForm({ firstname: "", lastname: "", email: "", phone: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: "easeIn" } }}
      className="py-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          {/* Form */}
          <div className="xl:h-[54%] order-2 xl:order-none">
            <form onSubmit={onSubmit} className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
              <h3 className="text-4xl text-accent">Trabajemos juntos</h3>
              <p className="text-white/60">
                Rellena el formulario para entrar en contacto y crear lo que necesites
              </p>

              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input name="firstname" placeholder="Nombre" value={form.firstname} onChange={handle("firstname")} />
                <Input name="lastname" placeholder="Apellido" value={form.lastname} onChange={handle("lastname")} />
                <Input type="email" name="email" placeholder="Email" value={form.email} onChange={handle("email")} />
                <Input name="phone" placeholder="Celular" value={form.phone} onChange={handle("phone")} />
              </div>

              {/* Select */}
              <Select value={form.service} onValueChange={(v) => setForm((s) => ({ ...s, service: v }))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un servicio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Desarrollo Web">Desarrollo Web</SelectItem>
                    <SelectItem value="Diseño UI/UX">Diseño UI/UX</SelectItem>
                    <SelectItem value="Diseño de Logos">Diseño de Logos</SelectItem>
                    <SelectItem value="Consulta personalizada">Consulta personalizada</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Textarea */}
              <Textarea
                className="h-[200px]"
                placeholder="Escribe tu mensaje aquí."
                value={form.message}
                onChange={handle("message")}
              />

              {/* Submit */}
              <Button
                size="md"
                className="w-48 inline-flex items-center justify-center gap-2"
                type="submit"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" aria-hidden="true" />
                    Enviando…
                  </>
                ) : (
                  <>
                    <FaPaperPlane aria-hidden="true" />
                    Enviar mensaje
                  </>
                )}
              </Button>

              {/* Estado */}
              {status === "ok" && <p className="text-green-400">¡Mensaje enviado correctamente!</p>}
              {status === "error" && <p className="text-red-400">No se pudo enviar. Inténtalo de nuevo.</p>}
            </form>
          </div>

          {/* Info */}
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => (
                <li key={index} className="flex items-center gap-6">
                  <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                    <div className="text-[28px]">{item.icon}</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-white/60">{item.title}</p>
                    <h3 className="text-xl">{item.description}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
