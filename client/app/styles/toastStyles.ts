//client/app/styles/toastStyles.ts

export const toastStyles = {
  success: {
    iconClassName: 'toast-icon-success',
    descriptionClassName: 'toast-description-success',
    className: 'toast-success',
    duration: 3000,
  },
  error: {
    iconClassName: 'toast-icon-error',
    descriptionClassName: 'toast-description-error',
    className: 'toast-error',
    duration: 4000,
  },
  // ...and so on
} as const;
