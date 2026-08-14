import { mergeMultipliers } from "./mergeMultipliers";

describe("mergeMultipliers (выбор максимального множителя)", () => {
  it("возвращает undefined, если оба аргумента undefined", () => {
    expect(mergeMultipliers(undefined, undefined)).toBeUndefined();
  });

  it("возвращает base, если incoming отсутствует", () => {
    const base: any = { bashing: 0.5, lethal: 0.5 };
    expect(mergeMultipliers(base, undefined)).toEqual(base);
  });

  it("возвращает incoming, если base отсутствует", () => {
    const incoming: any = { bashing: 1.5, lethal: 1.3 };
    expect(mergeMultipliers(undefined, incoming)).toEqual(incoming);
  });

  it("Складывает множители", () => {
    expect(mergeMultipliers({ lethal: 0.5 }, { lethal: 0.5 })).toEqual({
      lethal: 0.25,
    });
    expect(mergeMultipliers({ bashing: 2 }, { bashing: 0.5 })).toEqual({
      bashing: 1,
    });
    expect(mergeMultipliers({ bashing: 0.5 }, { bashing: 2 })).toEqual({
      bashing: 1,
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
    const base: any = { bashing: 0.8, lethal: 0.5 };
    const incoming: any = { bashing: 0.5, lethal: 2, intimidation: 1.2 };

    expect(mergeMultipliers(base, incoming)).toEqual({
      bashing: 0.4,
      lethal: 1,
      intimidation: 1.2,
    });
  });
});
