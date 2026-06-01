import fs from 'fs';
import path from 'path';
import Breadcrumb from '@/components/newmef/Breadcrumb';
import SectorTag from '@/components/newmef/SectorTag';
import EntityRow from '@/components/newmef/EntityRow';

interface ProgrammeRelation {
  programme: string;
  short_name?: string;
  type?: string;
  status?: string;
  strength?: string;
  notes?: string;
  slug: string;
}

interface PolicyReport {
  name: string;
  relationship?: string;
  notes?: string;
  slug: string;
}

interface Stakeholder {
  name: string;
  type?: string;
  role?: string;
  slug: string;
}

interface PolicyData {
  meta: { slug: string; page_type: string };
  hero: {
    name: string;
    short_name?: string;
    year?: number;
    level?: string;
    issuing_body?: string;
    type?: string;
    description?: string;
    parent_policy?: string;
  };
  sectors: { primary: string[]; secondary: string[] };
  programme_relations: {
    delivery: ProgrammeRelation[];
    mandate: ProgrammeRelation[];
    alignment: ProgrammeRelation[];
    advocacy: ProgrammeRelation[];
    problem: ProgrammeRelation[];
  };
  reports: PolicyReport[];
  stakeholders: Stakeholder[];
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'data', 'policy');
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => ({ slug: f.replace('.json', '') }));
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'data', 'policy', `${slug}.json`);
  const data: PolicyData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const primarySectors = data.sectors?.primary?.filter(Boolean) ?? [];
  const secondarySectors = data.sectors?.secondary?.filter(Boolean) ?? [];
  const deliveryProgrammes = data.programme_relations?.delivery?.filter(Boolean) ?? [];
  const mandateProgrammes = data.programme_relations?.mandate?.filter(Boolean) ?? [];
  const alignmentProgrammes = data.programme_relations?.alignment?.filter(Boolean) ?? [];
  const advocacyProgrammes = data.programme_relations?.advocacy?.filter(Boolean) ?? [];
  const problemProgrammes = data.programme_relations?.problem?.filter(Boolean) ?? [];
  const reports = data.reports?.filter(Boolean) ?? [];
  const stakeholders = data.stakeholders?.filter(Boolean) ?? [];

  const programmeGroups = [
    { label: 'Delivery', items: deliveryProgrammes },
    { label: 'Mandate', items: mandateProgrammes },
    { label: 'Alignment', items: alignmentProgrammes },
    { label: 'Advocacy', items: advocacyProgrammes },
    { label: 'Problem', items: problemProgrammes },
  ].filter((g) => g.items.length > 0);

  const levelColor =
    data.hero.level === 'global'
      ? 'bg-indigo-100 text-indigo-700'
      : 'bg-slate-100 text-slate-700';

  return (
    <main>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Policy', href: '/newmef/policy' },
            { label: data.hero.name },
          ]}
        />

        {/* Hero */}
        <div className="mt-4 mb-10">
          <h1
            className="text-4xl font-bold text-gray-900 uppercase tracking-wide mb-3"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            {data.hero.name}
          </h1>
          <div
            className="flex flex-wrap items-center gap-3 mb-4"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {data.hero.year && (
              <span className="text-sm font-medium text-gray-500">{data.hero.year}</span>
            )}
            {data.hero.level && (
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${levelColor}`}
              >
                {data.hero.level}
              </span>
            )}
            {data.hero.issuing_body && (
              <span className="text-sm text-gray-500">{data.hero.issuing_body}</span>
            )}
            {data.hero.type && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs uppercase tracking-wide">
                {data.hero.type}
              </span>
            )}
          </div>
          {data.hero.parent_policy && (
            <p
              className="text-sm text-gray-500 mb-3"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Under: <span className="text-gray-700">{data.hero.parent_policy}</span>
            </p>
          )}
          {data.hero.description && (
            <p className="text-gray-700 max-w-3xl leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
              {data.hero.description}
            </p>
          )}
        </div>

        <div className="space-y-10">
          {/* Sector Coverage */}
          {(primarySectors.length > 0 || secondarySectors.length > 0) && (
            <section>
              <h2
                className="text-xl font-semibold uppercase tracking-wide text-gray-900 mb-3"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                Sectors
              </h2>
              <div className="flex flex-wrap gap-2">
                {primarySectors.map((s) => (
                  <SectorTag key={s} name={s} slug={slugify(s)} variant="primary" />
                ))}
                {secondarySectors.map((s) => (
                  <SectorTag key={s} name={s} slug={slugify(s)} variant="secondary" />
                ))}
              </div>
            </section>
          )}

          {/* Programme Relations */}
          {programmeGroups.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold uppercase tracking-wide text-gray-900 mb-4"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                Programme Relations
              </h2>
              <div className="space-y-6">
                {programmeGroups.map((group) => (
                  <div key={group.label}>
                    <h3
                      className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-2"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {group.label}
                    </h3>
                    <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 px-4">
                      {group.items.map((p) => (
                        <div key={p.slug} className="py-3">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <a
                              href={`/newmef/programmes/${p.slug}`}
                              className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors"
                              style={{ fontFamily: 'var(--font-inter)' }}
                            >
                              {p.programme}
                            </a>
                            {p.type && (
                              <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs uppercase">
                                {p.type}
                              </span>
                            )}
                          </div>
                          {p.notes && (
                            <p
                              className="text-xs text-gray-500 leading-relaxed"
                              style={{ fontFamily: 'var(--font-inter)' }}
                            >
                              {p.notes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
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
                  <div key={r.slug} className="py-3">
                    <EntityRow
                      name={r.name}
                      slug={r.slug}
                      href={`/newmef/research/${r.slug}`}
                      meta={r.relationship}
                    />
                    {r.notes && (
                      <p
                        className="text-xs text-gray-500 mt-1"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {r.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Stakeholders */}
          {stakeholders.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold uppercase tracking-wide text-gray-900 mb-4"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                Stakeholders
              </h2>
              <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 px-4">
                {stakeholders.map((s) => (
                  <EntityRow
                    key={s.slug}
                    name={s.name}
                    slug={s.slug}
                    href={`/newmef/partners/${s.slug}`}
                    meta={[s.type, s.role].filter(Boolean).join(' · ')}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
