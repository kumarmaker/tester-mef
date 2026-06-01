import Link from 'next/link';

interface RailItem {
  name: string;
  slug: string;
  type: string;
  href: string;
}

interface RelatedRailProps {
  title: string;
  items: RailItem[];
}

export default function RelatedRail({ title, items }: RelatedRailProps) {
  if (!items || items.length === 0) return null;

  return (
    <div>
      <h3
        className="text-base font-semibold uppercase tracking-wide text-gray-900 mb-3"
        style={{ fontFamily: 'var(--font-oswald)' }}
      >
        {title}
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={item.href}
            className="shrink-0 bg-white border border-gray-200 rounded-lg p-4 w-48 hover:shadow-md transition-shadow block"
          >
            <span
              className="text-xs text-gray-400 uppercase tracking-wide block mb-1"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {item.type}
            </span>
            <span
              className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2 block"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
