import { ResourceHistory } from "domain/ResourceHistory";
import { damageGhoulHealth, healGhoulHealth } from "./Health";
import { Ghoul } from "./Ghoul";
import { DamageEvent, HealEvent, HealthDamages } from "domain/Health";
import { numberToMaxMinDiapason } from "utils/numberToMaxminDiapason";

export type HealthHistory = HealEvent | DamageEvent;

export interface ResourcesHistory {
  willpower: ResourceHistory<Ghoul["willpower"]>[];
  bloodPool: ResourceHistory<Ghoul["bloodPool"]>[];
  health: ResourceHistory<HealthHistory>[];
}

export const completeHealthEvents = (
  bodyDamages: HealthDamages,
  healthHistory: ResourceHistory<HealthHistory>[],
) => {
  const sortedHealthHistory = [...healthHistory].sort(
    (a, b) => a.date - b.date,
  );
  return sortedHealthHistory.reduce<HealthDamages>((accum, change) => {
    if (change.effect.type === "heal") {
      if (!change.effect.value) {
        return accum;
      }
      return healGhoulHealth(accum, change.effect);
    }
    if (change.effect.type === "damage") {
      if (!change.effect.value) {
        return accum;
      }
      return damageGhoulHealth(accum, change.effect);
    }
    return accum as never;
  }, bodyDamages);
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
    | "bodyDamages"
  >,
): Pick<Ghoul, "willpower" | "bloodPool" | "bodyDamages"> => {
  const maxWillpower = ghoulData.maxWillpower;

  const willpowerChanges = ghoulData.resourcesHistory.willpower.reduce(
    (accum, change) => accum + change.effect,
    0,
  );

  const bloodPoolChanges = ghoulData.resourcesHistory.bloodPool.reduce(
    (accum, change) => accum + change.effect,
    0,
  );

  const bodyDamages = completeHealthEvents(
    ghoulData.bodyDamages,
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
    bodyDamages,
  };
};
