import { InputHTMLAttributes } from "react";
import { SelectOption } from "./SelectOption";

interface TProps extends Omit<
  InputHTMLAttributes<HTMLSelectElement>,
  "value" | "onChange" | "children"
> {}

export const Select = <T extends string | number>({
  value,
  options,
  onChange,
  ...props
}: {
  value: T;
  options: readonly (T | { value: T; name: string })[];
  onChange: (value: T) => void;
} & TProps) => {
  // Нормализуем options один раз, чтобы не делать проверки типов в map
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === "object") {
      return { value: opt.value, name: opt.name };
    }
    return { value: opt, name: String(opt) };
  });

  // Для DOM всегда нужна строка
  const stringValue = String(value);

  return (
    <select
      value={stringValue}
      onChange={(event) => {
        const rawValue = event.target.value;

        // Конвертируем обратно в нужный тип T
        // Если T — number, парсим; если string — оставляем как есть
        const typedValue =
          typeof value === "number" ? Number(rawValue) : rawValue;

        // Не блокируем onChange: пусть стор решает, валидно ли значение
        onChange(typedValue as T);
      }}
      {...props}
    >
      {normalizedOptions.map(({ value: optValue, name }) => (
        <SelectOption key={String(optValue)} value={String(optValue)}>
          {name}
        </SelectOption>
      ))}
    </select>
  );
};
