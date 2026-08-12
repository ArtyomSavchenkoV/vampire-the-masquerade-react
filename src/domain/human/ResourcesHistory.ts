import { ResourceHistory } from "domain/ResourceHistory";
import { Human } from "./Human";
import {
  DamageEvent,
  HealEvent,
  HealthDamages,
  HealthLevelData,
} from "domain/Health";
import { numberToMaxMinDiapason } from "utils/numberToMaxminDiapason";
import { damageHumanHealth, healHumanHealth } from "./Health";

export type HealthHistory = HealEvent | DamageEvent;

export interface ResourcesHistory {
  willpower: ResourceHistory<Human["willpower"]>[];
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
      return healHumanHealth([...healthLevels], accum, change.effect);
    }
    if (change.effect.type === "damage") {
      if (!change.effect.value) {
        return accum;
      }
      return damageHumanHealth([...healthLevels], accum, change.effect);
    }
    return accum as never;
  }, bodyDamages);
};

/**
 * Рассчитываем изменяемые параметры
 */
export const calculateChangebleParams = (
  data: Pick<
    Human,
    | "maxWillpower"
    | "resourcesHistory"
    | "willpower"
    | "bodyDamages"
    | "healthLevels"
  >,
): Pick<Human, "willpower" | "bodyDamages"> => {
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
