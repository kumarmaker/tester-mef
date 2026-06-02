import fs from 'fs';
import path from 'path';
import Link from 'next/link';
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
    headline?: string[];
    long_description?: string;
    image?: string;
    apply_url?: string;
    website_url?: string;
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

interface RelatedProgramme {
  name: string;
  short_name?: string;
  type?: string;
  status?: string;
  year?: number;
  region?: string;
  sectors?: string;
  slug: string;
}

interface ProgrammesIndex {
  programmes: RelatedProgramme[];
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function sdgIcon(slug: string): string | null {
  const match = slug.match(/^sdg-(\d+)-/);
  if (!match) return null;
  const num = match[1].padStart(2, '0');
  return `/images/sdg/sdg${num}.jpg`;
}

const PLACEHOLDER_IMG = '/images/mef_programme_hero.webp';

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'data', 'programmes');
  return fs.readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => ({ slug: f.replace('.json', '') }));
}

export default async function ProgrammePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data: ProgrammeData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'data', 'programmes', `${slug}.json`), 'utf-8')
  );

  const index: ProgrammesIndex = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'data', 'index', 'programmes.json'), 'utf-8')
  );

  const primarySectors   = data.sectors?.primary?.filter(Boolean) ?? [];
  const secondarySectors = data.sectors?.secondary?.filter(Boolean) ?? [];
  const partners         = data.stakeholders?.partners?.filter(Boolean) ?? [];
  const mous             = data.enabling_mous?.filter(Boolean) ?? [];
  const events           = data.linked_events?.filter(Boolean) ?? [];

  const noSdg = (items: PolicyRelation[]) =>
    (items ?? []).filter((p) => !p.slug.startsWith('sdg-'));

  const policyGroups = [
    { label: 'Delivery',  items: noSdg(data.policy_relations?.delivery)  },
    { label: 'Mandate',   items: noSdg(data.policy_relations?.mandate)   },
    { label: 'Alignment', items: noSdg(data.policy_relations?.alignment) },
    { label: 'Advocacy',  items: noSdg(data.policy_relations?.advocacy)  },
    { label: 'Problem',   items: noSdg(data.policy_relations?.problem)   },
  ].filter((g) => g.items.length > 0);

  // Related: share a primary sector, exclude self, max 3
  const related = index.programmes
    .filter((p) => p.slug !== slug)
    .filter((p) => {
      const pSectors = (p.sectors ?? '').split(',').map((s) => s.trim());
      return primarySectors.some((s) => pSectors.includes(s));
    })
    .slice(0, 3);

  const heroImg = data.hero.image ?? PLACEHOLDER_IMG;

  return (
    <main>

      {/* ── Hero ── */}
      <section
        className="relative flex flex-col"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maxHeight: '680px',
          minHeight: '420px',
        }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-14 pt-8 text-left flex flex-col justify-between h-full" style={{ minHeight: 'inherit' }}>

          {/* Breadcrumb — top of hero */}
          <div className="mb-auto pb-8">
            <Breadcrumb items={[{ label: 'Programmes', href: '/newmef/programmes' }, { label: data.hero.name }]} />
          </div>

          <div>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span
              className="text-xs font-semibold uppercase tracking-widest text-red-400"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              {data.hero.type} · {data.hero.region}
              {data.hero.year_launched ? ` · Est. ${data.hero.year_launched}` : ''}
            </span>
            {data.hero.status && <StatusBadge status={data.hero.status} />}
          </div>

          <h1
            className="font-bold uppercase text-white leading-tight mb-4"
            style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '0.03em' }}
          >
            {data.hero.headline
              ? data.hero.headline.map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))
              : data.hero.name}
          </h1>

          {data.hero.description && (
            <p
              className="text-gray-300 max-w-xl mb-8 leading-relaxed"
              style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem' }}
            >
              {data.hero.description}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <a
              href={data.hero.apply_url ?? '#'}
              className="inline-block px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wide transition-colors"
              style={{ fontFamily: 'var(--font-oswald)', fontSize: '14px', letterSpacing: '0.08em', borderRadius: '8px' }}
            >
              Apply
            </a>
            <a
              href={data.hero.website_url ?? '#'}
              className="inline-block px-6 py-2.5 border border-white text-white font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-colors"
              style={{ fontFamily: 'var(--font-oswald)', fontSize: '14px', letterSpacing: '0.08em', borderRadius: '8px' }}
            >
              Check Website
            </a>
          </div>
          </div>
        </div>
      </section>

      {/* ── Long description + SDG icons ── */}
      {data.hero.long_description && (
        <section className="bg-white py-14 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 items-center">

              {/* Left — description */}
              <div>
                <h2
                  className="font-bold uppercase tracking-wide text-black mb-6"
                  style={{ fontFamily: 'var(--font-oswald)', fontSize: '28px' }}
                >
                  About {data.hero.short_name ?? data.hero.name}
                </h2>
                {data.hero.long_description.split('\n\n').map((para, i) => (
                  <p
                    key={i}
                    className={`text-gray-700 leading-relaxed ${i > 0 ? 'mt-5' : ''}`}
                    style={{ fontFamily: 'var(--font-inter)', fontSize: '1.0625rem' }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Right — SDG icons */}
              {(() => {
                const allPolicies = [
                  ...(data.policy_relations?.delivery  ?? []),
                  ...(data.policy_relations?.mandate   ?? []),
                  ...(data.policy_relations?.alignment ?? []),
                  ...(data.policy_relations?.advocacy  ?? []),
                  ...(data.policy_relations?.problem   ?? []),
                ];
                const sdgIcons = [...new Map(
                  allPolicies
                    .filter((p) => p.slug.startsWith('sdg-'))
                    .map((p) => [p.slug, { slug: p.slug, icon: sdgIcon(p.slug), name: p.policy_full ?? p.policy }])
                ).values()].filter((s) => s.icon);

                if (sdgIcons.length === 0) return null;
                return (
                  <div className="flex flex-col items-center justify-center h-full gap-4">
                    <p
                      className="text-xs font-semibold uppercase tracking-widest text-gray-400"
                      style={{ fontFamily: 'var(--font-oswald)' }}
                    >
                      SDG Alignment
                    </p>
                    <div
                      className="grid gap-3"
                      style={{ gridTemplateRows: 'repeat(4, 1fr)', gridAutoFlow: 'column', gridAutoColumns: 'max-content' }}
                    >
                      {sdgIcons.map((s) => (
                        <Link key={s.slug} href={`/newmef/policy/${s.slug}`} title={s.name}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={s.icon!}
                            alt={s.name}
                            className="w-24 h-24 rounded-lg object-cover hover:scale-110 transition-transform"
                            draggable={false}
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </section>
      )}

      {/* ── Remaining sections ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* Sector Tags */}
        {(primarySectors.length > 0 || secondarySectors.length > 0) && (
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900 mb-4" style={{ fontFamily: 'var(--font-oswald)' }}>
              Sectors
            </h2>
            <div className="flex flex-wrap gap-4">
              {primarySectors.map((s) => <SectorTag key={s} name={s} slug={slugify(s)} variant="card" image="/images/mef_programme_hero.webp" />)}
              {secondarySectors.map((s) => <SectorTag key={s} name={s} slug={slugify(s)} variant="card" image="/images/mef_programme_hero.webp" />)}
            </div>
          </section>
        )}

        {/* Policy Connections */}
        {policyGroups.length > 0 && (
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900 mb-4" style={{ fontFamily: 'var(--font-oswald)' }}>
              Policy Connections
            </h2>
            <div className="rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest text-gray-400 w-1/4" style={{ fontFamily: 'var(--font-oswald)' }}>Policy</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest text-gray-400 w-1/6" style={{ fontFamily: 'var(--font-oswald)' }}>Scope</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest text-gray-400" style={{ fontFamily: 'var(--font-oswald)' }}>How this programme connects</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {policyGroups.flatMap((group) =>
                    group.items.map((p, i) => (
                      <tr key={p.slug + i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4 align-top">
                          <Link href={`/newmef/policy/${p.slug}`} className="font-medium text-gray-900 hover:text-red-600 transition-colors">
                            {p.policy_full ?? p.policy}
                          </Link>
                          <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wide" style={{ fontFamily: 'var(--font-oswald)' }}>{group.label}</p>
                        </td>
                        <td className="px-5 py-4 align-top">
                          {p.level && (
                            <span className="inline-block px-2 py-0.5 rounded text-xs font-medium capitalize bg-indigo-50 text-indigo-600 border border-indigo-100">
                              {p.level}
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4 align-top text-gray-600 leading-relaxed">
                          {p.notes ?? '—'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Partners */}
        {partners.length > 0 && (
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900 mb-4" style={{ fontFamily: 'var(--font-oswald)' }}>
              Partners
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 px-4">
              {partners.map((p) => (
                <EntityRow key={p.slug} name={p.name} slug={p.slug} href={`/newmef/partners/${p.slug}`} meta={p.type} />
              ))}
            </div>
          </section>
        )}

        {/* Enabling MoUs */}
        {mous.length > 0 && (
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900 mb-4" style={{ fontFamily: 'var(--font-oswald)' }}>
              Enabling MoUs
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 px-4">
              {mous.map((m) => (
                <div key={m.slug} className="py-3">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <Link href={`/newmef/partners/${m.slug}`} className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors" style={{ fontFamily: 'var(--font-inter)' }}>
                      {m.partner}
                    </Link>
                    {m.status && <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs uppercase">{m.status}</span>}
                    {m.year && <span className="text-xs text-gray-400" style={{ fontFamily: 'var(--font-inter)' }}>{m.year}</span>}
                  </div>
                  {m.notes && <p className="text-xs text-gray-500" style={{ fontFamily: 'var(--font-inter)' }}>{m.notes}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Linked Events */}
        {events.length > 0 && (
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900 mb-4" style={{ fontFamily: 'var(--font-oswald)' }}>
              Programme Events
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 px-4">
              {events.map((e) => (
                <EntityRow key={e.slug} name={e.name} slug={e.slug} href={`/newmef/events/${e.slug}`}
                  meta={[e.date, e.location].filter(Boolean).join(' · ')} badge={e.relationship} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── Related Programmes ── */}
      {related.length > 0 && (
        <section className="bg-gray-50 py-16 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="font-bold uppercase tracking-wide text-black mb-10" style={{ fontFamily: 'var(--font-oswald)', fontSize: '28px' }}>
              Other Climate Programmes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={`/newmef/programmes/${p.slug}`}
                  className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-red-200 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-widest text-gray-400" style={{ fontFamily: 'var(--font-oswald)' }}>
                      {p.type} · {p.region}
                    </span>
                    <StatusBadge status={p.status ?? ''} />
                  </div>
                  <h3 className="font-bold uppercase text-gray-900 group-hover:text-red-600 transition-colors leading-tight mb-2" style={{ fontFamily: 'var(--font-oswald)', fontSize: '18px' }}>
                    {p.name}
                  </h3>
                  {p.sectors && (
                    <p className="text-gray-400 text-xs leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>{p.sectors}</p>
                  )}
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-red-600" style={{ fontFamily: 'var(--font-oswald)' }}>
                    View →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
