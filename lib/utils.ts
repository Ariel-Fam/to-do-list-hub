// Simple class name merge helper for Tailwind-style utilities.
export function cn(
  ...inputs: Array<string | null | undefined | false>
): string {
  return inputs.filter(Boolean).join(" ");
}

