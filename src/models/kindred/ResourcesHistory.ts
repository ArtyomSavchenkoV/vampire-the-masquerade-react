import { ResourceHistory } from "models/ResourceHistory";
import { awakening, damageHealth, healHealth, HealthHistory } from "./Health";
import { Kindred } from "./Kindred";
import { HealthDamages } from "models/Health";
import { numberToMaxMinDiapason } from "utils/numberToMaxminDiapason";

export interface ResourcesHistory {
  willpower: ResourceHistory<Kindred["willpower"]>[];
  bloodPool: ResourceHistory<Kindred["bloodPool"]>[];
  health: ResourceHistory<HealthHistory>[];
}

/**
 * Рассчитываем изменяемые параметры
 */
export const calculateChangebleParams = (
  kindredData: Pick<
    Kindred,
    | "maxWillpower"
    | "resourcesHistory"
    | "willpower"
    | "bloodPool"
    | "bodyDamages"
  >,
  { maxBloodPool }: { maxBloodPool: number },
): Pick<Kindred, "willpower" | "bloodPool" | "bodyDamages"> => {
  const maxWillpower = kindredData.maxWillpower;

  const willpowerChanges = kindredData.resourcesHistory.willpower.reduce(
    (accum, change) => accum + change.effect,
    0,
  );

  const bloodPoolChanges = kindredData.resourcesHistory.bloodPool.reduce(
    (accum, change) => accum + change.effect,
    0,
  );

  const sortedHealthHistory = [...kindredData.resourcesHistory.health].sort(
    (a, b) => a.date - b.date,
  );

  const bodyDamages = sortedHealthHistory.reduce<HealthDamages>(
    (accum, change) => {
      if (change.effect.type === "torpor") {
        return awakening(accum);
      }
      if (change.effect.type === "heal") {
        if (!change.effect.value) {
          return accum;
        }
        return healHealth(accum, change.effect);
      }
      if (change.effect.type === "damage") {
        if (!change.effect.value) {
          return accum;
        }
        return damageHealth(accum, change.effect);
      }
      return accum as never;
    },
    kindredData.bodyDamages,
  );

  return {
    willpower: numberToMaxMinDiapason(
      kindredData.willpower + willpowerChanges,
      {
        min: 0,
        max: maxWillpower,
      },
    ),
    bloodPool: numberToMaxMinDiapason(
      kindredData.bloodPool + bloodPoolChanges,
      {
        min: 0,
        max: maxBloodPool,
      },
    ),
    bodyDamages,
  };
};
