import { notEmpty } from "utils/array/notEmpty";

/**
 * Соеденить строки разделителем, игнорируя null и undefined
 */
export const joinStrings = (
  separator: string,
  ...strings: (string | number | null | undefined)[]
): string => strings.filter(notEmpty).join(separator);
