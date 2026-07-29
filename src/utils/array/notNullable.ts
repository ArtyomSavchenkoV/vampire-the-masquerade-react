export const notNullable = <TValue>(
  value: TValue | null | undefined,
): value is TValue => value != null;
