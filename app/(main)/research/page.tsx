import type { Metadata } from "next";
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Breadcrumb from '@/components/newmef/Breadcrumb';
import StatusBadge from '@/components/newmef/StatusBadge';

export const metadata: Metadata = {
  title: "Research & Reports",
  description: "MEF's sector reports, policy research, and climate data publications across South Asia.",
};

interface ResearchItem {
  name: string;
  short_name?: string;
  sector?: string;
  date?: string | null;
  status?: string;
  accessibility?: string;
  produced_by?: string | null;
  slug: string;
}

interface ResearchIndexData {
  reports: ResearchItem[];
}

export default function ResearchIndexPage() {
  const filePath = path.join(process.cwd(), 'data', 'index', 'research.json');
  const data: ResearchIndexData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <Breadcrumb items={[{ label: 'Research', href: '/research' }]} />

      <div className="mb-10">
        <h1
          className="text-3xl font-bold text-gray-900 uppercase tracking-wide mb-2"
          style={{ fontFamily: 'var(--font-oswald)' }}
        >
          Research
        </h1>
        <p className="text-gray-500" style={{ fontFamily: 'var(--font-inter)' }}>
          {data.reports.length} reports and publications
        </p>
      </div>

      <div className="space-y-3">
        {data.reports.map((r) => (
          <Link
            key={r.slug}
            href={`/research/${r.slug}`}
            className="flex items-start justify-between bg-white border border-gray-200 rounded-xl px-5 py-4 hover:shadow-md transition-shadow block"
          >
            <div className="flex-1 min-w-0 mr-4">
              <h2
                className="text-base font-semibold text-gray-900 hover:text-red-600 transition-colors"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                {r.name}
              </h2>
              <div
                className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {r.sector && <span>{r.sector}</span>}
                {r.date && (
                  <>
                    <span className="text-gray-300">·</span>
                    <span>{r.date}</span>
                  </>
                )}
                {r.accessibility && (
                  <>
                    <span className="text-gray-300">·</span>
                    <span>{r.accessibility}</span>
                  </>
                )}
                {r.produced_by && (
                  <>
                    <span className="text-gray-300">·</span>
                    <span>By {r.produced_by}</span>
                  </>
                )}
              </div>
            </div>
            {r.status && <StatusBadge status={r.status} />}
          </Link>
        ))}
      </div>
    </main>
  );
}
