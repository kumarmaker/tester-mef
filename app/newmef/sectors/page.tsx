import fs from 'fs';
import path from 'path';
import Link from 'next/link';

interface SectorIndex {
  name: string;
  description: string;
  programme_count: number;
  policy_count: number;
  report_count: number;
  has_active_programmes: boolean;
  slug: string;
}

interface SectorsIndexData {
  sectors: SectorIndex[];
}

export default function SectorsIndexPage() {
  const data: SectorsIndexData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'data', 'index', 'sectors.json'), 'utf-8')
  );

  return (
    <main>

      {/* ── Hero ── */}
      <section
        className="relative flex flex-col justify-end"
        style={{
          backgroundImage: "url(/images/Sectors_Hero.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "480px",
        }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-16 pt-24 text-left">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-4"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Massive Earth Foundation
          </p>
          <h1
            className="font-bold uppercase text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-oswald)", fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: "0.03em" }}
          >
            Climate Sectors
          </h1>
          <p
            className="text-gray-300 max-w-2xl leading-relaxed"
            style={{ fontFamily: "var(--font-inter)", fontSize: "1.0625rem" }}
          >
            Our work spans across critical climate sectors and industries sitting at the
            intersection of climate policies, finance, and technology. Renewable energy,
            clean mobility, low-carbon infrastructure — sector by sector, we cut emissions,
            develop climate tech, and support projects that bring measurable impact to every
            industry we touch.
          </p>
        </div>
      </section>

      {/* ── Sector grid ── */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="flex items-center justify-between mb-10">
            <h2
              className="font-bold uppercase tracking-wide text-black"
              style={{ fontFamily: "var(--font-oswald)", fontSize: "28px" }}
            >
              All Sectors
            </h2>
            <p className="text-sm text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>
              {data.sectors.length} sectors
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.sectors.map((sector) => (
              <Link
                key={sector.slug}
                href={`/newmef/sectors/${sector.slug}`}
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-red-200 transition-all block"
              >
                <div className="flex items-start justify-between mb-3">
                  <h2
                    className="font-bold uppercase text-gray-900 group-hover:text-red-600 transition-colors leading-tight pr-3"
                    style={{ fontFamily: "var(--font-oswald)", fontSize: "18px" }}
                  >
                    {sector.name}
                  </h2>
                  {sector.has_active_programmes && (
                    <span className="shrink-0 w-2 h-2 rounded-full bg-green-500 mt-1.5" title="Has active programmes" />
                  )}
                </div>

                <p
                  className="text-sm text-gray-500 leading-relaxed mb-5"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {sector.description}
                </p>

                <div className="flex gap-5 border-t border-gray-100 pt-4">
                  {[
                    { value: sector.programme_count, label: "programmes" },
                    { value: sector.policy_count,    label: "policies" },
                    { value: sector.report_count,    label: "reports" },
                  ].map(({ value, label }) => (
                    <span key={label} className="flex items-baseline gap-1">
                      <span
                        className="font-bold text-gray-900"
                        style={{ fontFamily: "var(--font-oswald)", fontSize: "18px" }}
                      >
                        {value}
                      </span>
                      <span
                        className="text-gray-400 text-xs"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {label}
                      </span>
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
