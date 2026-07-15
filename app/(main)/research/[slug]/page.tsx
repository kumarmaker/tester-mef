import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import { entityMetadata } from '@/lib/entityMetadata';
import Breadcrumb from '@/components/newmef/Breadcrumb';
import StatusBadge from '@/components/newmef/StatusBadge';
import SectorTag from '@/components/newmef/SectorTag';
import EntityRow from '@/components/newmef/EntityRow';

interface PolicyEvidence {
  policy: string;
  level?: string;
  notes?: string;
  slug: string;
}

interface RelatedReport {
  name: string;
  short_name?: string;
  slug: string;
}

interface ProducedBy {
  name: string;
  type?: string;
  status?: string;
  slug: string;
}

interface ResearchData {
  meta: { slug: string; page_type: string };
  hero: {
    name: string;
    short_name?: string;
    sector_focus?: string;
    release_date?: string | null;
    status?: string;
    accessibility?: string;
    description?: string;
  };
  produced_by?: ProducedBy | null;
  sector_tag?: { name: string; slug: string } | null;
  policy_relations: {
    evidence: PolicyEvidence[];
    alignment: PolicyEvidence[];
    advocacy: PolicyEvidence[];
  };
  related_reports: RelatedReport[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return entityMetadata('research', slug);
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'data', 'research');
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => ({ slug: f.replace('.json', '') }));
}

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'data', 'research', `${slug}.json`);
  const data: ResearchData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const evidencePolicies = data.policy_relations?.evidence?.filter(Boolean) ?? [];
  const alignmentPolicies = data.policy_relations?.alignment?.filter(Boolean) ?? [];
  const relatedReports = data.related_reports?.filter(Boolean) ?? [];

  const allPolicyRelations = [
    { label: 'Evidence', items: evidencePolicies },
    { label: 'Alignment', items: alignmentPolicies },
  ].filter((g) => g.items.length > 0);

  return (
    <main>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Research', href: '/research' },
            { label: data.hero.name },
          ]}
        />

        {/* Hero */}
        <div className="mt-4 mb-10">
          <div className="flex flex-wrap items-start gap-3 mb-2">
            <h1
              className="text-4xl font-bold text-gray-900 uppercase tracking-wide"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              {data.hero.name}
            </h1>
            {data.hero.status && <StatusBadge status={data.hero.status} />}
          </div>
          <div
            className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {data.hero.release_date && <span>{data.hero.release_date}</span>}
            {data.hero.accessibility && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs uppercase tracking-wide">
                {data.hero.accessibility}
              </span>
            )}
          </div>
          {data.hero.description && (
            <p className="text-gray-700 max-w-3xl leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
              {data.hero.description}
            </p>
          )}
        </div>

        <div className="space-y-10">
          {/* Sector Tag */}
          {data.sector_tag && (
            <section>
              <h2
                className="text-xl font-semibold uppercase tracking-wide text-gray-900 mb-3"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                Sector
              </h2>
              <SectorTag name={data.sector_tag.name} slug={data.sector_tag.slug} variant="primary" />
            </section>
          )}

          {/* Produced by */}
          {data.produced_by && (
            <section>
              <h2
                className="text-xl font-semibold uppercase tracking-wide text-gray-900 mb-3"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                Produced By
              </h2>
              <div className="bg-white border border-gray-200 rounded-xl px-4 divide-y divide-gray-100">
                <EntityRow
                  name={data.produced_by.name}
                  slug={data.produced_by.slug}
                  href={`/programmes/${data.produced_by.slug}`}
                  meta={data.produced_by.type}
                  badge={data.produced_by.status}
                />
              </div>
            </section>
          )}

          {/* Policy Relations */}
          {allPolicyRelations.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold uppercase tracking-wide text-gray-900 mb-4"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                Policy Relations
              </h2>
              <div className="space-y-4">
                {allPolicyRelations.map((group) => (
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
                              href={`/policy/${p.slug}`}
                              className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors"
                              style={{ fontFamily: 'var(--font-inter)' }}
                            >
                              {p.policy}
                            </a>
                            {p.level && (
                              <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded text-xs">
                                {p.level}
                              </span>
                            )}
                          </div>
                          {p.notes && (
                            <p
                              className="text-xs text-gray-500"
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

          {/* Related Reports */}
          {relatedReports.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold uppercase tracking-wide text-gray-900 mb-4"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                Related Reports
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedReports.map((r) => (
                  <a
                    key={r.slug}
                    href={`/research/${r.slug}`}
                    className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow block"
                  >
                    <h3
                      className="text-sm font-semibold text-gray-900 hover:text-red-600 transition-colors"
                      style={{ fontFamily: 'var(--font-oswald)' }}
                    >
                      {r.name}
                    </h3>
                    {r.short_name && (
                      <p
                        className="text-xs text-gray-500 mt-1"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {r.short_name}
                      </p>
                    )}
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
