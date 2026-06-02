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
};

const NAV: NavItem[] = [
  {
    label: "What We Do",
    href: "/newmef/programmes",
    groups: [
      {
        heading: "Climate Accelerators",
        items: [
          { label: "SAFFAL",               href: "/newmef/programmes/saffal" },
          { label: "LowCarbon.Earth",      href: "/newmef/programmes/lowcarbon-earth-accelerator" },
          { label: "AgroXlerate",          href: "/newmef/programmes/agroxlerate" },
          { label: "GoMassive Accelerator",href: "/newmef/programmes/gomassive-climate-accelerator-2023" },
        ],
      },
      {
        heading: "Pilot Projects",
        items: [
          { label: "Agra Innovation Lab",  href: "/newmef/programmes/agra-innovation-lab" },
          { label: "Zero Waste Cities",    href: "/newmef/programmes/zero-waste-cities" },
          { label: "EV Rickshaw Transition",href: "/newmef/programmes/ev-rickshaw-transition" },
          { label: "Net Zero Sarojini Nagar",href: "/newmef/programmes/net-zero-sarojini-nagar" },
        ],
      },
      {
        heading: "Climate Action",
        items: [
          { label: "Smriti Van",           href: "/newmef/programmes/sustainable-forests-smriti-van" },
          { label: "Smart Waste Mgmt",     href: "/newmef/programmes/smart-waste-management" },
          { label: "ICAP",                 href: "/newmef/programmes/icap-india-climate-accelerator-platform" },
        ],
      },
    ],
    viewAll: { label: "View All Programmes", href: "/newmef/programmes" },
  },
  {
    label: "Where We Work",
    href: "/newmef/sectors",
    groups: [
      {
        heading: "Climate Sectors",
        items: [
          { label: "Circular Economy & Waste",      href: "/newmef/sectors/circular-economy-waste" },
          { label: "Clean Energy",                  href: "/newmef/sectors/clean-energy" },
          { label: "Climate Finance & Innovation",  href: "/newmef/sectors/climate-finance-innovation" },
          { label: "Clean Mobility",                href: "/newmef/sectors/clean-mobility" },
          { label: "Sustainable Agriculture",       href: "/newmef/sectors/sustainable-agriculture" },
          { label: "Sustainable Built Environment", href: "/newmef/sectors/sustainable-built-environment" },
          { label: "Air Quality & Pollution",       href: "/newmef/sectors/air-quality-pollution" },
          { label: "Forests & Biodiversity",        href: "/newmef/sectors/forests-biodiversity" },
          { label: "Gender & Social Equity",        href: "/newmef/sectors/gender-social-equity" },
        ],
      },
    ],
    viewAll: { label: "View All Sectors", href: "/newmef/sectors" },
  },
  {
    label: "Our Impact",
    href: "/newmef/research",
    groups: [
      {
        heading: "Reports",
        items: [
          { label: "Delhi Clean Air Report",       href: "/newmef/research/delhi-clean-air-report" },
          { label: "Air Pollution & Lockdown",     href: "/newmef/research/air-pollution-lockdown-study" },
          { label: "State of EV Charging",         href: "/newmef/research/state-of-ev-charging-report" },
          { label: "CCUS Report",                  href: "/newmef/research/ccus-report" },
        ],
      },
      {
        heading: "Events",
        items: [
          { label: "ClimateNXT 2025",              href: "/newmef/events/climatenxt-2025" },
          { label: "ClimateNXT 2023",              href: "/newmef/events/climatenxt-2023" },
          { label: "Japan Air Pollution Event",    href: "/newmef/events/japan-air-pollution-event" },
        ],
      },
    ],
    viewAll: { label: "View All Research & Events", href: "/newmef/research" },
  },
  {
    label: "Who We Work With",
    href: "/newmef/partners",
    groups: [
      {
        heading: "Key Partners",
        items: [
          { label: "UNEP",                         href: "/newmef/partners/united-nations-environment-programme" },
          { label: "IFC",                          href: "/newmef/partners/international-finance-corporation" },
          { label: "GIZ",                          href: "/newmef/partners/giz" },
          { label: "WRI India",                    href: "/newmef/partners/wri-india" },
          { label: "Google Cloud",                 href: "/newmef/partners/google-cloud" },
          { label: "Invest India",                 href: "/newmef/partners/invest-india" },
          { label: "The Incubation Network",       href: "/newmef/partners/the-incubation-network" },
        ],
      },
    ],
    viewAll: { label: "View All Partners", href: "/newmef/partners" },
  },
  {
    label: "Policy Alignment",
    href: "/newmef/policy",
    groups: [
      {
        heading: "Global Frameworks",
        items: [
          { label: "Paris Agreement",              href: "/newmef/policy/paris-agreement" },
          { label: "SDG 13 — Climate Action",      href: "/newmef/policy/sdg-13-climate-action" },
          { label: "SDG 12 — Responsible Consumption", href: "/newmef/policy/sdg-12-responsible-consumption" },
          { label: "SDG 7 — Clean Energy",         href: "/newmef/policy/sdg-7-affordable-and-clean-energy" },
        ],
      },
      {
        heading: "National Policy",
        items: [
          { label: "India NDC 2.0",                href: "/newmef/policy/india-ndc-2-0" },
          { label: "India NDC 3.0",                href: "/newmef/policy/india-ndc-3-0" },
          { label: "Plastic Waste Mgmt Rules",     href: "/newmef/policy/plastic-waste-management-rules" },
        ],
      },
    ],
    viewAll: { label: "View All Policies", href: "/newmef/policy" },
  },
  {
    label: "Get Involved",
    href: "/newmef",
    groups: [
      {
        heading: "Work With Us",
        items: [
          { label: "Partner With MEF",             href: "/newmef/partners" },
          { label: "Invest in a Programme",        href: "/newmef/programmes" },
          { label: "Join as a Mentor",             href: "/newmef" },
          { label: "Contact Us",                   href: "/newmef" },
        ],
      },
    ],
  },
];

const GLASS = "rgba(10,10,10,0.92)";
const BORDER = "rgba(255,255,255,0.07)";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/newmef" className="shrink-0" onClick={() => setActive(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://massivefoundation.org/wp-content/uploads/2024/08/Group-27481-1.webp"
            alt="MEF"
            className="h-8 w-auto object-contain"
            draggable={false}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center h-full">
          {NAV.map((item) => {
            const isActive = active === item.label;
            const isCurrent = pathname.startsWith(item.href) && item.href !== "/newmef";
            return (
              <button
                key={item.label}
                onMouseEnter={() => setActive(item.label)}
                className="relative h-full px-4 flex items-center gap-1 text-sm font-semibold uppercase transition-colors"
                style={{
                  fontFamily: "var(--font-oswald)",
                  letterSpacing: "0.06em",
                  color: isActive || isCurrent ? "#fff" : "rgba(255,255,255,0.55)",
                  borderBottom: isActive || isCurrent ? "2px solid #e50000" : "2px solid transparent",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                {item.label}
                <svg className="w-3 h-3 mt-0.5 opacity-50" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            );
          })}
        </nav>

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

      {/* Desktop mega-menu panel */}
      {active && (() => {
        const item = NAV.find(n => n.label === active);
        if (!item?.groups) return null;
        return (
          <div
            className="absolute left-0 right-0 border-t"
            style={{ background: GLASS, borderColor: BORDER }}
            onMouseEnter={() => setActive(active)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
              <div className="flex gap-12">
                {item.groups.map((group) => (
                  <div key={group.heading} className="flex-1 min-w-0">
                    <p
                      className="text-xs uppercase tracking-widest text-red-500 mb-4 font-semibold"
                      style={{ fontFamily: "var(--font-oswald)" }}
                    >
                      {group.heading}
                    </p>
                    <ul className="flex flex-col gap-2">
                      {group.items.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            onClick={() => setActive(null)}
                            className="text-sm transition-colors hover:text-white"
                            style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.65)" }}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {item.viewAll && (
                <div className="mt-8 pt-6 border-t" style={{ borderColor: BORDER }}>
                  <Link
                    href={item.viewAll.href}
                    onClick={() => setActive(null)}
                    className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-red-500 hover:text-red-400 transition-colors"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    {item.viewAll.label}
                    <span>→</span>
                  </Link>
                </div>
              )}
            </div>
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
