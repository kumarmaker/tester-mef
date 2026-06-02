import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Breadcrumb from '@/components/newmef/Breadcrumb';

interface SectorIndex {
  name: string;
  description: string;
  programme_count: number;
  policy_count: number;
  report_count: number;
  has_active_programmes: boolean;
  slug: string;
}

interface SectorsIndexData {
  sectors: SectorIndex[];
}

export default function SectorsIndexPage() {
  const filePath = path.join(process.cwd(), 'data', 'index', 'sectors.json');
  const data: SectorsIndexData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <Breadcrumb items={[{ label: 'Sectors', href: '/newmef/sectors' }]} />

      <div className="mb-10">
        <h1
          className="text-3xl font-bold text-gray-900 uppercase tracking-wide mb-2"
          style={{ fontFamily: 'var(--font-oswald)' }}
        >
          Sectors
        </h1>
        <p className="text-gray-500" style={{ fontFamily: 'var(--font-inter)' }}>
          {data.sectors.length} thematic sectors
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.sectors.map((sector) => (
          <Link
            key={sector.slug}
            href={`/newmef/sectors/${sector.slug}`}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow block"
          >
            <div className="flex items-start justify-between mb-2">
              <h2
                className="text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors leading-tight pr-3"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                {sector.name}
              </h2>
              {sector.has_active_programmes && (
                <span
                  className="shrink-0 w-2.5 h-2.5 rounded-full bg-green-500 mt-1"
                  title="Has active programmes"
                />
              )}
            </div>
            <p
              className="text-sm text-gray-500 mb-4"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {sector.description}
            </p>
            <div
              className="flex gap-4 text-xs text-gray-600"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              <span>
                <strong>{sector.programme_count}</strong> programmes
              </span>
              <span>
                <strong>{sector.policy_count}</strong> policies
              </span>
              <span>
                <strong>{sector.report_count}</strong> reports
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
