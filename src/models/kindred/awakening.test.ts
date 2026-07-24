import { HealthDamages } from "models/Health";
import { awakening } from "./Health";

describe("src/models/kindred-awakening", () => {
  const healthDamages = [
    "lethal",
    "bashing",
    "lethal",
    "bashing",
    "bashing",
    "lethal",
    "aggravated",
  ] as const satisfies HealthDamages;

  it("Пробудиться после torpor", () => {
    expect(awakening([...healthDamages, "lethal"])).toEqual([
      "aggravated",
      "lethal",
      "lethal",
      "lethal",
      "bashing",
      "bashing",
    ]);
  });

  it("Нельзя пробудиться после окончательной смерти", () => {
    expect(awakening([...healthDamages, "aggravated"])).toEqual([
      ...healthDamages,
      "aggravated",
    ]);
  });

  it("Нельзя пробудиться просто раненому", () => {
    expect(awakening([...healthDamages.slice(4)])).toEqual([
      ...healthDamages.slice(4),
    ]);
  });
});
