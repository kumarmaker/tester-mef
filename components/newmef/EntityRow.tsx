import Link from 'next/link';

interface EntityRowProps {
  name: string;
  slug: string;
  href: string;
  meta?: string;
  badge?: string;
}

export default function EntityRow({ name, href, meta, badge }: EntityRowProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex flex-col gap-0.5 min-w-0">
        <Link
          href={href}
          className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors truncate"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {name}
        </Link>
        {meta && (
          <span className="text-xs text-gray-400" style={{ fontFamily: 'var(--font-inter)' }}>
            {meta}
          </span>
        )}
      </div>
      {badge && (
        <span className="ml-4 shrink-0 inline-block px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium uppercase tracking-wide">
          {badge}
        </span>
      )}
    </div>
  );
}
