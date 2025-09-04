"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMenuFries } from "react-icons/ci";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const links = [
  { name: "Inicio", path: "/" },
  { name: "Servicios", path: "/services" },
  { name: "Sobre mi", path: "/resume" },
  { name: "Trabajos", path: "/work" },
];

const MobileNav = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Cierra el menú cuando cambia la ruta
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Abrir menú"
        className="flex items-center justify-center"
      >
        <CiMenuFries className="text-[32px] text-accent" />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="
          z-[60] h-dvh w-[85vw] max-w-sm
          pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]
          bg-[#1b1b21] border-white/10
          flex flex-col items-center justify-center gap-6
        "
      >
        {/* Accesibilidad: título para lectores de pantalla */}
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle>Menú de navegación</SheetTitle>
          </VisuallyHidden>
        </SheetHeader>

        {/* Marca / Logo */}
        <Link href="/" className="mb-2">
          <h1 className="text-4xl font-semibold">
            Mauricio<span className="text-accent">.</span>
          </h1>
        </Link>

        {/* Links + CTA juntos y centrados */}
        <nav className="flex flex-col items-center gap-4">
          {links.map((link) => {
            const active = pathname === link.path;
            return (
              <SheetClose asChild key={link.path}>
                <Link
                  href={link.path}
                  className={[
                    "px-4 py-2 rounded-md text-lg transition",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    active
                      ? "text-accent bg-white/5"
                      : "text-white/80 hover:text-accent hover:bg-white/5",
                  ].join(" ")}
                >
                  {link.name}
                </Link>
              </SheetClose>
            );
          })}

          {/* CTA */}
          <SheetClose asChild>
            <Link
              href="/contact"
              className="mt-2 px-4 py-2 rounded-lg bg-accent text-primary font-semibold hover:opacity-90 transition"
            >
              Contáctame
            </Link>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
