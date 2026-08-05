import { TitleText } from "./TitleText";
import { AddElementButton } from "./editPersonForm/AddElementButton";
import { RemoveElementButton } from "./editPersonForm/RemoveElementButton";

export const ArrayEditor = <Value extends string>({
  array,
  onChange,
  options,
  addTitle,
  allowDuplicates = false,
  isOverflow = false,
}: {
  array: Value[];
  onChange: (array: Value[]) => void;
  options: { value: Value; name: string }[];
  addTitle: string;
  allowDuplicates?: boolean;
  isOverflow?: boolean;
}) => {
  // Поля, которые ещё не добавлены
  const notUsedFields = allowDuplicates
    ? options
    : options.filter(({ value }) => !array.some((el) => el === value));

  return (
    <>
      {array.map((key, index) => {
        const option = options.find((el) => el.value === key);
        const name = option?.name;
        return (
          <TitleText key={allowDuplicates ? index : key} title={name}>
            <RemoveElementButton
              onClick={() => {
                // Удаляем строго по индексу — безопасно даже при дублях
                const nextArray = [...array];
                nextArray.splice(index, 1);
                onChange(nextArray);
              }}
            />
          </TitleText>
        );
      })}

      {!isOverflow && (
        <AddElementButton
          onAdd={(selectedValue) => onChange([...array, selectedValue])}
          notUsedFields={notUsedFields}
          addTitle={addTitle}
          allowDuplicates={allowDuplicates}
        />
      )}
    </>
  );
};
