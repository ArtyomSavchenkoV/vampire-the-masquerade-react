import { mergeRecordSum } from "./mergeRecordSum";

describe("mergeRecordSum", () => {
  it("возвращает undefined, если оба аргумента undefined", () => {
    expect(mergeRecordSum(undefined, undefined)).toBeUndefined();
  });

  it("возвращает base, если incoming отсутствует", () => {
    const base: any = { strength: 5, dexterity: 3 };
    expect(mergeRecordSum(base, undefined)).toEqual(base);
  });

  it("возвращает incoming, если base отсутствует", () => {
    const incoming: any = { strength: 2, appearance: -1 };
    expect(mergeRecordSum(undefined, incoming)).toEqual(incoming);
  });

  it("суммирует значения по совпадающим ключам", () => {
    const base: any = { strength: 1 };
    const incoming: any = { strength: 2 };
    expect(mergeRecordSum(base, incoming)).toEqual({ strength: 3 });
  });

  it("сохраняет уникальные ключи из обоих объектов", () => {
    const base: any = { strength: 1, dexterity: 2 };
    const incoming: any = { appearance: 0, perception: 3 };
    expect(mergeRecordSum(base, incoming)).toEqual({
      strength: 1,
      dexterity: 2,
      appearance: 0,
      perception: 3,
    });
  });

  it("корректно обрабатывает отрицательные бонусы (штрафы)", () => {
    const base: any = { perception: 2 };
    const incoming: any = { perception: -1 }; // например, штраф от проклятия
    expect(mergeRecordSum(base, incoming)).toEqual({ perception: 1 });
  });

  it("работает с несколькими пересекающимися и непересекающимися ключами", () => {
    const base: any = { strength: 1, dexterity: 2, perception: 0 };
    const incoming: any = { dexterity: 1, perception: -1, appearance: 3 };
    expect(mergeRecordSum(base, incoming)).toEqual({
      strength: 1,
      dexterity: 3,
      perception: -1,
      appearance: 3,
    });
  });
});
