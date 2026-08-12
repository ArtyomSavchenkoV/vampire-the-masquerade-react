import { ResourceHistory } from "domain/ResourceHistory";
import { Creature } from "./Creature";
import {
  DamageEvent,
  HealEvent,
  HealthDamages,
  HealthLevelData,
} from "domain/Health";
import { numberToMaxMinDiapason } from "utils/numberToMaxminDiapason";
import { damageCreatureHealth, healCreatureHealth } from "./Health";

export type HealthHistory = HealEvent | DamageEvent;

export interface ResourcesHistory {
  willpower: ResourceHistory<Creature["willpower"]>[];
  health: ResourceHistory<HealthHistory>[];
}

export const completeHealthEvents = (
  healthLevels: HealthLevelData[],
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
      return healCreatureHealth([...healthLevels], accum, change.effect);
    }
    if (change.effect.type === "damage") {
      if (!change.effect.value) {
        return accum;
      }
      return damageCreatureHealth([...healthLevels], accum, change.effect);
    }
    return accum as never;
  }, bodyDamages);
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
    | "bodyDamages"
    | "healthLevels"
  >,
): Pick<Creature, "willpower" | "bodyDamages"> => {
  const maxWillpower = data.maxWillpower;

  const willpowerChanges = data.resourcesHistory.willpower.reduce(
    (accum, change) => accum + change.effect,
    0,
  );

  const bodyDamages = completeHealthEvents(
    data.healthLevels,
    data.bodyDamages,
    data.resourcesHistory.health,
  );

  return {
    willpower: numberToMaxMinDiapason(data.willpower + willpowerChanges, {
      min: 0,
      max: maxWillpower,
    }),
    bodyDamages,
  };
};
