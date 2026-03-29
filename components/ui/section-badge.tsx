import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionBadgeProps {
  icon: LucideIcon;
  label: string;
  variant?: 'blue' | 'yellow';
  className?: string;
}

export function SectionBadge({ icon: Icon, label, variant = 'blue', className }: SectionBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium mb-4',
        variant === 'blue'
          ? 'bg-[#377dff]/10 border border-[#377dff]/20 text-[#377dff]'
          : 'bg-[#f9b934]/10 border border-[#f9b934]/30 text-[#f9b934]',
        className
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}
