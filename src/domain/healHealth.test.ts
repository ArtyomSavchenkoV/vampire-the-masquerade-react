import { Wounds } from "domain/Health";
import { healHealth } from "./Health";

describe("src/domain/healHealth", () => {
  const wounds = [
    "lethal",
    "bashing",
    "aggravated",
    "lethal",
    "bashing",
    "lethal",
    "bashing",
  ] satisfies Wounds;
  it("Вылечен", () => {
    expect(
      healHealth([], "unimpaired", {
        type: "heal",
        woundType: "bashing",
        value: 2,
      }),
    ).toEqual([]);
  });

  it("bashing", () => {
    expect(
      healHealth(wounds, "heavilyWounded", {
        type: "heal",
        woundType: "bashing",
        value: 8,
      }),
    ).toEqual(["aggravated", "lethal", "lethal", "lethal"]);
  });

  it("lethal", () => {
    expect(
      healHealth(wounds, "heavilyWounded", {
        type: "heal",
        woundType: "lethal",
        value: 5,
      }),
    ).toEqual(["aggravated", "bashing"]);
  });

  it("aggravated", () => {
    expect(
      healHealth(wounds, "heavilyWounded", {
        type: "heal",
        woundType: "aggravated",
        value: 6,
      }),
    ).toEqual(["bashing"]);
  });

  it("Лечение в конечном статусе не возможно", () => {
    expect(
      healHealth(wounds, "final", {
        type: "heal",
        woundType: "aggravated",
        value: 6,
      }),
    ).toEqual([...wounds]);
  });
});
