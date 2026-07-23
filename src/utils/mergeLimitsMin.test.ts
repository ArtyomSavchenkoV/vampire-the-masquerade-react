import { mergeLimitsMin } from "./mergeLimitsMin";

describe("mergeLimitsMin (строгий верхний лимит)", () => {
  it("возвращает undefined, если оба аргумента undefined", () => {
    expect(mergeLimitsMin(undefined, undefined)).toBeUndefined();
  });

  it("возвращает base, если incoming отсутствует", () => {
    const base: any = { strength: 5, appearance: 3 };
    expect(mergeLimitsMin(base, undefined)).toEqual(base);
  });

  it("возвращает incoming, если base отсутствует", () => {
    const incoming: any = { dexterity: 2, appearance: 0 }; // проклятие
    expect(mergeLimitsMin(undefined, incoming)).toEqual(incoming);
  });

  it("выбирает наименьшее значение при конфликте ключей (самое строгое)", () => {
    // В V20: если есть лимит 5 и лимит 0 — остаётся 0
    expect(mergeLimitsMin({ strength: 5 }, { strength: 0 })).toEqual({
      strength: 0,
    });
    expect(mergeLimitsMin({ appearance: 2 }, { appearance: 5 })).toEqual({
      appearance: 2,
    });
  });

  it("сохраняет уникальные ключи из обоих объектов", () => {
    const base: any = { strength: 5 };
    const incoming: any = { appearance: 0, dexterity: 3 };

    expect(mergeLimitsMin(base, incoming)).toEqual({
      strength: 5,
      appearance: 0,
      dexterity: 3,
    });
  });

  it("корректно обрабатывает несколько конфликтующих ключей", () => {
    const base: any = { strength: 4, appearance: 2 };
    const incoming: any = { strength: 1, appearance: 3 }; // строже по силе, слабее по внешности

    expect(mergeLimitsMin(base, incoming)).toEqual({
      strength: 1, // min(4, 1)
      appearance: 2, // min(2, 3)
    });
  });
});
