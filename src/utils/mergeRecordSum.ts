/**
 * Суммирует значения
 */
export const mergeRecordSum = <T extends Record<string, number>>(
  base: T | undefined,
  incoming: T | undefined,
): T | undefined => {
  if (!incoming) return base;
  if (!base) return incoming;

  const result: Record<string, number> = { ...base };

  for (const [key, value] of Object.entries(incoming)) {
    result[key] = (result[key] ?? 0) + value;
  }

  return result as T;
};
