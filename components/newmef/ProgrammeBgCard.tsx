import Link from 'next/link';
import StatusBadge from './StatusBadge';
import { PROGRAMME_CARD_IMAGES, PROGRAMME_PLACEHOLDER } from '@/lib/programme-images';

interface Props {
  slug: string;
  name: string;
  type?: string;
  status?: string;
  region?: string;
  year?: number;
  sectors?: string;
  description?: string;
  size?: 'default' | 'small';
}

export default function ProgrammeBgCard({ slug, name, type, status, region, sectors, description, size = 'default' }: Props) {
  const rawImg = PROGRAMME_CARD_IMAGES[slug] ?? PROGRAMME_PLACEHOLDER;
  const img = rawImg.replace(/\s/g, '%20').replace(/\(/g, '%28').replace(/\)/g, '%29');
  const height = size === 'small' ? '200px' : '260px';
  const titleSize = size === 'small' ? '16px' : '20px';

  return (
    <Link
      href={`/programmes/${slug}`}
      className="group relative flex flex-col justify-end overflow-hidden rounded-xl"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height,
      }}
    >
      {/* Gradient — deepens on hover */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.1) 100%)' }}
      />

      {/* Status badge */}
      {status && (
        <div className="absolute top-3 right-3 z-10">
          <StatusBadge status={status} />
        </div>
      )}

      {/* Content — slides up on hover */}
      <div className="relative z-10 p-4 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">

        {/* Meta */}
        {(type || region) && (
          <p
            className="text-xs text-gray-400 uppercase tracking-widest mb-1"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            {[type, region].filter(Boolean).join(' · ')}
          </p>
        )}

        {/* Title + View */}
        <div className="flex items-end justify-between gap-2">
          <h3
            className="font-bold uppercase text-white leading-tight group-hover:text-red-300 transition-colors"
            style={{ fontFamily: 'var(--font-oswald)', fontSize: titleSize }}
          >
            {name}
          </h3>
          <p
            className="text-xs text-red-400 font-semibold shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            View →
          </p>
        </div>

        {/* Description — hidden, slides in on hover */}
        {(description || sectors) && (
          <p
            className="text-gray-300 text-xs leading-relaxed mt-2 max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-300"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {description ?? sectors}
          </p>
        )}
      </div>
    </Link>
  );
}
