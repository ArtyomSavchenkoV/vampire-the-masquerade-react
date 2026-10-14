import { Wounds } from "domain/Health";
import { awakening } from "./Health";

describe("src/domain/kindred-awakening", () => {
  const wounds = [
    "lethal",
    "bashing",
    "lethal",
    "bashing",
    "bashing",
    "lethal",
    "aggravated",
  ] satisfies Wounds;

  it("Пробудиться после torpor", () => {
    expect(awakening([...wounds, "lethal"])).toEqual([
      "aggravated",
      "lethal",
      "lethal",
      "lethal",
      "bashing",
      "bashing",
    ]);
  });

  it("Нельзя пробудиться после окончательной смерти", () => {
    expect(awakening([...wounds, "aggravated"])).toEqual([
      ...wounds,
      "aggravated",
    ]);
  });

  it("Нельзя пробудиться просто раненому", () => {
    expect(awakening([...wounds.slice(4)])).toEqual([...wounds.slice(4)]);
  });
});
