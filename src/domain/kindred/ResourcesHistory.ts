import { ResourceHistory } from "domain/ResourceHistory";
import { awakening, AwakeningEvent, damageHealth, healHealth } from "./Health";
import { Kindred } from "./Kindred";
import { WoundEvent, HealEvent, Wounds, sortWounds } from "domain/Health";
import { numberToMaxMinDiapason } from "utils/numberToMaxminDiapason";

export type HealthHistory = AwakeningEvent | HealEvent | WoundEvent;

export interface ResourcesHistory {
  willpower: ResourceHistory<Kindred["willpower"]>[];
  bloodPool: ResourceHistory<Kindred["bloodPool"]>[];
  health: ResourceHistory<HealthHistory>[];
}

export const completeHealthEvents = (
  bodyWounds: Wounds,
  healthHistory: ResourceHistory<HealthHistory>[],
) => {
  const sortedHealthHistory = [...healthHistory].sort(
    (a, b) => a.date - b.date,
  );
  return sortWounds(
    sortedHealthHistory.reduce<Wounds>((accum, change) => {
      if (change.effect.type === "torpor") {
        return awakening(accum);
      }
      if (change.effect.type === "heal") {
        if (!change.effect.value) {
          return accum;
        }
        return healHealth(accum, change.effect);
      }
      if (change.effect.type === "wound") {
        if (!change.effect.value) {
          return accum;
        }
        return damageHealth(
          accum,
          change.effect.woundType,
          change.effect.value,
        );
      }
      return accum as never;
    }, bodyWounds),
  );
};

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
    | "bodyWounds"
  >,
  { maxBloodPool }: { maxBloodPool: number },
): Pick<Kindred, "willpower" | "bloodPool" | "bodyWounds"> => {
  const maxWillpower = kindredData.maxWillpower;

  const willpowerChanges = kindredData.resourcesHistory.willpower.reduce(
    (accum, change) => accum + change.effect,
    0,
  );

  const bloodPoolChanges = kindredData.resourcesHistory.bloodPool.reduce(
    (accum, change) => accum + change.effect,
    0,
  );

  const bodyWounds = completeHealthEvents(
    kindredData.bodyWounds,
    kindredData.resourcesHistory.health,
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
    bodyWounds,
  };
};
