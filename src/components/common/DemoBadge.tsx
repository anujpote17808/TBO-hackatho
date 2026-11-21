interface DemoBadgeProps {
  label?: string;
  variant?: 'light' | 'dark' | 'teal';
}

export function DemoBadge({
  label = 'Illustrative Demo Data',
  variant = 'light',
}: DemoBadgeProps) {
  const styles = {
    light: 'bg-[#F3F6FA] text-[#475569] border-[#CBD5E1]',
    dark: 'bg-white/10 text-[#94E8F5] border-white/15',
    teal: 'bg-[#0D9B80]/10 text-[#0D9B80] border-[#0D9B80]/25',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border whitespace-nowrap ${styles[variant]}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          variant === 'teal' ? 'bg-[#0D9B80]' : 'bg-[#14B8D4]'
        }`}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}

