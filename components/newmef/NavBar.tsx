"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Sectors",    href: "/newmef/sectors" },
  { label: "Programmes", href: "/newmef/programmes" },
  { label: "Research",   href: "/newmef/research" },
  { label: "Events",     href: "/newmef/events" },
  { label: "Partners",   href: "/newmef/partners" },
  { label: "Policy",     href: "/newmef/policy" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ background: "rgba(10,10,10,0.82)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/newmef" className="flex items-center gap-2 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://massivefoundation.org/wp-content/uploads/2024/08/Group-27481-1.webp"
            alt="MEF"
            className="h-8 w-auto object-contain"
            draggable={false}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold uppercase transition-colors"
                style={{
                  fontFamily: "var(--font-oswald)",
                  letterSpacing: "0.06em",
                  color: active ? "#fff" : "rgba(255,255,255,0.55)",
                  borderBottom: active ? "2px solid #e50000" : "2px solid transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10" style={{ background: "rgba(10,10,10,0.96)" }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 text-sm font-semibold uppercase border-b border-white/5 transition-colors hover:text-white"
              style={{
                fontFamily: "var(--font-oswald)",
                letterSpacing: "0.06em",
                color: pathname.startsWith(link.href) ? "#fff" : "rgba(255,255,255,0.55)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
