import { ResourceHistory } from "domain/ResourceHistory";
import { Creature } from "./Creature";
import {
  DamageEvent,
  damageHealth,
  getHealthLevel,
  HealEvent,
  healHealth,
  HealthDamages,
} from "domain/Health";
import { numberToMaxMinDiapason } from "utils/numberToMaxminDiapason";

export type HealthHistory = HealEvent | DamageEvent;

export interface ResourcesHistory {
  willpower: ResourceHistory<Creature["willpower"]>[];
  health: ResourceHistory<HealthHistory>[];
}

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

  const sortedHealthHistory = [...data.resourcesHistory.health].sort(
    (a, b) => a.date - b.date,
  );

  const bodyDamages = sortedHealthHistory.reduce<HealthDamages>(
    (accum, change) => {
      const healthLevelName = getHealthLevel({
        healthLevels: [...data.healthLevels],
      })(accum).name;
      const maxHealth = data.healthLevels.length - 1;
      if (change.effect.type === "heal") {
        if (!change.effect.value) {
          return accum;
        }
        return healHealth({
          bodyDamages: accum,
          healthLevelName,
          healEvent: change.effect,
        });
      }
      if (change.effect.type === "damage") {
        if (!change.effect.value) {
          return accum;
        }
        return damageHealth({
          bodyDamages: accum,
          healthLevelName,
          damageEvent: change.effect,
          maxHealth,
        });
      }
      return accum as never;
    },
    data.bodyDamages,
  );

  return {
    willpower: numberToMaxMinDiapason(data.willpower + willpowerChanges, {
      min: 0,
      max: maxWillpower,
    }),
    bodyDamages,
  };
};
