import { DamageType } from "./Damage";
import { WoundType } from "./Wound";

export type DamageToWoundMap = Record<DamageType, WoundType | null>;
