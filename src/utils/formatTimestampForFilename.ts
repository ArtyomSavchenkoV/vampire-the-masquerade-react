/**
 * Форматирует дату в строку вида "VTM-2026-08-10 17:22"
 */
export const formatTimestampForFilename = (date: Date = new Date()): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // месяцы с 0
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `VTM-${year}-${month}-${day} ${hours}:${minutes}`;
};
