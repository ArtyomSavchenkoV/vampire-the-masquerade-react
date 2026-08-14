export const mergeMultipliers = <T extends Record<string, number>>(
  base: T | undefined,
  incoming: T | undefined,
): T | undefined => {
  if (!incoming) return base;
  if (!base) return incoming;

  const result: Partial<Record<string, number>> = {};

  // Сначала копируем все ключи из base
  for (const [key, value] of Object.entries(base)) {
    result[key] = value;
  }

  // Затем обрабатываем incoming: если ключ уже есть — перемножаем, если нет — копируем
  for (const [key, value] of Object.entries(incoming)) {
    if (key in result) {
      result[key] = (result[key] ?? 1) * value;
    } else {
      result[key] = value;
    }
  }

  return result as T;
};
