// client/app/(main)/lib/toast/useQueenBeeToast.tsx

'use client';

import { toast } from 'sonner';
import { CheckCircle2, XCircle, Info, LucideIcon } from 'lucide-react';
import styles from '@/styles/sass/modules/toast.module.scss';

type Variant = 'success' | 'error' | 'info';

const iconMap: Record<Variant, LucideIcon> = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

export function useQueenBeeToast() {
  function showToast(
    message: string,
    variant: Variant = 'info',
    icon?: LucideIcon
  ) {
    const Icon = icon || iconMap[variant];

    toast(message, {
      icon: <Icon className="h-5 w-5 text-inherit" />,
      className: styles[variant],
    });
  }

  return { showToast };
}
