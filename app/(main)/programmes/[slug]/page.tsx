import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import { entityMetadata } from '@/lib/entityMetadata';
import Link from 'next/link';
import Breadcrumb from '@/components/newmef/Breadcrumb';
import StatusBadge from '@/components/newmef/StatusBadge';
import SectorTag from '@/components/newmef/SectorTag';
import EntityRow from '@/components/newmef/EntityRow';
import ProgrammeBgCard from '@/components/newmef/ProgrammeBgCard';

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

const PARTNER_LOGOS: Record<string, string> = {
  'united-nations-environment-programme': '/images/partner-logos/unep_logo_horz.png',
  'un-women':                             '/images/partner-logos/unwomen_logo_horz.png',
  'international-finance-corporation':    '/images/partner-logos/ifc_logo_horz.png',
  'giz':                                  '/images/partner-logos/giz__logo_horz.png',
  'wri-india':                            '/images/partner-logos/wri_logo_horz.png',
  'google-cloud':                         '/images/partner-logos/googlecloud_logo_horz.png',
  'invest-india':                         '/images/partner-logos/investindia_logo_horz.png',
  'the-incubation-network':               '/images/partner-logos/incubation-network_logo_horz.png',
  'microsoft-for-startups':               '/images/partner-logos/microsoft_logo_horz.png',
  'alliance-to-end-plastic-waste':        '/images/partner-logos/aepw_logo_horz.png',
  'agra-municipal-corporation':           '/images/partner-logos/agra-municipal-crop_logo_horz.png',
  'amplus-solar':                         '/images/partner-logos/amplus-solar_logo_horz.png',
  'wasteaid':                             '/images/partner-logos/wasteaid_logo_horz.png',
};

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return entityMetadata('programmes', slug);
}

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
            <Breadcrumb items={[{ label: 'Programmes', href: '/programmes' }, { label: data.hero.name }]} />
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
                        <Link key={s.slug} href={`/policy/${s.slug}`} title={s.name}>
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

        {/* Reports */}
        {data.reports_produced && data.reports_produced.length > 0 && (
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900 mb-4" style={{ fontFamily: 'var(--font-oswald)' }}>
              Reports
            </h2>
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
                          <Link href={`/policy/${p.slug}`} className="font-medium text-gray-900 hover:text-red-600 transition-colors">
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

        {/* Partners — logo row */}
        {partners.length > 0 && (
          <section className="-mx-4 sm:-mx-6 px-4 sm:px-6 py-8 bg-gray-100 rounded-2xl">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6" style={{ fontFamily: 'var(--font-oswald)' }}>
              Partners
            </h2>
            <div className="flex flex-wrap items-center gap-8">
              {partners.map((p) => {
                const logo = PARTNER_LOGOS[p.slug];
                return logo ? (
                  <Link key={p.slug} href={`/partners/${p.slug}`} title={p.name}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logo}
                      alt={p.name}
                      className="h-16 w-auto object-contain hover:scale-105 transition-transform"
                      draggable={false}
                    />
                  </Link>
                ) : (
                  <Link key={p.slug} href={`/partners/${p.slug}`}
                    className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-700 transition-colors"
                    style={{ fontFamily: 'var(--font-oswald)' }}
                  >
                    {p.short_name ?? p.name}
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Enabling MoUs — hidden for now
        {mous.length > 0 && (
          <section>
            <h2>Enabling MoUs</h2>
            ...
          </section>
        )}
        */}

        {/* Linked Events */}
        {events.length > 0 && (
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900 mb-4" style={{ fontFamily: 'var(--font-oswald)' }}>
              Programme Events
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 px-4">
              {events.map((e) => (
                <EntityRow key={e.slug} name={e.name} slug={e.slug} href={`/events-summits/${e.slug}`}
                  meta={[e.date, e.location].filter(Boolean).join(' · ')} badge={e.relationship} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── Related Programmes ── */}
      {related.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-10">
              <h2 className="font-bold uppercase tracking-wide text-black" style={{ fontFamily: 'var(--font-oswald)', fontSize: '28px' }}>
                Other Climate Programmes
              </h2>
              <Link href="/programmes" className="text-xs font-semibold uppercase tracking-wide text-red-600 hover:text-red-700 transition-colors" style={{ fontFamily: 'var(--font-jakarta)' }}>
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProgrammeBgCard
                  key={p.slug}
                  slug={p.slug}
                  name={p.name}
                  type={p.type}
                  status={p.status}
                  region={p.region}
                  year={p.year}
                  sectors={p.sectors}
                  size="small"
                />
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
