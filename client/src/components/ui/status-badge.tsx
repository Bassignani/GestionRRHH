type StatusBadgeProps = {
  label: string;
  tone: 'success' | 'warning' | 'danger' | 'neutral';
};

const toneStyles: Record<StatusBadgeProps['tone'], string> = {
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-rose-100 text-rose-700',
  neutral: 'bg-slate-200 text-slate-700'
};

export function StatusBadge({ label, tone }: StatusBadgeProps) {
  return <span className={`rounded-full px-2 py-1 text-xs font-semibold ${toneStyles[tone]}`}>{label}</span>;
}
