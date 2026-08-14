/**
 * фильтрация массива от пустых значений
 */
export const notEmpty = <TValue>(
  value: TValue | null | undefined,
): value is TValue => value != null;
