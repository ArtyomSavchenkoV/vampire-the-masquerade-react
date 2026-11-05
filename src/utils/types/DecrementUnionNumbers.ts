type Tuple<N extends number, T extends unknown[] = []> = T["length"] extends N
  ? T
  : Tuple<N, [...T, unknown]>;

export type DecrementUnionNumbers<N extends number> =
  Tuple<N> extends [unknown, ...infer Rest] ? Rest["length"] : never;
