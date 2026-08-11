export type GetByType<
  TUnion extends { type: string | number },
  TType extends TUnion["type"],
> = Extract<TUnion, { type: TType }>;
