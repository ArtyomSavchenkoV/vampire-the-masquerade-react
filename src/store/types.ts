import { Creature } from "domain/creature/Creature";
import { Ghoul } from "domain/ghoul/Ghoul";
import { Human } from "domain/human/Human";
import { Kindred } from "domain/kindred/Kindred";
import { StoreUnitEntry } from "domain/StoreUnitEntry";

/**
 * Объединённый тип для всех типов игровых сущностей (юнитов) в сцене.
 * Позволяет хранить Kindred, Human и Creature в единой структуре с явным указанием типа.
 */
export type CommonUnitEntry =
  /** Сородич (вампир) — основная игровая роль в V20 */
  | StoreUnitEntry<"kindred", Kindred>
  /** Человек — второстепенные персонажи, NPC без сверхъестественных сил */
  | StoreUnitEntry<"ghoul", Ghoul>
  /** Человек — второстепенные персонажи, NPC без сверхъестественных сил */
  | StoreUnitEntry<"human", Human>
  /** Существо — животные, монстры и прочие не‑разумные или иные сущности (например, медведь, крыса) */
  | StoreUnitEntry<"creature", Creature>;

/**
 * Состояние стора для управления юнитами в сцене.
 */
export interface State {
  /** База всех зарегистрированных юнитов, проиндексированная по ID */
  units: Record<string, CommonUnitEntry>;
  /** Список ID юнитов, участвующих в текущей сцене */
  sceneUnits: { id: string; initiative: number | null }[];
  /** ID юнита, который сейчас выбран (отображается в карточке персонажа) */
  selectedUnitId: string | null;
}

/**
 * Набор экшенов для изменения состояния стора.
 */
export interface Actions {
  /** Сброс стора */
  setStoreState: (state: State) => void;
  /** Перезаписывает юниты новым объектом */
  changeUnits: (units: Record<string, CommonUnitEntry>) => void;
  /** Добавляет юнита в хранилище по уникальному ID */
  addUnit: (id: string, entry: CommonUnitEntry) => void;
  /** Удаляет юнита из хранилища и очищает связанные данные (сцена, фокус) */
  removeUnit: (id: string) => void;
  /** Изменяет заметки */
  editNotes: (id: string, notes: string) => void;
  /** Изменяет юнита в хранилище по уникальному ID */
  editKindred: (id: string, unit: Kindred) => void;
  editGhoul: (id: string, unit: Ghoul) => void;
  editHuman: (id: string, unit: Human) => void;
  editCreature: (id: string, unit: Creature) => void;

  // Сцена: управление списком участников сцены
  /** Добавляет юнита в сцену (если его там ещё нет) */
  addToScene: (id: string) => void;
  /** Удаляет юнита из сцены */
  removeFromScene: (id: string) => void;
  /** Задать инициативу */
  setInitiative: (props: { id: string; initiative: number | null }) => void;
  /** Сортирует участников по инициативе */
  sortSceneByInitiative: () => void;

  // Управление отображаемой карточкой персонажа
  /** Выбирает или снимает выбор персонажа */
  selectUnit: (id: string | null) => void;
}

/**
 * Полный интерфейс стора: состояние плюс набор экшенов.
 */
export interface Store extends State {
  actions: Actions;
}
