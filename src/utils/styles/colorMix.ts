export const colorMix = (
  colorFrom: "transparent" | string,
  colorTo: "transparent" | string,
  percent: number,
): string => `color-mix(in srgb, ${colorFrom}, ${colorTo} ${percent}%)`;
