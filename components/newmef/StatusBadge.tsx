interface StatusBadgeProps {
  status: string;
}

const statusColors: Record<string, string> = {
  active: '',
  completed: 'bg-gray-100 text-gray-700',
  ongoing: 'bg-amber-100 text-amber-800',
  published: 'bg-blue-100 text-blue-800',
  planned: 'bg-purple-100 text-purple-800',
  lapsed: 'bg-red-100 text-red-700',
  unknown: 'bg-gray-100 text-gray-600',
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const isActive = status?.toLowerCase() === 'active';
  const colorClass = statusColors[status?.toLowerCase()] ?? 'bg-gray-100 text-gray-600';

  const label = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  if (isActive) {
    return (
      <span
        className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold"
        style={{
          background: "rgba(255,255,255,0.65)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(134,239,172,0.6)",
          color: "#15803d",
        }}
      >
        {label}
      </span>
    );
  }

  if (status?.toLowerCase() === 'completed') {
    return (
      <span
        className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold"
        style={{
          background: "rgba(255,255,255,0.65)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(0,0,0,0.12)",
          color: "rgba(30,30,30,0.65)",
        }}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${colorClass}`}
    >
      {status}
    </span>
  );
}
