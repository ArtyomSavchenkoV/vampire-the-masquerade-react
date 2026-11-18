interface TLocalStorage {
  themeVariant: "light" | "dark";
  store: unknown;
}

export type TLocalStorageKey = keyof TLocalStorage;

const initialLocalStorage: TLocalStorage = {
  themeVariant: "light",
  store: undefined,
};

export const getLocalStorageValue = <TKey extends TLocalStorageKey>(
  key: TKey,
): TLocalStorage[TKey] => {
  const saved = localStorage.getItem(key);
  try {
    return saved ? JSON.parse(saved) : initialLocalStorage[key];
  } catch (e) {
    console.error("Не верный формат танных в localStorage. Ожидается JSON");
    return initialLocalStorage[key];
  }
};

export const setLocalStorageValue = <TKey extends TLocalStorageKey>(
  key: TKey,
  value: TLocalStorage[TKey],
) => {
  localStorage.setItem(key, JSON.stringify(value));
};
