import Link from "next/link";

const WORK_LINKS = [
  { label: "Programmes & Accelerators",   href: "/programmes" },
  { label: "Climate Sectors",             href: "/sectors" },
  { label: "Climate Events & Summits",    href: "/events-summits" },
  { label: "Reports & Publications",      href: "/research" },
  { label: "Articles, Insights & Essays", href: "/blogs-articles/" },
  { label: "Partnerships",                href: "/partners" },
  { label: "Get Involved",                href: "/get-involved" },
];

const VISION_LINKS = [
  { label: "Livable Cities",        href: "/livable-cities/" },
  { label: "Air Pollution",         href: "/air-pollution/" },
  { label: "City Waste Projects",   href: "/city-waste-projects/" },
  { label: "Heat Island Effect",    href: "/heat-island-effect/" },
  { label: "Walkability Index",     href: "/walkability-index/" },
  { label: "Human Animal Conflict", href: "/human-animal-conflict/" },
  { label: "Nature Restoration",    href: "/nature-restoration/" },
];

const SOCIALS = [
  {
    label: "LinkedIn", href: "#",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>,
  },
  {
    label: "Facebook", href: "#",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>,
  },
  {
    label: "X", href: "#",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  },
  {
    label: "Instagram", href: "#",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></svg>,
  },
  {
    label: "YouTube", href: "#",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 1.95C5.12 20 12 20 12 20s6.88 0 8.6-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" /></svg>,
  },
];

const COL_LABEL = "text-xs font-bold uppercase tracking-widest text-white mb-5 border-b border-white/20 pb-2 w-fit";

export default function Footer() {
  return (
    <footer
      className="relative text-white mt-auto"
      style={{
        backgroundImage: "url(https://cms.massivefoundation.org/wp-content/uploads/2024/08/Frame160281.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/35" />

      {/* Main body */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12">

          {/* Left — Logo + contact */}
          <div className="max-w-xs shrink-0">
            <div className="mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cms.massivefoundation.org/wp-content/uploads/2024/08/Group-27481-1.webp"
                alt="Massive Earth Foundation"
                className="h-20 w-auto object-contain"
                draggable={false}
              />
            </div>
            <div className="text-sm text-gray-300 space-y-1.5" style={{ fontFamily: "var(--font-inter)" }}>
              <p><span className="font-semibold text-white">Contact us:</span></p>
              <p>
                Email:{" "}
                <a href="mailto:partners@gomassive.org" className="hover:text-white transition-colors">
                  partners@gomassive.org
                </a>
              </p>
              <p className="text-xs text-gray-400 leading-relaxed mt-2">
                Sector-43, Golf Course Road,<br />
                Gurugram, Haryana – 122002
              </p>
            </div>
          </div>

          {/* Right — two nav cols */}
          <div className="flex gap-16 sm:gap-24">

            <nav>
              <p className={COL_LABEL} style={{ fontFamily: "var(--font-jakarta)" }}>Work</p>
              <div className="flex flex-col gap-2.5">
                {WORK_LINKS.map((item) => (
                  <Link key={item.href} href={item.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            <nav>
              <p className={COL_LABEL} style={{ fontFamily: "var(--font-jakarta)" }}>Vision</p>
              <div className="flex flex-col gap-2.5">
                {VISION_LINKS.map((item) => (
                  <Link key={item.href} href={item.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/10 py-4 bg-black/30">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2019 Massive Earth Foundation | All Rights Reserved</p>

          <div className="flex items-center gap-4">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <div className="flex gap-4">
            <Link href="/privacy-policy/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-conditions/" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
