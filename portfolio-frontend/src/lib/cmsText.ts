/** Shared parsers for Strapi text blob fields. */

export function parseLines(raw?: string | null): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(/\n|\\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

export function parseKvRows(raw?: string | null): [string, string][] {
  if (!raw?.trim()) return [];
  return raw
    .split(/\n|\\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split('|');
      return [label.trim(), rest.join('|').trim()] as [string, string];
    })
    .filter(([a, b]) => a && b);
}

export function parseNavLinks(
  raw?: string | null,
  fallback: { label: string; href: string }[] = [],
): { label: string; href: string }[] {
  const rows = parseKvRows(raw);
  if (!rows.length) return fallback;
  return rows.map(([label, href]) => ({ label, href }));
}

export function parseCommandMap(
  raw?: string | null,
  fallback: Record<string, string> = {},
): Record<string, string> {
  const rows = parseKvRows(raw);
  if (!rows.length) return fallback;
  return Object.fromEntries(rows.map(([k, v]) => [k.toLowerCase(), v]));
}

export function csvList(raw?: string | null): string[] {
  return (raw || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}
