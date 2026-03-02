export function SplitScreenValidation() {
  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <article className="panel min-h-[520px] p-5">
        <header className="mb-4 border-b border-slate-200 pb-3">
          <h3 className="font-semibold text-slate-900">Archivo procesado</h3>
          <p className="text-sm text-slate-500">Vista previa del CV/documento cargado desde S3.</p>
        </header>
        <div className="flex h-[420px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
          Preview de archivo (PDF/Imagen)
        </div>
      </article>

      <article className="panel min-h-[520px] p-5">
        <header className="mb-4 border-b border-slate-200 pb-3">
          <h3 className="font-semibold text-slate-900">Formulario de validación</h3>
          <p className="text-sm text-slate-500">Completa campos obligatorios y confirma extracción IA.</p>
        </header>

        <form className="grid gap-4 sm:grid-cols-2">
          <Field label="DNI" placeholder="30.111.222" />
          <Field label="Nombre" placeholder="Ana" />
          <Field label="Apellido" placeholder="Molina" />
          <Field label="Email" placeholder="ana.molina@mail.com" />
          <Field label="Zona" placeholder="Neuquén" />
          <Field label="Rotación" placeholder="14x14" />
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">Observaciones</label>
            <textarea
              className="h-28 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-brand-500 focus:ring"
              placeholder="Anotar inconsistencias detectadas..."
            />
          </div>
          <div className="sm:col-span-2 flex justify-end">
            <button className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">
              Confirmar validación
            </button>
          </div>
        </form>
      </article>
    </section>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
      <input
        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-brand-500 focus:ring"
        placeholder={placeholder}
      />
    </div>
  );
}
