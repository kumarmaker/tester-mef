import fs from 'fs';
import path from 'path';
import Breadcrumb from '@/components/newmef/Breadcrumb';
import StatusBadge from '@/components/newmef/StatusBadge';
import ProgrammeCard from '@/components/newmef/ProgrammeCard';
import EntityRow from '@/components/newmef/EntityRow';

interface LinkedProgramme {
  name: string;
  short_name?: string;
  type?: string;
  relationship?: string;
  slug: string;
}

interface SeriesEvent {
  name: string;
  date?: string;
  location?: string;
  slug: string;
}

interface EventData {
  meta: { slug: string; page_type: string };
  hero: {
    name: string;
    date?: string;
    location?: string;
    region?: string;
    theme?: string;
    status?: string;
  };
  stats: {
    registrations?: number | null;
    speakers?: number | null;
    participants?: number | null;
  };
  outcome?: string | null;
  media_note?: string | null;
  linked_programmes: LinkedProgramme[];
  series: SeriesEvent[];
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'data', 'events');
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => ({ slug: f.replace('.json', '') }));
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'data', 'events', `${slug}.json`);
  const data: EventData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const programmes = data.linked_programmes?.filter(Boolean) ?? [];
  const series = data.series?.filter(Boolean) ?? [];

  const statEntries = [
    { label: 'Registrations', value: data.stats?.registrations },
    { label: 'Speakers', value: data.stats?.speakers },
    { label: 'Participants', value: data.stats?.participants },
  ].filter((s) => s.value != null);

  return (
    <main>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Events & Summits', href: '/events-summits' },
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
            className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-2"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {data.hero.date && <span>{data.hero.date}</span>}
            {data.hero.location && (
              <>
                <span className="text-gray-300">·</span>
                <span>{data.hero.location}</span>
              </>
            )}
            {data.hero.region && (
              <>
                <span className="text-gray-300">·</span>
                <span>{data.hero.region}</span>
              </>
            )}
            {data.hero.theme && (
              <>
                <span className="text-gray-300">·</span>
                <span className="uppercase tracking-wide text-xs">{data.hero.theme}</span>
              </>
            )}
          </div>
        </div>

        {/* Stats row */}
        {statEntries.length > 0 && (
          <div className="flex flex-wrap gap-8 mb-10 bg-gray-50 border-y border-gray-200 py-5 px-4 rounded-xl">
            {statEntries.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span
                  className="text-2xl font-bold text-gray-900"
                  style={{ fontFamily: 'var(--font-oswald)' }}
                >
                  {s.value}
                </span>
                <span
                  className="text-xs text-gray-500 uppercase tracking-wide"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-10">
          {/* Outcome */}
          {data.outcome && (
            <section>
              <h2
                className="text-xl font-semibold uppercase tracking-wide text-gray-900 mb-3"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                Outcome
              </h2>
              <blockquote
                className="border-l-4 border-red-600 pl-4 py-2 bg-red-50 rounded-r-xl text-gray-700 italic"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {data.outcome}
              </blockquote>
            </section>
          )}

          {/* Linked Programmes */}
          {programmes.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold uppercase tracking-wide text-gray-900 mb-4"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                Linked Programmes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {programmes.map((p) => (
                  <ProgrammeCard
                    key={p.slug}
                    name={p.name}
                    short_name={p.short_name}
                    type={p.type}
                    slug={p.slug}
                    description={p.relationship}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Event Series */}
          {series.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold uppercase tracking-wide text-gray-900 mb-4"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                Event Series
              </h2>
              <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 px-4">
                {series.map((s) => (
                  <EntityRow
                    key={s.slug}
                    name={s.name}
                    slug={s.slug}
                    href={`/events-summits/${s.slug}`}
                    meta={[s.date, s.location].filter(Boolean).join(' · ')}
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
