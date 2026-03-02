'use client';

import { useMemo, useState } from 'react';
import { candidates } from '@/lib/mock-data';
import { StatusBadge } from '@/components/ui/status-badge';

const zonas = ['Todas', 'Norte', 'Neuquén', 'Chubut', 'Santa Cruz'] as const;
const rotaciones = ['Todas', '14x14', '21x7', '28x14'] as const;
const estadosMedicos = ['Todos', 'Apto', 'Con Restricciones', 'Pendiente'] as const;

type FiltroZona = (typeof zonas)[number];
type FiltroRotacion = (typeof rotaciones)[number];
type FiltroMedico = (typeof estadosMedicos)[number];

export function CandidatesTable() {
  const [zona, setZona] = useState<FiltroZona>('Todas');
  const [rotacion, setRotacion] = useState<FiltroRotacion>('Todas');
  const [estadoMedico, setEstadoMedico] = useState<FiltroMedico>('Todos');

  const filteredCandidates = useMemo(
    () =>
      candidates.filter(
        (candidate) =>
          (zona === 'Todas' || candidate.zona === zona) &&
          (rotacion === 'Todas' || candidate.rotacion === rotacion) &&
          (estadoMedico === 'Todos' || candidate.estadoMedico === estadoMedico)
      ),
    [zona, rotacion, estadoMedico]
  );

  return (
    <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
      <aside className="panel p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Filtros</h3>

        <div className="mt-4 space-y-4">
          <FilterSelect label="Zona" options={zonas} value={zona} onChange={setZona} />
          <FilterSelect label="Rotación" options={rotaciones} value={rotacion} onChange={setRotacion} />
          <FilterSelect label="Estado médico" options={estadosMedicos} value={estadoMedico} onChange={setEstadoMedico} />
        </div>
      </aside>

      <section className="panel overflow-hidden">
        <header className="border-b border-slate-200 px-5 py-4">
          <h3 className="font-semibold text-slate-900">Listado de Candidates</h3>
          <p className="text-sm text-slate-500">Resultado: {filteredCandidates.length} perfiles</p>
        </header>
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">DNI</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Zona</th>
                <th className="px-4 py-3">Rotación</th>
                <th className="px-4 py-3">Estado médico</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((candidate) => (
                <tr key={candidate.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium">{candidate.dni}</td>
                  <td className="px-4 py-3">{candidate.nombre}</td>
                  <td className="px-4 py-3">{candidate.zona}</td>
                  <td className="px-4 py-3">{candidate.rotacion}</td>
                  <td className="px-4 py-3">{candidate.estadoMedico}</td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      label={candidate.estado}
                      tone={candidate.estado === 'Active' ? 'success' : 'neutral'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

type FilterSelectProps<T extends string> = {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
};

function FilterSelect<T extends string>({ label, options, value, onChange }: FilterSelectProps<T>) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
      <select
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none ring-brand-500 focus:ring"
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
