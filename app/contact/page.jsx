"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaDiscord,
  FaPaperPlane,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const ACCENT = "#bb55ff";

const info = [
  { icon: <FaPhoneAlt />, title: "Celular", description: "(+57) 317 768 6358" },
  { icon: <FaEnvelope />, title: "Email", description: "liu.galax.dev.ops@gmail.com" },
  { icon: <FaDiscord />, title: "Discord", description: "liu_galax_dev_ops" },
];

// Helpers
const isEmail = (s = "") => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim());

// formatea una lista en español: a, b y c
const formatList = (arr) => {
  if (arr.length <= 1) return arr.join("");
  return `${arr.slice(0, -1).join('", "')}" y "${arr[arr.length - 1]}`;
};

// Validación que devuelve “códigos” para resumir en un solo toast
function validate(form) {
  const errs = [];

  if (!form.firstname.trim() || form.firstname.trim().length < 2) errs.push("Nombre");
  if (!form.lastname.trim() || form.lastname.trim().length < 2) errs.push("Apellido");

  if (!form.email.trim()) errs.push("Correo");
  else if (!isEmail(form.email)) errs.push("Correo válido");

  if (!form.phone.trim()) errs.push("Celular");
  else if (!/^\d{7,15}$/.test(form.phone.trim()))
    errs.push("Celular (solo números, 7–15 dígitos)");

  if (!form.service.trim()) errs.push("Seleccionar un servicio");
  if (!form.message.trim() || form.message.trim().length < 10)
    errs.push("Mensaje (mín. 10 caracteres)");

  return errs;
}

// ---- TOAST UI: estilizado, centrado y con iconos ----
function showToast(kind, title, detail = "", duration = 4500) {
  const Icon =
    kind === "success" ? FaCheckCircle : kind === "error" ? FaTimesCircle : FaInfoCircle;

  toast.custom(
    (t) => (
      <div
        role="status"
        className={[
          // container
          "pointer-events-auto w-[min(92vw,460px)] rounded-xl shadow-xl",
          "border border-white/10 bg-[#1b1b21]/95 backdrop-blur",
          "px-4 py-3 grid grid-cols-[auto,1fr,auto] items-start gap-3",
          t.visible ? "animate-in fade-in-0 zoom-in-95 duration-200" : "animate-out fade-out-0 zoom-out-95 duration-150",
        ].join(" ")}
        style={{ color: "#eaeaea" }}
      >
        <div
          className={[
            "mt-0.5 flex h-8 w-8 items-center justify-center rounded-full",
            kind === "success" ? "bg-green-500/20" : kind === "error" ? "bg-red-500/20" : "bg-white/10",
          ].join(" ")}
        >
          <Icon
            className={kind === "success" ? "text-green-400" : kind === "error" ? "text-red-400" : "text-white/80"}
            size={18}
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0">
          <p className="font-semibold leading-5" style={{ color: ACCENT }}>
            {title}
          </p>
          {detail ? (
            <p className="mt-1 text-sm text-white/80 leading-6 break-words">{detail}</p>
          ) : null}
        </div>

        <button
          onClick={() => toast.dismiss(t.id)}
          aria-label="Cerrar"
          className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-md text-white/60 hover:text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[--accent]"
          style={{ ["--accent"]: ACCENT }}
        >
          ✕
        </button>
      </div>
    ),
    { duration, position: "top-center", id: kind === "error" ? "one-error" : undefined }
  );
}

export default function Contact() {
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

  // Solo dígitos en celular
  const handlePhone = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    setForm((s) => ({ ...s, phone: digitsOnly }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    const errors = validate(form);
    if (errors.length) {
      const allSimpleMissing = errors.every((l) =>
        ["Nombre", "Apellido", "Correo", "Celular", "Seleccionar un servicio", "Mensaje (mín. 10 caracteres)"].includes(
          l
        )
      );

      const head = allSimpleMissing ? "Faltan campos por completar" : "Revisa los siguientes campos";
      const detail = `"${formatList(errors)}"`;
      showToast("error", head, detail, 6000);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();

      if (res.ok && json.ok) {
        setStatus("ok");
        showToast("success", "¡Mensaje enviado correctamente!", "Te responderé en breve.");
        setForm({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        setStatus("error");
        showToast("error", "No se pudo enviar", json?.error || "Inténtalo de nuevo.");
      }
    } catch {
      setStatus("error");
      showToast("error", "No se pudo enviar", "Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toaster centrado, con un z alto para ir sobre transiciones */}
      <Toaster
        position="top-center"
        gutter={10}
        containerStyle={{ zIndex: 80 }}
        toastOptions={{
          duration: 4500,
          // por si disparas toasts nativos (success/error), igualamos colores al tema
          success: { iconTheme: { primary: ACCENT, secondary: "#0f0f12" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#0f0f12" } },
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
        }}
        className="py-6"
      >
        <div className="container mx-auto">
          <div className="flex flex-col xl:flex-row gap-[30px]">
            {/* Form */}
            <div className="xl:h-[54%] order-2 xl:order-none">
              <form
                onSubmit={onSubmit}
                className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl"
              >
                <h3 className="text-4xl text-accent">Trabajemos juntos</h3>
                <p className="text-white/60">
                  Rellena el formulario para entrar en contacto y crear lo que necesites
                </p>

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    name="firstname"
                    placeholder="Nombre"
                    value={form.firstname}
                    onChange={handle("firstname")}
                  />
                  <Input
                    name="lastname"
                    placeholder="Apellido"
                    value={form.lastname}
                    onChange={handle("lastname")}
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handle("email")}
                  />
                  <Input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    name="phone"
                    placeholder="Celular"
                    value={form.phone}
                    onChange={handlePhone}
                  />
                </div>

                {/* Select */}
                <Select
                  value={form.service}
                  onValueChange={(v) => setForm((s) => ({ ...s, service: v }))}
                >
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

                {/* Estado textual opcional */}
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
    </>
  );
}
