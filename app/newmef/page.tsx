import Link from 'next/link';
import fs from 'fs';
import path from 'path';

interface SectionCard {
  label: string;
  href: string;
  description: string;
  count: number;
  color: string;
}

function getCount(folder: string): number {
  try {
    const dir = path.join(process.cwd(), 'data', folder);
    return fs.readdirSync(dir).filter((f) => f.endsWith('.json')).length;
  } catch {
    return 0;
  }
}

export default function NewMEFPage() {
  const sections: SectionCard[] = [
    {
      label: 'Sectors',
      href: '/newmef/sectors',
      description: 'Thematic environmental and climate sectors',
      count: getCount('sectors'),
      color: 'bg-red-50 border-red-200 hover:border-red-400',
    },
    {
      label: 'Programmes',
      href: '/newmef/programmes',
      description: 'Accelerators, projects and dialogue platforms',
      count: getCount('programmes'),
      color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
    },
    {
      label: 'Research',
      href: '/newmef/research',
      description: 'Reports, studies and publications',
      count: getCount('research'),
      color: 'bg-green-50 border-green-200 hover:border-green-400',
    },
    {
      label: 'Events',
      href: '/newmef/events',
      description: 'Conferences, summits and convenings',
      count: getCount('events'),
      color: 'bg-amber-50 border-amber-200 hover:border-amber-400',
    },
    {
      label: 'Partners',
      href: '/newmef/partners',
      description: 'Institutional partners and MoU holders',
      count: getCount('partners'),
      color: 'bg-purple-50 border-purple-200 hover:border-purple-400',
    },
    {
      label: 'Policy',
      href: '/newmef/policy',
      description: 'Policies, frameworks and SDGs',
      count: getCount('policy'),
      color: 'bg-indigo-50 border-indigo-200 hover:border-indigo-400',
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <h1
          className="text-4xl font-bold text-gray-900 uppercase tracking-wide mb-3"
          style={{ fontFamily: 'var(--font-oswald)' }}
        >
          MEF Data Preview
        </h1>
        <p className="text-gray-500 text-lg" style={{ fontFamily: 'var(--font-inter)' }}>
          Structured data across all MEF programmes, sectors, partners, policy, research and events.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className={`border-2 rounded-xl p-6 transition-all ${section.color}`}
          >
            <div className="flex items-start justify-between mb-3">
              <h2
                className="text-xl font-semibold text-gray-900 uppercase tracking-wide"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                {section.label}
              </h2>
              <span
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                {section.count}
              </span>
            </div>
            <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-inter)' }}>
              {section.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
