import fs from 'fs';
import path from 'path';
import Breadcrumb from '@/components/newmef/Breadcrumb';
import StatusBadge from '@/components/newmef/StatusBadge';
import SectorTag from '@/components/newmef/SectorTag';
import EntityRow from '@/components/newmef/EntityRow';

interface PolicyRelation {
  policy: string;
  policy_full?: string;
  level?: string;
  type?: string;
  strength?: string;
  notes?: string;
  slug: string;
}

interface Partner {
  name: string;
  short_name?: string;
  type?: string;
  slug: string;
}

interface MoU {
  partner: string;
  type?: string;
  status?: string;
  year?: number;
  notes?: string;
  slug: string;
}

interface LinkedEvent {
  name: string;
  date?: string;
  location?: string;
  relationship?: string;
  slug: string;
}

interface ProgrammeData {
  meta: { slug: string; page_type: string };
  hero: {
    name: string;
    short_name?: string;
    type?: string;
    status?: string;
    year_launched?: number;
    region?: string;
    description?: string;
  };
  sectors: { primary: string[]; secondary: string[] };
  policy_relations: {
    delivery: PolicyRelation[];
    mandate: PolicyRelation[];
    alignment: PolicyRelation[];
    advocacy: PolicyRelation[];
    problem: PolicyRelation[];
  };
  stakeholders: {
    funders: Partner[];
    partners: Partner[];
    beneficiaries: Partner[];
    co_creators: Partner[];
    targets: Partner[];
  };
  enabling_mous: MoU[];
  reports_produced: unknown[];
  linked_events: LinkedEvent[];
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'data', 'programmes');
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => ({ slug: f.replace('.json', '') }));
}

export default async function ProgrammePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'data', 'programmes', `${slug}.json`);
  const data: ProgrammeData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const primarySectors = data.sectors?.primary?.filter(Boolean) ?? [];
  const secondarySectors = data.sectors?.secondary?.filter(Boolean) ?? [];
  const deliveryPolicies = data.policy_relations?.delivery?.filter(Boolean) ?? [];
  const mandatePolicies = data.policy_relations?.mandate?.filter(Boolean) ?? [];
  const alignmentPolicies = data.policy_relations?.alignment?.filter(Boolean) ?? [];
  const advocacyPolicies = data.policy_relations?.advocacy?.filter(Boolean) ?? [];
  const problemPolicies = data.policy_relations?.problem?.filter(Boolean) ?? [];
  const partners = data.stakeholders?.partners?.filter(Boolean) ?? [];
  const mous = data.enabling_mous?.filter(Boolean) ?? [];
  const events = data.linked_events?.filter(Boolean) ?? [];

  const policyGroups = [
    { label: 'Delivery', items: deliveryPolicies },
    { label: 'Mandate', items: mandatePolicies },
    { label: 'Alignment', items: alignmentPolicies },
    { label: 'Advocacy', items: advocacyPolicies },
    { label: 'Problem', items: problemPolicies },
  ].filter((g) => g.items.length > 0);

  return (
    <main>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Programmes', href: '/newmef/programmes' },
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
            {data.hero.short_name && <span className="font-medium">{data.hero.short_name}</span>}
            {data.hero.type && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs uppercase tracking-wide">
                {data.hero.type}
              </span>
            )}
            {data.hero.region && <span>{data.hero.region}</span>}
            {data.hero.year_launched && <span>Est. {data.hero.year_launched}</span>}
          </div>
          {data.hero.description && (
            <p className="text-gray-700 max-w-3xl leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
              {data.hero.description}
            </p>
          )}
        </div>

        <div className="space-y-10">
          {/* Sector Tags */}
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

          {/* Policy Relations */}
          {policyGroups.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold uppercase tracking-wide text-gray-900 mb-4"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                Policy Relations
              </h2>
              <div className="space-y-6">
                {policyGroups.map((group) => (
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
                              href={`/newmef/policy/${p.slug}`}
                              className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors"
                              style={{ fontFamily: 'var(--font-inter)' }}
                            >
                              {p.policy_full ?? p.policy}
                            </a>
                            {p.level && (
                              <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded text-xs">
                                {p.level}
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

          {/* Partners */}
          {partners.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold uppercase tracking-wide text-gray-900 mb-4"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                Partners
              </h2>
              <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 px-4">
                {partners.map((p) => (
                  <EntityRow
                    key={p.slug}
                    name={p.name}
                    slug={p.slug}
                    href={`/newmef/partners/${p.slug}`}
                    meta={p.type}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Enabling MoUs */}
          {mous.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold uppercase tracking-wide text-gray-900 mb-4"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                Enabling MoUs
              </h2>
              <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 px-4">
                {mous.map((m) => (
                  <div key={m.slug} className="py-3">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <a
                        href={`/newmef/partners/${m.slug}`}
                        className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {m.partner}
                      </a>
                      {m.status && (
                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs uppercase">
                          {m.status}
                        </span>
                      )}
                      {m.year && (
                        <span
                          className="text-xs text-gray-400"
                          style={{ fontFamily: 'var(--font-inter)' }}
                        >
                          {m.year}
                        </span>
                      )}
                    </div>
                    {m.notes && (
                      <p
                        className="text-xs text-gray-500"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        {m.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Linked Events */}
          {events.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold uppercase tracking-wide text-gray-900 mb-4"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                Linked Events
              </h2>
              <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 px-4">
                {events.map((e) => (
                  <EntityRow
                    key={e.slug}
                    name={e.name}
                    slug={e.slug}
                    href={`/newmef/events/${e.slug}`}
                    meta={[e.date, e.location].filter(Boolean).join(' · ')}
                    badge={e.relationship}
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
