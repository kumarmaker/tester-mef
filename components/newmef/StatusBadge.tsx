interface StatusBadgeProps {
  status: string;
}

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-700',
  ongoing: 'bg-amber-100 text-amber-800',
  published: 'bg-blue-100 text-blue-800',
  planned: 'bg-purple-100 text-purple-800',
  lapsed: 'bg-red-100 text-red-700',
  unknown: 'bg-gray-100 text-gray-600',
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const colorClass = statusColors[status?.toLowerCase()] ?? 'bg-gray-100 text-gray-600';
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${colorClass}`}
    >
      {status}
    </span>
  );
}
