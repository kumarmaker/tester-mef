import type { Metadata } from "next";
import Link from "next/link";
import donate from "@/data/donate.json";
import DonateClient, { type DonatePathway } from "@/components/donate/DonateClient";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Direct your support to forests, climate accelerators, research, livable cities and education. Make a pledge — our team takes it personally from there.",
};

export default function DonatePage() {
  const { hero, pathways, proof, form } = donate;

  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero — singular display card: type left, full-bleed image right ── */}
      <section className="relative flex flex-col lg:flex-row lg:h-screen lg:max-h-screen bg-[#f8f1e4] overflow-hidden">
        {/* Left — type */}
        <div className="relative z-10 flex flex-col justify-center px-10 sm:px-16 lg:px-20 py-20 w-full lg:w-[58%] shrink-0">
          <span
            className="text-xs uppercase tracking-widest mb-5 block"
            style={{ fontFamily: "var(--font-oswald)", color: "#e50000" }}
          >
            {hero.eyebrow}
          </span>
          <h1
            className="font-black uppercase text-gray-950 leading-none mb-7"
            style={{ fontFamily: "var(--font-oswald)", fontSize: "clamp(38px, 5vw, 68px)" }}
          >
            {hero.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p
            className="text-gray-600 max-w-xl mb-10 leading-relaxed text-base md:text-lg"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {hero.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={hero.cta_primary.href}
              className="inline-block px-8 py-3.5 text-white uppercase font-bold tracking-wider rounded-md hover:opacity-90 transition-opacity"
              style={{ fontFamily: "var(--font-oswald)", background: "#e50000", fontSize: "15px" }}
            >
              {hero.cta_primary.label}
            </Link>
            <Link
              href={hero.cta_muted.href}
              className="inline-block px-8 py-3.5 uppercase font-bold tracking-wider rounded-md border border-gray-300 text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors"
              style={{ fontFamily: "var(--font-oswald)", fontSize: "15px" }}
            >
              {hero.cta_muted.label}
            </Link>
          </div>
        </div>

        {/* Right — image, full-bleed to viewport edge, full height */}
        <div className="relative flex-1 min-h-[45vw] lg:min-h-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/donate-to-climate.webp"
            alt="Donate to climate"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
          {/* Recede the image plane slightly */}
          <div className="absolute inset-0 bg-black/20" />
          {/* Type plane's tone washes over the image edge — foreground over background */}
          <div className="absolute inset-y-0 left-0 w-24 lg:w-40 bg-gradient-to-r from-[#f8f1e4] to-transparent" />
        </div>
      </section>

      {/* ── Pathways + pledge form (interactive) ── */}
      <DonateClient
        pathways={pathways as DonatePathway[]}
        amountRanges={form.amount_ranges}
        trustNote={form.trust_note}
      />

      {/* ── Proof strip ── */}
      <section className="py-16 px-4 sm:px-6 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center mb-10">
            {proof.stats.map((s) => (
              <div key={s.label}>
                <p
                  className="text-4xl md:text-5xl font-bold text-gray-900 mb-1"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {s.value}
                </p>
                <p
                  className="text-xs uppercase tracking-wider text-gray-500"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <p
            className="text-center text-sm text-gray-500"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {proof.partners_line}{" "}
            <Link href={proof.partners_href} className="underline hover:text-gray-900">
              Meet our partners
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
