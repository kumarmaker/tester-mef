import fs from 'fs';
import path from 'path';
import Breadcrumb from '@/components/newmef/Breadcrumb';
import StatStrip from '@/components/newmef/StatStrip';
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
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => ({ slug: f.replace('.json', '') }));
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'data', 'sectors', `${slug}.json`);
  const data: SectorData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const stats = [
    { label: 'Programmes', value: data.stats.programme_count },
    { label: 'Policies', value: data.stats.policy_count },
    { label: 'Reports', value: data.stats.report_count },
  ];

  const primaryProgrammes = data.programmes?.primary?.filter(Boolean) ?? [];
  const secondaryProgrammes = data.programmes?.secondary?.filter(Boolean) ?? [];
  const globalPolicies = data.policies?.global?.filter(Boolean) ?? [];
  const nationalPolicies = data.policies?.national?.filter(Boolean) ?? [];
  const reports = data.reports?.filter(Boolean) ?? [];

  return (
    <main>
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-4">
        <Breadcrumb
          items={[
            { label: 'Sectors', href: '/newmef/sectors' },
            { label: data.hero.name },
          ]}
        />
        <div className="mt-4 mb-6">
          <h1
            className="text-4xl font-bold text-gray-900 uppercase tracking-wide mb-3"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            {data.hero.name}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl" style={{ fontFamily: 'var(--font-inter)' }}>
            {data.hero.description}
          </p>
        </div>
      </div>

      {/* Stat strip */}
      <StatStrip stats={stats} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Primary Programmes */}
        {primaryProgrammes.length > 0 && (
          <section>
            <h2
              className="text-xl font-semibold uppercase tracking-wide text-gray-900 mb-4"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              Primary Programmes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {primaryProgrammes.map((p) => (
                <ProgrammeCard
                  key={p.slug}
                  name={p.name}
                  short_name={p.short_name}
                  type={p.type}
                  status={p.status}
                  slug={p.slug}
                />
              ))}
            </div>
          </section>
        )}

        {/* Secondary Programmes */}
        {secondaryProgrammes.length > 0 && (
          <section>
            <h2
              className="text-xl font-semibold uppercase tracking-wide text-gray-900 mb-4"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              Secondary Programmes
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 px-4">
              {secondaryProgrammes.map((p) => (
                <EntityRow
                  key={p.slug}
                  name={p.name}
                  slug={p.slug}
                  href={`/newmef/programmes/${p.slug}`}
                  meta={p.type}
                  badge={p.status}
                />
              ))}
            </div>
          </section>
        )}

        {/* Global Policies */}
        {globalPolicies.length > 0 && (
          <section>
            <h2
              className="text-xl font-semibold uppercase tracking-wide text-gray-900 mb-4"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              Global Policy
            </h2>
            <div className="flex flex-wrap gap-2">
              {globalPolicies.map((p) => (
                <PolicyPill
                  key={p.slug}
                  name={p.name}
                  short_name={p.short_name}
                  slug={p.slug}
                  level="global"
                  year={p.year}
                />
              ))}
            </div>
          </section>
        )}

        {/* National Policies */}
        {nationalPolicies.length > 0 && (
          <section>
            <h2
              className="text-xl font-semibold uppercase tracking-wide text-gray-900 mb-4"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              National Policy
            </h2>
            <div className="flex flex-wrap gap-2">
              {nationalPolicies.map((p) => (
                <PolicyPill
                  key={p.slug}
                  name={p.name}
                  short_name={p.short_name}
                  slug={p.slug}
                  level="national"
                  year={p.year}
                />
              ))}
            </div>
          </section>
        )}

        {/* Reports */}
        {reports.length > 0 && (
          <section>
            <h2
              className="text-xl font-semibold uppercase tracking-wide text-gray-900 mb-4"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              Reports
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 px-4">
              {reports.map((r) => (
                <EntityRow
                  key={r.slug}
                  name={r.name}
                  slug={r.slug}
                  href={`/newmef/research/${r.slug}`}
                  meta={r.date ?? undefined}
                  badge={r.status}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
