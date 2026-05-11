"use client";

import Link from "next/link";
import { useState } from "react";

const TOPICS = [
  { label: "Livable Cities",        href: "/livable-cities/" },
  { label: "Human Animal Conflict", href: "/human-animal-conflict/" },
  { label: "Nature Restoration",    href: "/nature-restoration/" },
  { label: "Education",             href: "/education/" },
  { label: "Events",                href: "/events/" },
  { label: "Innovation",            href: "/innovations/" },
  { label: "Fellowship",            href: "/fellowship/" },
];

const SITE_LINKS = [
  { label: "Home",           href: "/" },
  { label: "Projects",       href: "/projects/" },
  { label: "Deep Dive",      href: "/deep-dive/" },
  { label: "Blogs",          href: "/blogs-articles/" },
  { label: "Careers",        href: "/careers/" },
  { label: "Engage With Us", href: "/engage-with-us/" },
  { label: "What We Do",     href: "/what-we-do/" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-4 flex h-16 items-center justify-between gap-4">

        {/* Logo — swap src once logo file is in /public */}
        <Link href="/" className="shrink-0 flex items-center gap-2 font-bold text-base tracking-tight leading-tight" onClick={() => setOpen(false)}>
          <span className="text-red-500 text-2xl font-black">MEF</span>
          <span className="text-xs text-gray-400 hidden sm:block leading-tight">
            massive earth<br />foundation
          </span>
        </Link>

        {/* Topics — desktop only */}
        <nav className="hidden lg:flex items-center gap-5 flex-1 justify-center">
          {TOPICS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger button */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="p-2 rounded hover:bg-gray-800 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Dropdown — site sections */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 top-16 bg-black/40 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-4 top-[4.25rem] w-56 bg-gray-950 border border-gray-800 rounded-lg shadow-2xl z-50 overflow-hidden">
            <nav className="flex flex-col py-2">
              {SITE_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              {/* Topics on mobile — shown in dropdown since they're hidden in nav */}
              <div className="lg:hidden border-t border-gray-800 mt-2 pt-2">
                {TOPICS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="px-5 py-3 text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors block"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
