type ClassValue = string | number | boolean | undefined | null;

export function cn(...args: ClassValue[]): string {
  return args.filter(Boolean).join(" ");
}
