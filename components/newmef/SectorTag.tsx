import Link from 'next/link';

interface SectorTagProps {
  name: string;
  slug?: string;
  variant?: 'primary' | 'secondary' | 'card';
  image?: string;
}

export default function SectorTag({ name, slug, variant = 'primary', image }: SectorTagProps) {

  if (variant === 'card') {
    const card = (
      <span
        className="relative inline-flex overflow-hidden transition-all hover:shadow-lg hover:scale-105"
        style={{
          borderRadius: '8px',
          width: '180px',
          height: '120px',
          backgroundImage: `url(${image ?? '/images/mef_programme_hero.webp'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          flexShrink: 0,
        }}
      >
        {/* Gradient — dark at bottom, fades to transparent above */}
        <span
          className="absolute inset-0"
          style={{ borderRadius: '8px', background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 45%, transparent 100%)' }}
        />
        {/* Text — bottom center aligned */}
        <span
          className="absolute bottom-0 left-0 right-0 px-3 py-3 text-white font-semibold uppercase leading-tight text-center"
          style={{ fontFamily: "var(--font-noto), 'Noto Sans', sans-serif", fontSize: '13px', letterSpacing: '0.04em' }}
        >
          {name}
        </span>
      </span>
    );
    if (slug) return <Link href={`/sectors/${slug}`}>{card}</Link>;
    return card;
  }

  // Original pill variant
  const colorClass =
    variant === 'primary'
      ? 'bg-red-600 text-white hover:bg-red-700'
      : 'bg-gray-100 text-gray-800 hover:bg-gray-200';

  const pill = (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold transition-colors ${colorClass}`}
      style={{ fontFamily: 'var(--font-inter)' }}
    >
      {name}
    </span>
  );

  if (slug) return <Link href={`/sectors/${slug}`}>{pill}</Link>;
  return pill;
}
