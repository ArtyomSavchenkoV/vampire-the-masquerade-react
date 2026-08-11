/**
 * Аналог Array.map() для объектов.
 * Возвращает новый объект с теми же ключами.
 */
export const mapObject = <K extends string, V, R>(
  obj: Record<K, V>,
  fn: (value: V, key: K) => R,
): Record<K, R> => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, fn(value as V, key as K)]),
  ) as Record<K, R>;
};
