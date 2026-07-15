import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1 text-sm text-gray-500 py-3" aria-label="Breadcrumb">
      <JsonLd data={breadcrumbSchema(items)} />
      <Link href="/" className="hover:text-red-600 transition-colors">
        Home
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          <span className="text-gray-400">/</span>
          {item.href && index < items.length - 1 ? (
            <Link href={item.href} className="hover:text-red-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-800 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
