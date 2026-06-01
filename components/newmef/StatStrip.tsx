interface Stat {
  label: string;
  value: number | string;
}

interface StatStripProps {
  stats: Stat[];
}

export default function StatStrip({ stats }: StatStripProps) {
  return (
    <div className="bg-gray-50 border-y border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-0 divide-x divide-gray-300">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center px-8 py-2">
              <span
                className="text-3xl font-bold text-gray-900"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                {stat.value}
              </span>
              <span
                className="text-sm text-gray-500 mt-1 uppercase tracking-wide"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
