import Link from 'next/link';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/candidates', label: 'Candidates' },
  { href: '/dashboard/validation', label: 'Validación IA' }
];

export function Sidebar() {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-slate-200 bg-brand-900 text-slate-100">
      <div className="border-b border-brand-700 px-6 py-5">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Smart Recruitment</p>
        <h1 className="mt-2 text-lg font-semibold">Oil & Gas Console</h1>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-brand-700"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
