export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold text-slate-900">Dashboard principal</h2>
        <p className="mt-1 text-sm text-slate-600">Resumen operativo para reclutamiento en campo.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ['Búsquedas abiertas', '12'],
          ['Candidatos activos', '184'],
          ['Alertas de cierre', '3']
        ].map(([label, value]) => (
          <article className="panel p-5" key={label}>
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-bold text-brand-800">{value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
