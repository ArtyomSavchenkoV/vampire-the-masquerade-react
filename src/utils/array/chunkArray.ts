/**
 * Разбивает массив на подмассивы заданной длины.
 * @param array - исходный массив элементов типа T.
 * @param size - размер каждого подмассива (количество элементов).
 * @returns массив подмассивов, каждый из которых содержит не более `size` элементов.
 */
export const chunkArray = <T extends any>(array: T[], size: number): T[][] => {
  const result: T[][] = [];

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
};
