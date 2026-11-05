export type ObjectPaths<Obj> = Obj extends object
  ? {
      [Key in keyof Obj & string]: Obj[Key] extends object
        ? `${Key}.${ObjectPaths<Obj[Key]>}`
        : Key;
    }[keyof Obj & string]
  : never;
