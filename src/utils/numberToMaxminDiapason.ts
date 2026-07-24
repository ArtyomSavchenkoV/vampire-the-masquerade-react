export const numberToMaxMinDiapason = (
  number: number,
  { max, min }: { max: number; min: number },
): number => {
  if (max < min) {
    throw new Error("numberToMaxminDiapason error: max < min");
  }
  if (number < min) {
    return min;
  }

  if (number > max) {
    return max;
  }

  return number;
};
