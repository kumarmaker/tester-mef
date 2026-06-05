import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Breadcrumb from '@/components/newmef/Breadcrumb';
import StatusBadge from '@/components/newmef/StatusBadge';

interface EventSummary {
  meta: { slug: string };
  hero: {
    name: string;
    date?: string;
    location?: string;
    region?: string;
    theme?: string;
    status?: string;
  };
}

export default function EventsIndexPage() {
  const dir = path.join(process.cwd(), 'data', 'events');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
  const events: EventSummary[] = files.map((f) => {
    const raw = fs.readFileSync(path.join(dir, f), 'utf-8');
    return JSON.parse(raw) as EventSummary;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <Breadcrumb items={[{ label: 'Events & Summits', href: '/events-summits' }]} />

      <div className="mb-10">
        <h1
          className="text-3xl font-bold text-gray-900 uppercase tracking-wide mb-2"
          style={{ fontFamily: 'var(--font-oswald)' }}
        >
          Events
        </h1>
        <p className="text-gray-500" style={{ fontFamily: 'var(--font-inter)' }}>
          {events.length} events
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Link
            key={event.meta.slug}
            href={`/events-summits/${event.meta.slug}`}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow block"
          >
            <div className="flex items-start justify-between mb-2">
              <h2
                className="text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors leading-tight pr-2"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                {event.hero.name}
              </h2>
              {event.hero.status && <StatusBadge status={event.hero.status} />}
            </div>
            <div
              className="text-sm text-gray-500 space-y-1"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {event.hero.date && <p>{event.hero.date}</p>}
              {event.hero.location && <p>{event.hero.location}</p>}
              {event.hero.theme && (
                <p className="text-xs text-gray-400 uppercase tracking-wide">{event.hero.theme}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
