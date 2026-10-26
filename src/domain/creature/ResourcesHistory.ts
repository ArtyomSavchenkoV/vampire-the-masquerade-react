import { ResourceHistory } from "domain/ResourceHistory";
import { Creature } from "./Creature";
import {
  WoundEvent,
  HealEvent,
  HealthLevelData,
  Wounds,
  sortWounds,
} from "domain/Health";
import { numberToMaxMinDiapason } from "utils/numberToMaxminDiapason";
import { damageCreatureHealth, healCreatureHealth } from "./Health";

export type HealthHistory = HealEvent | WoundEvent;

export interface ResourcesHistory {
  willpower: ResourceHistory<Creature["willpower"]>[];
  health: ResourceHistory<HealthHistory>[];
}

export const completeHealthEvents = (
  healthLevels: HealthLevelData[],
  bodyWounds: Wounds,
  healthHistory: ResourceHistory<HealthHistory>[],
) => {
  const sortedHealthHistory = [...healthHistory].sort(
    (a, b) => a.date - b.date,
  );
  return sortWounds(
    sortedHealthHistory.reduce<Wounds>((accum, change) => {
      if (change.effect.type === "heal") {
        if (!change.effect.value) {
          return accum;
        }
        return healCreatureHealth([...healthLevels], accum, change.effect);
      }
      if (change.effect.type === "wound") {
        if (!change.effect.value) {
          return accum;
        }
        return damageCreatureHealth(
          [...healthLevels],
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
  data: Pick<
    Creature,
    | "maxWillpower"
    | "resourcesHistory"
    | "willpower"
    | "bodyWounds"
    | "healthLevels"
  >,
): Pick<Creature, "willpower" | "bodyWounds"> => {
  const maxWillpower = data.maxWillpower;

  const willpowerChanges = data.resourcesHistory.willpower.reduce(
    (accum, change) => accum + change.effect,
    0,
  );

  const bodyWounds = completeHealthEvents(
    data.healthLevels,
    data.bodyWounds,
    data.resourcesHistory.health,
  );

  return {
    willpower: numberToMaxMinDiapason(data.willpower + willpowerChanges, {
      min: 0,
      max: maxWillpower,
    }),
    bodyWounds,
  };
};
