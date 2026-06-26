"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type SubItem = { label: string; href: string };
type SubGroup = { heading: string; items: SubItem[] };
type NavItem = {
  label: string;
  href: string;
  groups?: SubGroup[];
  viewAll?: { label: string; href: string };
  grid?: boolean;
  gridTitle?: string;
};

const NAV: NavItem[] = [
  {
    label: "What We Do",
    href: "/programmes",
    groups: [
      {
        heading: "Climate Accelerators",
        items: [
          { label: "SAFFAL",               href: "/programmes/saffal" },
          { label: "LowCarbon.Earth",      href: "/programmes/lowcarbon-earth-accelerator" },
          { label: "AgroXlerate",          href: "/programmes/agroxlerate" },
          { label: "GoMassive Accelerator",href: "/programmes/gomassive-climate-accelerator-2023" },
        ],
      },
      {
        heading: "Pilot Projects",
        items: [
          { label: "Agra Innovation Lab",  href: "/programmes/agra-innovation-lab" },
          { label: "Zero Waste Cities",    href: "/programmes/zero-waste-cities" },
          { label: "EV Rickshaw Transition",href: "/programmes/ev-rickshaw-transition" },
          { label: "Net Zero Sarojini Nagar",href: "/programmes/net-zero-sarojini-nagar" },
        ],
      },
      {
        heading: "Climate Action",
        items: [
          { label: "Smriti Van",           href: "/programmes/sustainable-forests-smriti-van" },
          { label: "Smart Waste Mgmt",     href: "/programmes/smart-waste-management" },
          { label: "ICAP",                 href: "/programmes/icap-india-climate-accelerator-platform" },
        ],
      },
    ],
    viewAll: { label: "View All Programmes", href: "/programmes" },
  },
  {
    label: "Where We Work",
    href: "/sectors",
    grid: true,
    gridTitle: "Climate Sectors",
    groups: [
      {
        heading: "",
        items: [
          { label: "Circular Economy & Waste",      href: "/sectors/circular-economy-waste" },
          { label: "Clean Energy",                  href: "/sectors/clean-energy" },
          { label: "Climate Finance & Innovation",  href: "/sectors/climate-finance-innovation" },
        ],
      },
      {
        heading: "",
        items: [
          { label: "Clean Mobility",                href: "/sectors/clean-mobility" },
          { label: "Sustainable Agriculture",       href: "/sectors/sustainable-agriculture" },
          { label: "Sustainable Built Environment", href: "/sectors/sustainable-built-environment" },
        ],
      },
      {
        heading: "",
        items: [
          { label: "Air Quality & Pollution",       href: "/sectors/air-quality-pollution" },
          { label: "Forests & Biodiversity",        href: "/sectors/forests-biodiversity" },
          { label: "Gender & Social Equity",        href: "/sectors/gender-social-equity" },
        ],
      },
    ],
    viewAll: { label: "View All Sectors", href: "/sectors" },
  },
  {
    label: "Our Impact",
    href: "/research",
    groups: [
      {
        heading: "Reports",
        items: [
          { label: "Delhi Clean Air Report",       href: "/research/delhi-clean-air-report" },
          { label: "Air Pollution & Lockdown",     href: "/research/air-pollution-lockdown-study" },
          { label: "State of EV Charging",         href: "/research/state-of-ev-charging-report" },
          { label: "CCUS Report",                  href: "/research/ccus-report" },
        ],
      },
      {
        heading: "Events",
        items: [
          { label: "ClimateNXT 2025",              href: "/events-summits/climatenxt-2025" },
          { label: "ClimateNXT 2023",              href: "/events-summits/climatenxt-2023" },
          { label: "Japan Air Pollution Event",    href: "/events-summits/japan-air-pollution-event" },
        ],
      },
    ],
    viewAll: { label: "View All Research & Events", href: "/research" },
  },
  {
    label: "Who We Work With",
    href: "/partners",
    grid: true,
    gridTitle: "Key Partners",
    groups: [
      {
        heading: "",
        items: [
          { label: "UNEP",             href: "/partners/united-nations-environment-programme" },
          { label: "IFC",              href: "/partners/international-finance-corporation" },
          { label: "GIZ",              href: "/partners/giz" },
        ],
      },
      {
        heading: "",
        items: [
          { label: "WRI India",        href: "/partners/wri-india" },
          { label: "Google Cloud",     href: "/partners/google-cloud" },
          { label: "Invest India",     href: "/partners/invest-india" },
        ],
      },
      {
        heading: "",
        items: [
          { label: "The Incubation Network", href: "/partners/the-incubation-network" },
        ],
      },
    ],
    viewAll: { label: "View All Partners", href: "/partners" },
  },
  {
    label: "Policy Alignment",
    href: "/policy",
    groups: [
      {
        heading: "Global Frameworks",
        items: [
          { label: "Paris Agreement",              href: "/policy/paris-agreement" },
          { label: "SDG 13 — Climate Action",      href: "/policy/sdg-13-climate-action" },
          { label: "SDG 12 — Responsible Consumption", href: "/policy/sdg-12-responsible-consumption" },
          { label: "SDG 7 — Clean Energy",         href: "/policy/sdg-7-affordable-and-clean-energy" },
        ],
      },
      {
        heading: "National Policy",
        items: [
          { label: "India NDC 2.0",                href: "/policy/india-ndc-2-0" },
          { label: "India NDC 3.0",                href: "/policy/india-ndc-3-0" },
          { label: "Plastic Waste Mgmt Rules",     href: "/policy/plastic-waste-management-rules" },
        ],
      },
    ],
    viewAll: { label: "View All Policies", href: "/policy" },
  },
  {
    label: "Get Involved",
    href: "/get-involved",
    groups: [
      {
        heading: "Work With Us",
        items: [
          { label: "Partner With MEF",             href: "/partners" },
          { label: "Invest in a Programme",        href: "/programmes" },
          { label: "Join as a Mentor",             href: "/" },
          { label: "Contact Us",                   href: "/" },
        ],
      },
    ],
  },
];

const GLASS = "rgba(5,5,5,0.88)";
const BORDER = "rgba(255,255,255,0.10)";

export default function NavBar() {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ background: GLASS, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: `1px solid ${BORDER}` }}
      onMouseLeave={() => setActive(null)}
    >
      {/* Main bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-[auto_1fr_auto] items-center h-16 gap-6">

        {/* Logo — left */}
        <Link href="/" className="shrink-0 justify-self-start" onClick={() => setActive(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cms.massivefoundation.org/wp-content/uploads/2024/08/Group-27481-1.webp"
            alt="MEF"
            className="h-10 w-auto object-contain"
            draggable={false}
          />
        </Link>

        {/* Desktop nav — center */}
        <nav className="hidden lg:flex items-center justify-center h-full">
          {NAV.filter((item) => item.label !== "Get Involved").map((item) => {
            const isActive = active === item.label;
            const isCurrent = pathname.startsWith(item.href) && item.href !== "/";
            return (
              <Link
                key={item.label}
                href={item.href}
                onMouseEnter={() => setActive(item.label)}
                onClick={() => setActive(null)}
                className="relative h-full px-3 flex items-center gap-1 transition-colors"
                style={{
                  fontFamily: "var(--font-jakarta)",
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  wordSpacing: "0.1em",
                  color: "#ffffff",
                  borderBottom: isActive || isCurrent ? "2px solid #e50000" : "2px solid transparent",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Get Involved button + mobile hamburger — right */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/get-involved"
            className="hidden lg:flex items-center transition-colors hover:border-white/60"
            style={{
              fontFamily: "var(--font-oswald)",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#ffffff",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.35)",
              borderRadius: "8px",
              padding: "8px 18px",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Get Involved
          </Link>
          <Link
            href="/donate"
            className="hidden lg:flex items-center transition-opacity hover:opacity-90"
            style={{
              fontFamily: "var(--font-oswald)",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#ffffff",
              background: "#e50000",
              borderRadius: "8px",
              padding: "8px 18px",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Donate
          </Link>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Desktop mega-menu panel */}
      {active && (() => {
        const item = NAV.find(n => n.label === active);
        if (!item?.groups) return null;
        return (
          <div className="absolute left-0 right-0" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)" }}>
          <div
            className="border-t-2 border-black bg-white"
            style={{
              /* BG IMAGE — uncomment when ready
              backgroundImage: "url(/images/Navbar.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              */
            }}
            onMouseEnter={() => setActive(active)}
          >
            {/* White glass overlay — uncomment with BG image
            <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.68)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }} />
            */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">
              {item.grid ? (
                <>
                {item.gridTitle && (
                  <Link
                    href={item.viewAll?.href ?? item.href}
                    onClick={() => setActive(null)}
                    className="block text-sm font-bold uppercase tracking-widest text-black text-center mb-6 w-fit mx-auto border-b border-black pb-2 hover:text-red-600 hover:border-red-600 transition-colors"
                    style={{ fontFamily: "var(--font-public)" }}
                  >
                    {item.gridTitle}
                  </Link>
                )}
                <div className="grid grid-cols-3 gap-x-10 gap-y-1">
                  {item.groups.flatMap((g) => g.items).map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setActive(null)}
                      className="block text-sm px-2 py-1.5 -mx-2 rounded transition-all hover:bg-gray-100 hover:text-black"
                      style={{ fontFamily: "var(--font-inter)", color: "#555" }}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
                </>
              ) : (
                <div className="flex gap-12">
                  {item.groups.map((group) => (
                    <div key={group.heading} className="flex-1 min-w-0">
                      {group.heading && (
                        <Link
                          href={item.viewAll?.href ?? '#'}
                          onClick={() => setActive(null)}
                          className="group/hdr inline-flex items-center gap-1 text-xs uppercase tracking-widest text-black font-bold border-b border-black pb-2 w-fit mb-3 hover:text-red-600 hover:border-red-600 transition-colors"
                          style={{ fontFamily: "var(--font-public)" }}
                        >
                          {group.heading}
                        </Link>
                      )}
                      <ul className="flex flex-col">
                        {group.items.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              onClick={() => setActive(null)}
                              className="block text-sm px-2 py-1 -mx-2 rounded transition-all hover:bg-gray-100 hover:text-black"
                              style={{ fontFamily: "var(--font-inter)", color: "#555" }}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

          {/* View All — full-width strip outside padded container */}
          {item.viewAll && (
            <Link
              href={item.viewAll.href}
              onClick={() => setActive(null)}
              className="group flex items-center justify-center gap-2 px-8 py-3 w-full transition-colors"
              style={{ background: "#f0f0f0", borderTop: "1px solid #e0e0e0" }}
            >
              <span
                className="font-semibold uppercase tracking-wide text-gray-500 group-hover:text-black transition-colors"
                style={{ fontFamily: "var(--font-inter)", fontSize: "12px" }}
              >
                {item.viewAll.label}
              </span>
              <span className="text-red-600 text-sm group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          )}
        </div>
        );
      })()}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t" style={{ borderColor: BORDER, background: "rgba(10,10,10,0.98)" }}>
          {NAV.map((item) => (
            <div key={item.label} className="border-b" style={{ borderColor: BORDER }}>
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-sm font-semibold uppercase text-left"
                style={{ fontFamily: "var(--font-oswald)", letterSpacing: "0.06em", color: "rgba(255,255,255,0.75)", background: "none", border: "none", cursor: "pointer" }}
                onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
              >
                {item.label}
                <span className="text-white/30">{mobileExpanded === item.label ? "−" : "+"}</span>
              </button>
              {mobileExpanded === item.label && item.groups && (
                <div className="pb-4 px-6">
                  {item.groups.map((group) => (
                    <div key={group.heading} className="mb-4">
                      <p className="text-xs text-red-500 uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-oswald)" }}>
                        {group.heading}
                      </p>
                      {group.items.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
                          className="block py-1.5 text-sm hover:text-white transition-colors"
                          style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-inter)" }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                  {item.viewAll && (
                    <Link
                      href={item.viewAll.href}
                      onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
                      className="text-sm text-red-500 font-semibold uppercase tracking-wide"
                      style={{ fontFamily: "var(--font-oswald)" }}
                    >
                      {item.viewAll.label} →
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
