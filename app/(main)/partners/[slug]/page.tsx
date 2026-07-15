import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import { entityMetadata } from '@/lib/entityMetadata';
import Breadcrumb from '@/components/newmef/Breadcrumb';
import StatusBadge from '@/components/newmef/StatusBadge';
import ProgrammeCard from '@/components/newmef/ProgrammeCard';
import PolicyPill from '@/components/newmef/PolicyPill';
import EntityRow from '@/components/newmef/EntityRow';

interface Programme {
  name: string;
  short_name?: string;
  type?: string;
  status?: string;
  role?: string;
  slug: string;
}

interface MoUProgramme {
  name: string;
  notes?: string;
  slug: string;
}

interface PolicyImplemented {
  name: string;
  short_name?: string;
  role?: string;
  slug: string;
}

interface PartnerData {
  meta: { slug: string; page_type: string };
  hero: {
    name: string;
    short_name?: string;
    type?: string;
    description?: string;
  };
  partnership: {
    formalisation_type?: string;
    status?: string;
    signed_year?: number;
    notes?: string;
  };
  programmes: Programme[];
  mou_enabled_programmes: MoUProgramme[];
  policies_implemented: PolicyImplemented[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return entityMetadata('partners', slug);
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'data', 'partners');
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => ({ slug: f.replace('.json', '') }));
}

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'data', 'partners', `${slug}.json`);
  const data: PartnerData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const programmes = data.programmes?.filter(Boolean) ?? [];
  const mouProgrammes = data.mou_enabled_programmes?.filter(Boolean) ?? [];
  const policies = data.policies_implemented?.filter(Boolean) ?? [];

  return (
    <main>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Partners', href: '/partners' },
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
            {data.hero.short_name && data.hero.short_name !== data.hero.name && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                {data.hero.short_name}
              </span>
            )}
          </div>
          {data.hero.type && (
            <p
              className="text-sm text-gray-400 uppercase tracking-wide mb-3"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {data.hero.type}
            </p>
          )}
          {data.hero.description && (
            <p className="text-gray-700 max-w-3xl leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
              {data.hero.description}
            </p>
          )}
        </div>

        <div className="space-y-10">
          {/* Partnership Details */}
          {data.partnership && (
            <section>
              <h2
                className="text-xl font-semibold uppercase tracking-wide text-gray-900 mb-4"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                Partnership
              </h2>
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div
                  className="flex flex-wrap items-center gap-3 mb-3"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {data.partnership.formalisation_type && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium uppercase tracking-wide">
                      {data.partnership.formalisation_type}
                    </span>
                  )}
                  {data.partnership.status && <StatusBadge status={data.partnership.status} />}
                  {data.partnership.signed_year && (
                    <span className="text-sm text-gray-500">
                      Since {data.partnership.signed_year}
                    </span>
                  )}
                </div>
                {data.partnership.notes && (
                  <p
                    className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 leading-relaxed"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {data.partnership.notes}
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Programmes */}
          {programmes.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold uppercase tracking-wide text-gray-900 mb-4"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                Programmes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {programmes.map((p) => (
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

          {/* MoU-enabled Programmes */}
          {mouProgrammes.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold uppercase tracking-wide text-gray-900 mb-4"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                MoU-Enabled Programmes
              </h2>
              <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 px-4">
                {mouProgrammes.map((m) => (
                  <div key={m.slug} className="py-3">
                    <EntityRow
                      name={m.name}
                      slug={m.slug}
                      href={`/programmes/${m.slug}`}
                    />
                    {m.notes && (
                      <p
                        className="text-xs text-gray-500 mt-1 pl-0"
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

          {/* Policies Implemented */}
          {policies.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold uppercase tracking-wide text-gray-900 mb-4"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                Policies Implemented
              </h2>
              <div className="flex flex-wrap gap-2">
                {policies.map((p) => (
                  <PolicyPill
                    key={p.slug}
                    name={p.name}
                    short_name={p.short_name}
                    slug={p.slug}
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
