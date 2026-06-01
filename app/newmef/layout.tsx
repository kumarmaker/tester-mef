import Link from 'next/link';

const navLinks = [
  { label: 'Sectors', href: '/newmef/sectors' },
  { label: 'Programmes', href: '/newmef/programmes' },
  { label: 'Research', href: '/newmef/research' },
  { label: 'Events', href: '/newmef/events' },
  { label: 'Partners', href: '/newmef/partners' },
  { label: 'Policy', href: '/newmef/policy' },
];

export default function NewMEFLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* MEF Data Preview top nav strip */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-10 flex items-center gap-6">
          <Link
            href="/newmef"
            className="text-xs font-semibold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors whitespace-nowrap"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            MEF Data Preview
          </Link>
          <span className="text-gray-700 text-xs">|</span>
          <nav className="flex items-center gap-4 overflow-x-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-gray-300 hover:text-white transition-colors whitespace-nowrap"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}
