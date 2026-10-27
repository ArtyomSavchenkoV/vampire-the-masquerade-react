import { ResourceHistory } from "domain/ResourceHistory";
import { damageGhoulHealth, healGhoulHealth } from "./Health";
import { Ghoul } from "./Ghoul";
import { WoundEvent, HealEvent, Wounds } from "domain/Health";
import { numberToMaxMinDiapason } from "utils/numberToMaxminDiapason";

export type HealthHistory = HealEvent | WoundEvent;

export interface ResourcesHistory {
  willpower: ResourceHistory<Ghoul["willpower"]>[];
  bloodPool: ResourceHistory<Ghoul["bloodPool"]>[];
  health: ResourceHistory<HealthHistory>[];
}

export const completeHealthEvents = (
  bodyWounds: Wounds,
  healthHistory: ResourceHistory<HealthHistory>[],
) => {
  const sortedHealthHistory = [...healthHistory].sort(
    (a, b) => a.date - b.date,
  );
  return sortedHealthHistory.reduce<Wounds>((accum, change) => {
    if (change.effect.type === "heal") {
      if (!change.effect.value) {
        return accum;
      }
      return healGhoulHealth(accum, change.effect);
    }
    if (change.effect.type === "wound") {
      if (!change.effect.value) {
        return accum;
      }
      return damageGhoulHealth(
        accum,
        change.effect.woundType,
        change.effect.value,
      );
    }
    return accum as never;
  }, bodyWounds);
};

/**
 * Рассчитываем изменяемые параметры
 */
export const calculateChangebleParams = (
  ghoulData: Pick<
    Ghoul,
    | "maxWillpower"
    | "resourcesHistory"
    | "willpower"
    | "bloodPool"
    | "maxBloodPool"
    | "bodyWounds"
  >,
): Pick<Ghoul, "willpower" | "bloodPool" | "bodyWounds"> => {
  const maxWillpower = ghoulData.maxWillpower;

  const willpowerChanges = ghoulData.resourcesHistory.willpower.reduce(
    (accum, change) => accum + change.effect,
    0,
  );

  const bloodPoolChanges = ghoulData.resourcesHistory.bloodPool.reduce(
    (accum, change) => accum + change.effect,
    0,
  );

  const bodyWounds = completeHealthEvents(
    ghoulData.bodyWounds,
    ghoulData.resourcesHistory.health,
  );

  return {
    willpower: numberToMaxMinDiapason(ghoulData.willpower + willpowerChanges, {
      min: 0,
      max: maxWillpower,
    }),
    bloodPool: numberToMaxMinDiapason(ghoulData.bloodPool + bloodPoolChanges, {
      min: 0,
      max: ghoulData.maxBloodPool,
    }),
    bodyWounds,
  };
};
