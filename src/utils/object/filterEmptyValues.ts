/**
 * Функция фильтрации объекта от 0 и пустых значений
 */
export const filterEmptyAndZeroValues = <T extends Record<string, any>>(
  obj: T,
) => {
  const isPresent = <T>(value: T | null | undefined | ""): value is T => {
    return !!value;
  };

  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => isPresent(value)),
  ) as { [K in keyof T]: NonNullable<T[K]> }; // Приведение типов для удаления null/undefined
};
