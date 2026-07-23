import { mergeLimitsMax } from "./mergeLimitsMax";

describe("mergeLimitsMax (наибольшее требование снизу)", () => {
  it("возвращает undefined, если оба аргумента undefined", () => {
    expect(mergeLimitsMax(undefined, undefined)).toBeUndefined();
  });

  it("возвращает base, если incoming отсутствует", () => {
    const base: any = { strength: 2, intelligence: 4 };
    expect(mergeLimitsMax(base, undefined)).toEqual(base);
  });

  it("возвращает incoming, если base отсутствует", () => {
    const incoming: any = { strength: 3, intelligence: 1 };
    expect(mergeLimitsMax(undefined, incoming)).toEqual(incoming);
  });

  it("выбирает наибольшее значение при конфликте (максимальное требование)", () => {
    expect(mergeLimitsMax({ strength: 2 }, { strength: 3 })).toEqual({
      strength: 3,
    });
    expect(mergeLimitsMax({ resolve: 5 }, { resolve: 2 })).toEqual({
      resolve: 5,
    });
  });

  it("сохраняет уникальные ключи", () => {
    const base: any = { strength: 2 };
    const incoming: any = { intelligence: 4, stamina: 1 };

    expect(mergeLimitsMax(base, incoming)).toEqual({
      strength: 2,
      intelligence: 4,
      stamina: 1,
    });
  });

  it("обрабатывает несколько пересекающихся ключей", () => {
    const base: any = { strength: 2, intelligence: 3 };
    const incoming: any = { strength: 4, intelligence: 1 }; // выше требование к силе, ниже к воле

    expect(mergeLimitsMax(base, incoming)).toEqual({
      strength: 4, // max(2, 4)
      intelligence: 3, // max(3, 1)
    });
  });
});
