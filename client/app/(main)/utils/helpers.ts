// utils/helpers.ts

export function cn(
  ...classes: (string | Record<string, boolean> | undefined | null) []
): string {
    return classes
    .flatMap((cls) => {
      if(typeof cls === "string") return cls;
      if(cls && typeof cls === 'object'){
        return Object.keys(cls).filter((key) => cls[key]);
      }
      return [];
    })
    .join(" ");
}