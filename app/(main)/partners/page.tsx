import type { Metadata } from "next";
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Breadcrumb from '@/components/newmef/Breadcrumb';

export const metadata: Metadata = {
  title: "Partners",
  description: "MEF's global network of partners — UNEP, UN Women, IFC, AWS, Google Cloud, and 30+ organisations driving climate action.",
};

interface PartnerSummary {
  meta: { slug: string };
  hero: {
    name: string;
    short_name?: string;
    type?: string;
    description?: string;
  };
  partnership?: {
    status?: string;
  };
}

export default function PartnersIndexPage() {
  const dir = path.join(process.cwd(), 'data', 'partners');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
  const partners: PartnerSummary[] = files.map((f) =>
    JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')) as PartnerSummary
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <Breadcrumb items={[{ label: 'Partners', href: '/partners' }]} />

      <div className="mb-10">
        <h1
          className="text-3xl font-bold text-gray-900 uppercase tracking-wide mb-2"
          style={{ fontFamily: 'var(--font-oswald)' }}
        >
          Partners
        </h1>
        <p className="text-gray-500" style={{ fontFamily: 'var(--font-inter)' }}>
          {partners.length} institutional partners
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <Link
            key={partner.meta.slug}
            href={`/partners/${partner.meta.slug}`}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow block"
          >
            <div className="flex items-start justify-between mb-2">
              <h2
                className="text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors pr-2"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                {partner.hero.name}
              </h2>
              {partner.hero.short_name && partner.hero.short_name !== partner.hero.name && (
                <span className="shrink-0 px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                  {partner.hero.short_name}
                </span>
              )}
            </div>
            {partner.hero.type && (
              <p
                className="text-xs text-gray-400 uppercase tracking-wide mb-2"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {partner.hero.type}
              </p>
            )}
            {partner.hero.description && (
              <p
                className="text-sm text-gray-500 line-clamp-2"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {partner.hero.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
