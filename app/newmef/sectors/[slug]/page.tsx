import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import ProgrammeCard from '@/components/newmef/ProgrammeCard';
import PolicyPill from '@/components/newmef/PolicyPill';
import EntityRow from '@/components/newmef/EntityRow';

interface Programme {
  name: string;
  short_name?: string;
  type?: string;
  status?: string;
  slug: string;
}

interface Policy {
  name: string;
  short_name?: string;
  year?: number;
  role?: string;
  slug: string;
}

interface Report {
  name: string;
  short_name?: string;
  date?: string | null;
  status?: string;
  slug: string;
}

interface SectorData {
  meta: { slug: string; url: string; page_type: string };
  hero: { name: string; description: string };
  stats: { programme_count: number; policy_count: number; report_count: number };
  programmes: { primary: Programme[]; secondary: Programme[] };
  policies: { global: Policy[]; national: Policy[] };
  reports: Report[];
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'data', 'sectors');
  return fs.readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => ({ slug: f.replace('.json', '') }));
}

export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data: SectorData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'data', 'sectors', `${slug}.json`), 'utf-8')
  );

  const primaryProgrammes   = data.programmes?.primary?.filter(Boolean)  ?? [];
  const secondaryProgrammes = data.programmes?.secondary?.filter(Boolean) ?? [];
  const globalPolicies      = data.policies?.global?.filter(Boolean)      ?? [];
  const nationalPolicies    = data.policies?.national?.filter(Boolean)    ?? [];
  const reports             = data.reports?.filter(Boolean)               ?? [];

  return (
    <main>

      {/* ── Hero (imageless) ── */}
      <section className="bg-gray-950 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-10">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8" style={{ fontFamily: 'var(--font-inter)' }}>
            <Link href="/newmef/sectors" className="hover:text-gray-300 transition-colors">Sectors</Link>
            <span>/</span>
            <span className="text-gray-400">{data.hero.name}</span>
          </nav>

          <p
            className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-3"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            Climate Sector
          </p>
          <h1
            className="font-bold uppercase text-white leading-tight mb-4"
            style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '0.03em' }}
          >
            {data.hero.name}
          </h1>
          <p
            className="text-gray-400 max-w-2xl leading-relaxed"
            style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem' }}
          >
            {data.hero.description}
          </p>

          {/* Thin metric strip — fused to hero bottom */}
          <div className="flex gap-8 mt-10 pt-6 border-t border-white/10">
            {[
              { value: data.stats.programme_count, label: 'Programmes' },
              { value: data.stats.policy_count,    label: 'Policies' },
              { value: data.stats.report_count,    label: 'Reports' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p
                  className="text-white font-bold leading-none"
                  style={{ fontFamily: 'var(--font-oswald)', fontSize: '32px' }}
                >
                  {value}
                </p>
                <p
                  className="text-gray-500 text-xs uppercase tracking-widest mt-1"
                  style={{ fontFamily: 'var(--font-oswald)' }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* Primary Programmes */}
        {primaryProgrammes.length > 0 && (
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900 mb-4" style={{ fontFamily: 'var(--font-oswald)' }}>
              Primary Programmes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {primaryProgrammes.map((p) => (
                <ProgrammeCard key={p.slug} name={p.name} short_name={p.short_name} type={p.type} status={p.status} slug={p.slug} />
              ))}
            </div>
          </section>
        )}

        {/* Secondary Programmes */}
        {secondaryProgrammes.length > 0 && (
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900 mb-4" style={{ fontFamily: 'var(--font-oswald)' }}>
              Related Programmes
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 px-4">
              {secondaryProgrammes.map((p) => (
                <EntityRow key={p.slug} name={p.name} slug={p.slug} href={`/newmef/programmes/${p.slug}`} meta={p.type} badge={p.status} />
              ))}
            </div>
          </section>
        )}

        {/* Policy Alignment — global + national in 2 cols */}
        {(globalPolicies.length > 0 || nationalPolicies.length > 0) && (
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900 mb-6" style={{ fontFamily: 'var(--font-oswald)' }}>
              Policy Alignment
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

              {globalPolicies.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: 'var(--font-oswald)' }}>
                    Global
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {globalPolicies.map((p) => (
                      <PolicyPill key={p.slug} name={p.name} short_name={p.short_name} slug={p.slug} level="global" year={p.year} />
                    ))}
                  </div>
                </div>
              )}

              {nationalPolicies.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: 'var(--font-oswald)' }}>
                    National
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {nationalPolicies.map((p) => (
                      <PolicyPill key={p.slug} name={p.name} short_name={p.short_name} slug={p.slug} level="national" year={p.year} />
                    ))}
                  </div>
                </div>
              )}

            </div>
          </section>
        )}

        {/* Reports */}
        {reports.length > 0 && (
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900 mb-4" style={{ fontFamily: 'var(--font-oswald)' }}>
              Reports
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 px-4">
              {reports.map((r) => (
                <EntityRow key={r.slug} name={r.name} slug={r.slug} href={`/newmef/research/${r.slug}`} meta={r.date ?? undefined} badge={r.status} />
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
