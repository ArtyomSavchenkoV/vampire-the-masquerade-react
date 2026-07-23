export const mergeMultipliers = <T extends Record<string, number>>(
  base: T | undefined,
  incoming: T | undefined,
): T | undefined => {
  if (!incoming) return base;
  if (!base) return incoming;

  const result: Record<string, number> = { ...base };

  for (const [key, limit] of Object.entries(incoming)) {
    const current = result[key];
    result[key] = current === undefined ? limit : Math.max(current, limit);
  }

  return result as T;
};
