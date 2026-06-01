import fs from 'fs';
import path from 'path';
import Breadcrumb from '@/components/newmef/Breadcrumb';
import ProgrammeCard from '@/components/newmef/ProgrammeCard';

interface ProgrammeIndex {
  name: string;
  short_name?: string;
  type?: string;
  status?: string;
  year?: number;
  region?: string;
  sectors?: string;
  slug: string;
}

interface ProgrammesIndexData {
  stats?: { total: number; active: number };
  programmes: ProgrammeIndex[];
}

export default function ProgrammesIndexPage() {
  const filePath = path.join(process.cwd(), 'data', 'index', 'programmes.json');
  const data: ProgrammesIndexData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <Breadcrumb items={[{ label: 'Programmes', href: '/newmef/programmes' }]} />

      <div className="mb-10">
        <h1
          className="text-3xl font-bold text-gray-900 uppercase tracking-wide mb-2"
          style={{ fontFamily: 'var(--font-oswald)' }}
        >
          Programmes
        </h1>
        {data.stats && (
          <p className="text-gray-500" style={{ fontFamily: 'var(--font-inter)' }}>
            {data.stats.total} programmes &mdash; {data.stats.active} active
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.programmes.map((p) => (
          <ProgrammeCard
            key={p.slug}
            name={p.name}
            short_name={p.short_name}
            type={p.type}
            status={p.status}
            slug={p.slug}
            description={p.sectors}
          />
        ))}
      </div>
    </main>
  );
}
