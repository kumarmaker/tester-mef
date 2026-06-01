import Link from 'next/link';

interface SectorTagProps {
  name: string;
  slug?: string;
  variant?: 'primary' | 'secondary';
}

export default function SectorTag({ name, slug, variant = 'primary' }: SectorTagProps) {
  const colorClass =
    variant === 'primary'
      ? 'bg-red-600 text-white hover:bg-red-700'
      : 'bg-gray-100 text-gray-800 hover:bg-gray-200';

  const content = (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold transition-colors ${colorClass}`}
      style={{ fontFamily: 'var(--font-inter)' }}
    >
      {name}
    </span>
  );

  if (slug) {
    return <Link href={`/newmef/sectors/${slug}`}>{content}</Link>;
  }
  return content;
}
