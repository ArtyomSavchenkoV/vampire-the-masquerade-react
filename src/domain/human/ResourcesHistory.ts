import { ResourceHistory } from "domain/ResourceHistory";
import { Human } from "./Human";
import {
  DamageEvent,
  damageHealth,
  getHealthLevel,
  HealEvent,
  healHealth,
  HealthDamages,
} from "domain/Health";
import { numberToMaxMinDiapason } from "utils/numberToMaxminDiapason";
import { humanHealthLevels, unimpaired } from "data/humanHealthLevels";

export type HealthHistory = HealEvent | DamageEvent;

export interface ResourcesHistory {
  willpower: ResourceHistory<Human["willpower"]>[];
  health: ResourceHistory<HealthHistory>[];
}

/**
 * Рассчитываем изменяемые параметры
 */
export const calculateChangebleParams = (
  data: Pick<
    Human,
    "maxWillpower" | "resourcesHistory" | "willpower" | "bodyDamages"
  >,
): Pick<Human, "willpower" | "bodyDamages"> => {
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
        healthLevels: humanHealthLevels,
        unimpaired: unimpaired,
      })(accum).name;
      const maxHealth = humanHealthLevels.length;
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
