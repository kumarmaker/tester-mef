import Link from 'next/link';

interface PolicyPillProps {
  name: string;
  short_name?: string;
  slug?: string;
  level?: string;
  year?: number;
}

export default function PolicyPill({ name, short_name, slug, level, year }: PolicyPillProps) {
  const label = short_name || name;
  const levelColor =
    level === 'global'
      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100'
      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100';

  const content = (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${levelColor}`}
      style={{ fontFamily: 'var(--font-inter)' }}
      title={name}
    >
      {label}
      {year && <span className="text-gray-400 font-normal">{year}</span>}
    </span>
  );

  if (slug) {
    return <Link href={`/newmef/policy/${slug}`}>{content}</Link>;
  }
  return content;
}
