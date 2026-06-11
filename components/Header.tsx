"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home",           href: "/" },
  { label: "Projects",       href: "/projects/" },
  { label: "AgriGuru",       href: "/projects/agriguru/" },
  { label: "MVTFD",          href: "/projects/mvtfd/" },
  { label: "Deep Dive",      href: "/deep-dive/" },
  { label: "Blogs",          href: "/blogs-articles/" },
  { label: "Careers",        href: "/careers/" },
  { label: "Engage With Us", href: "/engage-with-us/" },
  { label: "What We Do",     href: "/what-we-do/" },
];

const TOPICS = [
  { label: "Livable Cities",        href: "/livable-cities/" },
  { label: "Human Animal Conflict", href: "/human-animal-conflict/" },
  { label: "Nature Restoration",    href: "/nature-restoration/" },
  { label: "Education",             href: "/education/" },
  { label: "Events",                href: "/events/" },
  { label: "Innovation",            href: "/innovations/" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-gray-950 text-white">
        <div className="mx-auto max-w-7xl px-4 flex h-16 items-center justify-between gap-4">

          <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://cms.massivefoundation.org/wp-content/uploads/2020/04/MEF_logo_red.png"
              alt="Massive Earth Foundation"
              className="h-10 w-auto"
            />
          </Link>

          {/* Topics + Projects dropdown — desktop only */}
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

            {/* Projects dropdown */}
            <div className="relative group">
              <button className="text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap flex items-center gap-1">
                Projects
                <svg className="w-3 h-3 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 w-44 hidden group-hover:block z-50">
                <div className="mt-0 pt-3">
                  <div className="bg-gray-950 border border-gray-800 shadow-lg">
                    <Link
                      href="/projects/agriguru/"
                      className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-red-700 transition-colors"
                    >
                      AgriGuru
                    </Link>
                    <Link
                      href="/projects/mvtfd/"
                      className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-red-700 transition-colors"
                    >
                      MVTFD
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded hover:bg-gray-800 transition-colors"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* ── Full-screen overlay menu ──────────────────────────────────── */}
      {open && (
        <div className="fixed inset-0 z-[100] flex">

          {/* Left: white contact panel */}
          <div className="w-full md:w-3/5 bg-white flex flex-col justify-center px-10 md:px-16 py-12 overflow-y-auto">
            {/* MEF red logo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://cms.massivefoundation.org/wp-content/uploads/2020/04/MEF_logo_red.png"
              alt="Massive Earth Foundation"
              className="h-16 w-auto mb-10 object-contain object-left"
            />

            <h2
              className="text-3xl font-bold uppercase text-gray-900 mb-3"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Connect With Us!
            </h2>
            <p
              className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Please use the contact information present below to write to us, and we will get
              back to you shortly.
            </p>

            {/* Form */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4 max-w-lg">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1" style={{ fontFamily: "var(--font-inter)" }}>Name</label>
                <input
                  type="text"
                  placeholder="Please enter your name here"
                  className="w-full border border-gray-300 px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1" style={{ fontFamily: "var(--font-inter)" }}>Email</label>
                <input
                  type="email"
                  placeholder="Please enter your email here"
                  className="w-full border border-gray-300 px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>
            </div>
            <button
              className="w-full max-w-lg bg-gray-900 text-white text-sm font-bold uppercase tracking-widest py-4 hover:bg-gray-700 transition-colors mb-10"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Connect
            </button>

            {/* Contact info */}
            <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: "var(--font-inter)" }}>
              Contact us:
            </p>
            <p className="text-xs text-gray-600 mb-6" style={{ fontFamily: "var(--font-inter)" }}>
              <strong>Email:</strong> partners@gomassive.org&nbsp;&nbsp;
              <strong>Address:</strong> Sector-43, Golf Course Road, Gurugram, Haryana – 122002
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-sm flex items-center justify-center bg-[#0A66C2] hover:opacity-80 transition-opacity">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05C12.55 8.9 14.2 8 16.1 8 20 8 20.5 10.6 20.5 14v10h-4v-9c0-2.1-.04-4.8-2.9-4.8-2.92 0-3.37 2.28-3.37 4.63V24H8V8z" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-sm flex items-center justify-center bg-[#1877F2] hover:opacity-80 transition-opacity">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.5h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
                </svg>
              </a>
              {/* X / Twitter */}
              <a href="#" aria-label="X" className="w-9 h-9 rounded-sm flex items-center justify-center bg-black hover:opacity-80 transition-opacity">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-sm flex items-center justify-center bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] hover:opacity-80 transition-opacity">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-sm flex items-center justify-center bg-[#FF0000] hover:opacity-80 transition-opacity">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: black nav panel */}
          <div className="hidden md:flex flex-col items-center justify-center flex-1 bg-black relative">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:border-white transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <nav className="flex flex-col items-center gap-7">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-white text-xl font-light hover:text-gray-300 transition-colors tracking-wide"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile: close button on top of left panel */}
          <button
            onClick={() => setOpen(false)}
            className="md:hidden absolute top-5 right-5 w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-gray-900 transition-colors z-10"
            aria-label="Close menu"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

        </div>
      )}
    </>
  );
}
