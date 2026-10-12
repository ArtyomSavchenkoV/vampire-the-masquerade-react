import { ResourceHistory } from "domain/ResourceHistory";
import { Human } from "./Human";
import { WoundEvent, HealEvent, HealthLevelData, Wounds } from "domain/Health";
import { numberToMaxMinDiapason } from "utils/numberToMaxminDiapason";
import { damageHumanHealth, healHumanHealth } from "./Health";

export type HealthHistory = HealEvent | WoundEvent;

export interface ResourcesHistory {
  willpower: ResourceHistory<Human["willpower"]>[];
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
  return sortedHealthHistory.reduce<Wounds>((accum, change) => {
    if (change.effect.type === "heal") {
      if (!change.effect.value) {
        return accum;
      }
      return healHumanHealth([...healthLevels], accum, change.effect);
    }
    if (change.effect.type === "wound") {
      if (!change.effect.value) {
        return accum;
      }
      return damageHumanHealth(
        [...healthLevels],
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
  data: Pick<
    Human,
    | "maxWillpower"
    | "resourcesHistory"
    | "willpower"
    | "bodyWounds"
    | "healthLevels"
  >,
): Pick<Human, "willpower" | "bodyWounds"> => {
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
