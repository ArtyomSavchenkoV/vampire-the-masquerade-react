import { AddElementButton } from "./AddElementButton";
import { RemoveElementButton } from "./RemoveElementButton";
import { ArrayEditorRow } from "./ArrayEditorRow";

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
          <ArrayEditorRow
            key={allowDuplicates ? index : key}
            removeButton={
              <RemoveElementButton
                onClick={() => {
                  // Удаляем строго по индексу — безопасно даже при дублях
                  const nextArray = [...array];
                  nextArray.splice(index, 1);
                  onChange(nextArray);
                }}
              />
            }
          >
            {name}
          </ArrayEditorRow>
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
