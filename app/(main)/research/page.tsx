import type { Metadata } from "next";
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Research & Reports",
  description: "MEF's sector reports, policy research, and climate data publications across South Asia.",
};

interface ResearchItem {
  name: string;
  description: string;
  tags: string[];
  image?: string;
  slug: string;
}

interface ResearchIndexData {
  reports: ResearchItem[];
}

export default function ResearchIndexPage() {
  const filePath = path.join(process.cwd(), 'data', 'index', 'research.json');
  const data: ResearchIndexData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  return (
    <main>
      {/* ── Hero ── */}
      <section
        className="relative flex items-center justify-center py-28 px-4"
        style={{
          backgroundImage: "url(/images/SAFFAL_Climate_Insight_Hero.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h1
            className="text-4xl md:text-5xl font-bold text-gray-900 uppercase leading-tight mb-5"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            Climate Research &amp; Publications
          </h1>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
            Original reports built on official data, fresh observations, and sector-focused analysis — uncovering insights, tracking markets, and tackling the core problems shaping climate solutions.
          </p>
        </div>
      </section>

      {/* ── Report cards ── */}
      <div style={{ backgroundColor: "#fefdf5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{ columnGap: '1rem', rowGap: '0' }}
          >
            {data.reports.map((r) => (
              <Link
                key={r.slug}
                href={`/research/${r.slug}`}
                className="group rounded-xl overflow-hidden border border-amber-100 bg-white hover:shadow-lg transition-shadow duration-300"
                style={{
                  display: 'grid',
                  gridRow: 'span 4',
                  gridTemplateRows: 'subgrid',
                  marginBottom: '1rem',
                }}
              >
                {/* Row 1 — Image */}
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
                  {r.image ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={r.image}
                        alt={r.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/25" />
                    </>
                  ) : (
                    <div className="w-full h-full bg-amber-100 flex items-center justify-center">
                      <span
                        className="text-amber-300 uppercase tracking-widest"
                        style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-10)' }}
                      >
                        Cover Image
                      </span>
                    </div>
                  )}
                </div>

                {/* Row 2 — Title */}
                <div className="px-5 pt-4 pb-2">
                  <h2
                    className="font-bold text-gray-900 leading-snug group-hover:text-amber-800 transition-colors"
                    style={{ fontFamily: 'var(--font-jakarta)', fontSize: 'var(--type-16)' }}
                  >
                    {r.name}
                  </h2>
                </div>

                {/* Row 3 — Copy */}
                <div className="px-5 pb-3">
                  <p
                    className="text-gray-500 leading-relaxed"
                    style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-13)' }}
                  >
                    {r.description}
                  </p>
                </div>

                {/* Row 4 — Tags */}
                <div className="px-5 pb-4 flex flex-wrap gap-1.5">
                  {r.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full font-medium bg-amber-50 text-amber-800 border border-amber-200"
                      style={{ fontFamily: 'var(--font-inter)', fontSize: 'var(--type-10)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
