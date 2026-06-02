import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Breadcrumb from '@/components/newmef/Breadcrumb';

interface PolicySummary {
  meta: { slug: string };
  hero: {
    name: string;
    short_name?: string;
    year?: number;
    level?: string;
    issuing_body?: string;
    type?: string;
    description?: string;
  };
}

export default function PolicyIndexPage() {
  const dir = path.join(process.cwd(), 'data', 'policy');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
  const policies: PolicySummary[] = files.map((f) =>
    JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')) as PolicySummary
  );

  const globalPolicies = policies.filter((p) => p.hero.level === 'global');
  const nationalPolicies = policies.filter((p) => p.hero.level === 'national');
  const otherPolicies = policies.filter(
    (p) => p.hero.level !== 'global' && p.hero.level !== 'national'
  );

  const renderPolicyCard = (policy: PolicySummary) => (
    <Link
      key={policy.meta.slug}
      href={`/newmef/policy/${policy.meta.slug}`}
      className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow block"
    >
      <div className="flex items-start justify-between mb-2">
        <h2
          className="text-base font-semibold text-gray-900 hover:text-red-600 transition-colors pr-2 leading-tight"
          style={{ fontFamily: 'var(--font-oswald)' }}
        >
          {policy.hero.name}
        </h2>
        {policy.hero.year && (
          <span
            className="shrink-0 text-xs text-gray-400 font-medium"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {policy.hero.year}
          </span>
        )}
      </div>
      <div
        className="flex flex-wrap gap-1.5 text-xs text-gray-500"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        {policy.hero.issuing_body && <span>{policy.hero.issuing_body}</span>}
        {policy.hero.type && (
          <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded capitalize">
            {policy.hero.type}
          </span>
        )}
      </div>
      {policy.hero.description && (
        <p
          className="text-xs text-gray-500 mt-2 line-clamp-2"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {policy.hero.description}
        </p>
      )}
    </Link>
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <Breadcrumb items={[{ label: 'Policy', href: '/newmef/policy' }]} />

      <div className="mb-10">
        <h1
          className="text-3xl font-bold text-gray-900 uppercase tracking-wide mb-2"
          style={{ fontFamily: 'var(--font-oswald)' }}
        >
          Policy
        </h1>
        <p className="text-gray-500" style={{ fontFamily: 'var(--font-inter)' }}>
          {policies.length} policies and frameworks
        </p>
      </div>

      {globalPolicies.length > 0 && (
        <div className="mb-10">
          <h2
            className="text-lg font-semibold uppercase tracking-wide text-gray-700 mb-4"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            Global
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {globalPolicies.map(renderPolicyCard)}
          </div>
        </div>
      )}

      {nationalPolicies.length > 0 && (
        <div className="mb-10">
          <h2
            className="text-lg font-semibold uppercase tracking-wide text-gray-700 mb-4"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            National
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nationalPolicies.map(renderPolicyCard)}
          </div>
        </div>
      )}

      {otherPolicies.length > 0 && (
        <div className="mb-10">
          <h2
            className="text-lg font-semibold uppercase tracking-wide text-gray-700 mb-4"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            Other
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherPolicies.map(renderPolicyCard)}
          </div>
        </div>
      )}
    </main>
  );
}
