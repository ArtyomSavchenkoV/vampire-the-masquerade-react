import { mergeMultipliers } from "./mergeMultipliers";

describe("mergeMultipliers (выбор максимального множителя)", () => {
  it("возвращает undefined, если оба аргумента undefined", () => {
    expect(mergeMultipliers(undefined, undefined)).toBeUndefined();
  });

  it("возвращает base, если incoming отсутствует", () => {
    const base: any = { strength: 1.2, dexterity: 1.1 };
    expect(mergeMultipliers(base, undefined)).toEqual(base);
  });

  it("возвращает incoming, если base отсутствует", () => {
    const incoming: any = { strength: 1.5, resolve: 1.3 };
    expect(mergeMultipliers(undefined, incoming)).toEqual(incoming);
  });

  it("берёт максимальный множитель при конфликте ключей", () => {
    // Логика: если один эффект даёт ×1.2, а другой ×1.5 — берём ×1.5
    expect(mergeMultipliers({ strength: 1.2 }, { strength: 1.5 })).toEqual({
      strength: 1.5,
    });
    expect(mergeMultipliers({ resolve: 1.4 }, { resolve: 1.1 })).toEqual({
      resolve: 1.4,
    });
  });

  it("сохраняет уникальные множители", () => {
    const base: any = { strength: 1.2 };
    const incoming: any = { resolve: 1.3, intimidation: 1.1 };

    expect(mergeMultipliers(base, incoming)).toEqual({
      strength: 1.2,
      resolve: 1.3,
      intimidation: 1.1,
    });
  });

  it("корректно сливает несколько ключей с конфликтами и без", () => {
    const base: any = { strength: 1.2, resolve: 1.3 };
    const incoming: any = { strength: 1.5, resolve: 1.1, intimidation: 1.2 };

    expect(mergeMultipliers(base, incoming)).toEqual({
      strength: 1.5, // max(1.2, 1.5)
      resolve: 1.3, // max(1.3, 1.1)
      intimidation: 1.2,
    });
  });

  it("работает с дробными значениями (типично для множителей в V20)", () => {
    expect(mergeMultipliers({ dexterity: 1.05 }, { dexterity: 1.25 })).toEqual({
      dexterity: 1.25,
    });
  });
});
