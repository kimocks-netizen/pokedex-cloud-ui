import { TYPE_COLORS } from '@/lib/constants';

interface TypeBadgeProps {
  type: string;
  className?: string;
}

export default function TypeBadge({ type, className = '' }: TypeBadgeProps) {
  return (
    <span
      className={`${TYPE_COLORS[type.toLowerCase()] || 'bg-gray-500 text-white'} text-xs font-semibold px-3 py-1 rounded-full capitalize ${className}`}
    >
      {type}
    </span>
  );
}
