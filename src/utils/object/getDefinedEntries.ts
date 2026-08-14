interface FieldEntry<K extends string, V> {
  key: K;
  value: V;
}

/**
 * Возвращает пары [key, value] только для тех полей, где value !== undefined.
 * Идеально для рендеринга списков характеристик, дисциплин и т. п.
 */
export const getDefinedEntries = <K extends string, V>(
  object: Partial<Record<K, V>>,
): Array<FieldEntry<K, V>> =>
  Object.entries(object)
    .map(([k, v]) => ({
      key: k as K,
      value: v as V,
    }))
    .filter((entry): entry is FieldEntry<K, V> => entry.value !== undefined);
