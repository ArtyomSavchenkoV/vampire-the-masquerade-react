import { Creature } from "domain/creature/Creature";
import { Human } from "domain/human/Human";
import { Kindred } from "domain/kindred/Kindred";

/**
 * Объединённый тип для всех типов игровых сущностей (юнитов) в сцене.
 * Позволяет хранить Kindred, Human и Creature в единой структуре с явным указанием типа.
 */
export type UnitEntry =
  /** Сородич (вампир) — основная игровая роль в V20 */
  | { type: "kindred"; unit: Kindred }
  /** Человек — второстепенные персонажи, NPC без сверхъестественных сил */
  | { type: "human"; unit: Human }
  /** Существо — животные, монстры и прочие не‑разумные или иные сущности (например, медведь, крыса) */
  | { type: "creature"; unit: Creature };

/**
 * Состояние стора для управления юнитами в сцене.
 */
export interface State {
  /** База всех зарегистрированных юнитов, проиндексированная по ID */
  units: Record<string, UnitEntry>;
  /** Список ID юнитов, участвующих в текущей сцене */
  sceneUnits: { id: string; initiative: number | null }[];
  /** ID юнита, который сейчас находится в фокусе (отображается в карточке персонажа) */
  focusedUnitId: string | null;
}

/**
 * Набор экшенов для изменения состояния стора.
 */
export interface Actions {
  /** Сброс стора */
  resetStore: () => void;
  /** Перезаписывает юниты новым объектом */
  changeUnits: (units: Record<string, UnitEntry>) => void;
  /** Добавляет юнита в хранилище по уникальному ID */
  addUnit: (id: string, entry: UnitEntry) => void;
  /** Удаляет юнита из хранилища и очищает связанные данные (сцена, фокус) */
  removeUnit: (id: string) => void;

  // Сцена: управление списком участников сцены
  /** Добавляет юнита в сцену (если его там ещё нет) */
  addToScene: (id: string) => void;
  /** Удаляет юнита из сцены */
  removeFromScene: (id: string) => void;
  /** Задать инициативу */
  setInitiative: (props: { id: string; initiative: number | null }) => void;

  // Фокус: управление отображаемой карточкой персонажа
  /** Устанавливает фокус на юнита по ID либо сбрасывает фокус (null) */
  focusUnit: (id: string | null) => void;
}

/**
 * Полный интерфейс стора: состояние плюс набор экшенов.
 */
export interface Store extends State {
  actions: Actions;
}
