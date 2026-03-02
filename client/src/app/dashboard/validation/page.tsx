import { SplitScreenValidation } from '@/components/validation/split-screen-validation';

export default function ValidationPage() {
  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-2xl font-semibold text-slate-900">Validación IA (Split-Screen)</h2>
        <p className="text-sm text-slate-600">Comparación lado a lado entre archivo fuente y datos estructurados.</p>
      </header>
      <SplitScreenValidation />
    </section>
  );
}
