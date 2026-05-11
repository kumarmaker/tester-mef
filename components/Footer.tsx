import Link from "next/link";

const NAV_LEFT = [
  { label: "Home",           href: "/" },
  { label: "Projects",       href: "/projects/" },
  { label: "Innovation",     href: "/innovations/" },
  { label: "Events",         href: "/events/" },
  { label: "Deep Dive",      href: "/deep-dive/" },
  { label: "Careers",        href: "/careers/" },
  { label: "Engage With Us", href: "/engage-with-us/" },
  { label: "What We Do",     href: "/what-we-do/" },
];

const NAV_RIGHT = [
  { label: "Livable Cities",        href: "/livable-cities/" },
  { label: "Human Animal Conflict", href: "/human-animal-conflict/" },
  { label: "Nature Restoration",    href: "/nature-restoration/" },
  { label: "Education",             href: "/education/" },
];

// Update these URLs to match the real social profiles
const SOCIALS = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 1.95C5.12 20 12 20 12 20s6.88 0 8.6-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      className="text-white mt-auto"
      style={{ backgroundColor: "#091929" }}
    >
      {/* Connect With Us */}
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-10 border-b border-white/10">
        <h2 className="text-3xl font-extrabold uppercase tracking-wide mb-2">
          Connect With Us
        </h2>
        <p className="text-sm text-gray-300 mb-6 max-w-sm">
          Please use the contact information present below to write to us, and
          we will get back to you shortly.
        </p>

        {/* Form — wire to a backend/email service when ready */}
        <form className="flex flex-col sm:flex-row gap-3 max-w-4xl">
          <input
            type="text"
            placeholder="Please enter your name here"
            className="flex-1 px-4 py-3 bg-transparent border border-white/30 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-white"
          />
          <input
            type="email"
            placeholder="Please enter your email here"
            className="flex-1 px-4 py-3 bg-transparent border border-white/30 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-white"
          />
          <button
            type="submit"
            className="px-10 py-3 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-sm transition-colors"
          >
            Connect
          </button>
        </form>
      </div>

      {/* Main footer body */}
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* Logo + contact — swap <div> for <Image> once logo file is ready */}
          <div className="max-w-xs shrink-0">
            {/* ASSET NEEDED: replace this block with next/image pointing to the MEF logo */}
            <div className="mb-6">
              <p className="text-red-500 font-black text-2xl uppercase leading-tight">
                massive<br />earth<br />foundation
              </p>
            </div>

            <div className="text-sm text-gray-300 space-y-1">
              <p>
                <span className="font-semibold text-white">Contact us:</span>
              </p>
              <p>
                Email:{" "}
                <a href="mailto:partners@gomassive.org" className="hover:text-white transition-colors">
                  partners@gomassive.org
                </a>
              </p>
              <p className="text-xs text-gray-400 leading-relaxed mt-2">
                Address: Sector-43, Golf Course Road,<br />
                Gurugram, Haryana – 122002
              </p>
            </div>
          </div>

          {/* Nav columns */}
          <div className="flex gap-12 sm:gap-20">
            <nav className="flex flex-col gap-3">
              {NAV_LEFT.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <nav className="flex flex-col gap-3">
              {NAV_RIGHT.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <p className="mt-4 text-xs text-gray-500 italic">
                *Images source: Unsplash &amp; Freepik.
              </p>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t border-white/10 py-4"
        style={{ backgroundColor: "#050d18" }}
      >
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2019 Massive Earth Foundation | All Rights Reserved</p>

          <div className="flex items-center gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <div className="flex gap-4">
            <Link href="/privacy-policy/" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions/" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
