export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 p-6">
      <section className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900/80 p-8 text-slate-100 shadow-panel backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Smart Recruitment</p>
        <h2 className="mt-3 text-2xl font-semibold">Iniciar sesión</h2>
        <p className="mt-2 text-sm text-slate-300">Acceso seguro para equipos de reclutamiento Oil & Gas.</p>

        <form className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="email">
              Email corporativo
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 outline-none ring-brand-500 placeholder:text-slate-500 focus:ring"
              placeholder="recruiter@smartrecruitment.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 outline-none ring-brand-500 placeholder:text-slate-500 focus:ring"
              placeholder="••••••••"
            />
          </div>
          <button className="w-full rounded-lg bg-accent-amber px-4 py-2 text-sm font-semibold text-slate-900 transition hover:brightness-95">
            Ingresar al Dashboard
          </button>
        </form>
      </section>
    </main>
  );
}
