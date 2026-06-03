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
    grid: true,
    gridTitle: "Climate Sectors",
    groups: [
      {
        heading: "",
        items: [
          { label: "Circular Economy & Waste",      href: "/newmef/sectors/circular-economy-waste" },
          { label: "Clean Energy",                  href: "/newmef/sectors/clean-energy" },
          { label: "Climate Finance & Innovation",  href: "/newmef/sectors/climate-finance-innovation" },
        ],
      },
      {
        heading: "",
        items: [
          { label: "Clean Mobility",                href: "/newmef/sectors/clean-mobility" },
          { label: "Sustainable Agriculture",       href: "/newmef/sectors/sustainable-agriculture" },
          { label: "Sustainable Built Environment", href: "/newmef/sectors/sustainable-built-environment" },
        ],
      },
      {
        heading: "",
        items: [
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
    grid: true,
    gridTitle: "Key Partners",
    groups: [
      {
        heading: "",
        items: [
          { label: "UNEP",             href: "/newmef/partners/united-nations-environment-programme" },
          { label: "IFC",              href: "/newmef/partners/international-finance-corporation" },
          { label: "GIZ",              href: "/newmef/partners/giz" },
        ],
      },
      {
        heading: "",
        items: [
          { label: "WRI India",        href: "/newmef/partners/wri-india" },
          { label: "Google Cloud",     href: "/newmef/partners/google-cloud" },
          { label: "Invest India",     href: "/newmef/partners/invest-india" },
        ],
      },
      {
        heading: "",
        items: [
          { label: "The Incubation Network", href: "/newmef/partners/the-incubation-network" },
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
        <Link href="/newmef" className="shrink-0 justify-self-start" onClick={() => setActive(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://massivefoundation.org/wp-content/uploads/2024/08/Group-27481-1.webp"
            alt="MEF"
            className="h-10 w-auto object-contain"
            draggable={false}
          />
        </Link>

        {/* Desktop nav — center */}
        <nav className="hidden lg:flex items-center justify-center h-full">
          {NAV.filter((item) => item.label !== "Get Involved").map((item) => {
            const isActive = active === item.label;
            const isCurrent = pathname.startsWith(item.href) && item.href !== "/newmef";
            return (
              <button
                key={item.label}
                onMouseEnter={() => setActive(item.label)}
                className="relative h-full px-4 flex items-center gap-1 transition-colors"
                style={item.label === "Get Involved" ? {
                  fontFamily: "var(--font-oswald)",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "#ffffff",
                  background: "#e50000",
                  borderRadius: "8px",
                  padding: "8px 18px",
                  height: "auto",
                  cursor: "pointer",
                  border: "none",
                  textTransform: "uppercase",
                } : {
                  fontFamily: "var(--font-jakarta)",
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  color: "#ffffff",
                  borderBottom: isActive || isCurrent ? "2px solid #e50000" : "2px solid transparent",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Get Involved button + mobile hamburger — right */}
        <div className="flex items-center justify-end gap-3">
          <button
            onMouseEnter={() => setActive("Get Involved")}
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
              cursor: "pointer",
              border: "none",
              textTransform: "uppercase",
            }}
          >
            Get Involved
          </button>

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
          <div
            className="absolute left-0 right-0 border-t-2 border-black bg-white"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)" }}
            onMouseEnter={() => setActive(active)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
              {item.grid ? (
                <>
                {item.gridTitle && (
                  <p
                    className="text-sm font-bold uppercase tracking-widest text-black text-center mb-6 w-fit mx-auto border-b border-black pb-2"
                    style={{ fontFamily: "var(--font-public)" }}
                  >
                    {item.gridTitle}
                  </p>
                )}
                <div className="grid grid-cols-3 gap-x-10 gap-y-1">
                  {item.groups.flatMap((g) => g.items).map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setActive(null)}
                      className="text-sm py-1.5 transition-colors hover:text-red-600"
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
                        <p
                          className="text-xs uppercase tracking-widest text-black mb-3 font-bold border-b border-black pb-2 w-fit"
                          style={{ fontFamily: "var(--font-public)" }}
                        >
                          {group.heading}
                        </p>
                      )}
                      <ul className="flex flex-col gap-2">
                        {group.items.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              onClick={() => setActive(null)}
                              className="text-sm transition-colors hover:text-red-600"
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

              {item.viewAll && (
                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
                  <Link
                    href={item.viewAll.href}
                    onClick={() => setActive(null)}
                    className="inline-flex items-center gap-2 font-semibold uppercase tracking-wide text-black hover:text-gray-600 transition-colors"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "13px" }}
                  >
                    {item.viewAll.label}
                    <span className="text-red-600">→</span>
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
