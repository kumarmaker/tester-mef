import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Climate Education",
  description: "Climate education programmes, courses, and learning resources from Massive Earth Foundation.",
};

const ESG_TILES = [
  {
    label: "Environmental",
    image: "https://cms.massivefoundation.org/wp-content/uploads/2024/11/Environmental-Education.webp",
    color: "#D6E8F9",
  },
  {
    label: "Social",
    image: "https://cms.massivefoundation.org/wp-content/uploads/2024/11/ESG-Social.webp",
    color: "#F9E5D6",
  },
  {
    label: "Governance",
    image: "https://cms.massivefoundation.org/wp-content/uploads/2024/11/ESG-Governance.webp",
    color: "#D6F9DE",
  },
];

export default function EducationPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col md:flex-row min-h-[70vh]"
        style={{
          backgroundImage:
            "url('https://cms.massivefoundation.org/wp-content/uploads/2024/11/Project-ESG-Training.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Left: naked image with quote */}
        <div className="flex-[2] flex flex-col justify-end p-8 md:p-12 min-h-[55vw] md:min-h-0">
          <blockquote
            className="text-white text-base md:text-lg italic leading-snug max-w-xl"
            style={{
              fontFamily: "var(--font-inter)",
              textShadow: "0 1px 4px rgba(0,0,0,0.7)",
            }}
          >
            &ldquo;There must be a better way to make the things we want, a way that
            doesn&apos;t spoil the sky, or the rain or the land.&rdquo;
          </blockquote>
          <p
            className="mt-2 text-gray-300 text-sm"
            style={{
              fontFamily: "var(--font-inter)",
              textShadow: "0 1px 4px rgba(0,0,0,0.7)",
            }}
          >
            Paul McCartney
          </p>
        </div>

        {/* Right: frosted glass panel */}
        <div
          className="flex-1 flex items-center px-10 md:px-14 py-16 md:py-0 backdrop-blur-xl"
          style={{ background: "rgba(15, 15, 15, 0.55)" }}
        >
          <div>
            <div className="flex items-center gap-2 mb-7">
              <span className="w-3 h-3 rounded-full bg-[#e50000]" />
              <span className="w-3 h-3 rounded-full bg-[#e50000]" />
              <span className="w-3 h-3 rounded-full bg-[#e50000]" />
              <div className="flex-1 h-px bg-white/20 ml-1" />
            </div>

            <h1
              className="text-5xl md:text-6xl font-bold uppercase text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              ESG Training
            </h1>

            <p
              className="text-gray-300 text-base leading-relaxed max-w-sm"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Environmental, Social and Governance (ESG) Training Course is designed for
              individuals who want to understand the concepts, practices, and implications of ESG
              factors in business and investing.
            </p>
          </div>
        </div>

      </section>

      {/* ── MEF Vision ───────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <h2
            className="text-3xl md:text-4xl font-bold uppercase text-gray-900 mb-8"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            MEF Vision
          </h2>
          <p
            className="text-gray-600 text-base leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            You will be able to define, understand and implement ESG in your organization. You
            will also be able to arrive at the most suitable ESG framework to be used for ESG
            reporting and communicate sustainability initiatives of your company to make an impact.
          </p>
        </div>

        {/* ESG tiles — rounded cards with colored label bar */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {ESG_TILES.map((tile) => (
            <div key={tile.label} className="rounded-xl overflow-hidden">
              <div
                className="h-72"
                style={{
                  backgroundImage: `url('${tile.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div
                className="py-4 px-6 text-center"
                style={{ backgroundColor: tile.color }}
              >
                <span
                  className="text-gray-800 text-sm font-bold uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {tile.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section
        className="relative py-24 px-4 sm:px-6 flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://cms.massivefoundation.org/wp-content/uploads/2025/05/Frame160455-1.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold uppercase text-white mb-6"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Asia&apos;s Largest Climate Tech Ecosystem
          </h2>
          <p
            className="text-gray-300 text-base leading-relaxed mb-10"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            An ecosystem comprising of founders, VCs, investors in development of organization,
            and institution that support startups in development of novel technology that combats
            climate change.
          </p>
          <Link
            href="/engage-with-us/"
            className="inline-block bg-white text-black text-sm font-bold uppercase tracking-widest px-12 py-4 hover:bg-gray-200 transition-colors"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Join Us
          </Link>
        </div>
      </section>

    </div>
  );
}
