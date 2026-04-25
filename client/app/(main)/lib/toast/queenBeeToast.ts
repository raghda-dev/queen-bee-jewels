// client/lib/toast/queenBeeToast.ts

'use client';

import { toast } from 'sonner';
import styles from '@/styles/sass/modules/toast.module.scss';

type Variant = 'success' | 'error' | 'info';

export function queenBeeToast(message: string, variant: Variant = 'info') {
  toast(message, {
    className: styles[variant],
  });
}
