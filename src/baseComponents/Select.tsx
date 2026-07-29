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
  options: { value: T; name: string }[];
  onChange: (value: T) => void;
} & TProps) => {
  return (
    <select
      // Для DOM всегда строка — избегаем мерцания и предупреждений
      value={String(value)}
      onChange={(event) => {
        const rawValue = event.target.value; // всегда строка

        // Конвертируем обратно в нужный тип
        const typedValue: T =
          typeof value === "number" ? (Number(rawValue) as T) : (rawValue as T);

        // Строгая валидация: значение должно точно совпадать с одним из options
        const isValid = options.some((opt) => opt.value === typedValue);

        if (!isValid) {
          console.warn(
            "Выбрано недопустимое значение",
            typedValue,
            "из",
            options,
          );
          return;
        }

        onChange(typedValue);
      }}
      {...props}
    >
      {options.map((optionData) => (
        <SelectOption
          key={String(optionData.value)} // ключ всегда строка
          value={String(optionData.value)} // value в HTML всегда строка
        >
          {optionData.name}
        </SelectOption>
      ))}
    </select>
  );
};
