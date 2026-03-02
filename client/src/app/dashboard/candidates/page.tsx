import { CandidatesTable } from '@/components/candidates/candidates-table';

export default function CandidatesPage() {
  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-2xl font-semibold text-slate-900">Candidates</h2>
        <p className="text-sm text-slate-600">Gestión de perfiles con filtros operativos por región y aptitud.</p>
      </header>
      <CandidatesTable />
    </section>
  );
}
