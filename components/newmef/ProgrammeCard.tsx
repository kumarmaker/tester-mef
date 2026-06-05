import Link from 'next/link';
import StatusBadge from './StatusBadge';

interface ProgrammeCardProps {
  name: string;
  short_name?: string;
  type?: string;
  status?: string;
  slug: string;
  description?: string;
}

export default function ProgrammeCard({
  name,
  short_name,
  type,
  status,
  slug,
  description,
}: ProgrammeCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow relative">
      {status && (
        <div className="absolute top-4 right-4">
          <StatusBadge status={status} />
        </div>
      )}
      <Link href={`/programmes/${slug}`} className="block">
        <h3
          className="text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors pr-16 leading-tight"
          style={{ fontFamily: 'var(--font-oswald)' }}
        >
          {name}
        </h3>
      </Link>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {short_name && (
          <span className="text-sm text-gray-500" style={{ fontFamily: 'var(--font-inter)' }}>
            {short_name}
          </span>
        )}
        {type && (
          <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium uppercase tracking-wide">
            {type}
          </span>
        )}
      </div>
      {description && (
        <p
          className="mt-3 text-sm text-gray-600 line-clamp-3"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
