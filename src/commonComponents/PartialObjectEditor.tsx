import { getDefinedEntries } from "utils/getDefinedEntries";
import { TitleText } from "./TitleText";
import { AddElementButton } from "./editPersonForm/AddElementButton";
import { RemoveElementButton } from "./editPersonForm/RemoveElementButton";
import styled from "@emotion/styled";
import { WithoutBorderSelect } from "./WithoutBorderSelect";

const TrashButton = styled(RemoveElementButton)`
  margin-left: 4px;
`;

export const PartialObjectEditor = <
  Field extends string,
  Value extends number,
>({
  object,
  onChange,
  options,
  availableValues,
  addTitle,
  deleteTitle,
  isObjectFixed = false,
}: {
  object: Partial<Record<Field, Value>>;
  onChange: (object: Partial<Record<Field, Value>>) => void;
  options: { value: Field; name: string }[];
  availableValues: readonly (Value | { value: Value; name: string })[];
  addTitle: string;
  deleteTitle: string;
  isObjectFixed?: boolean;
}) => {
  const array = getDefinedEntries(object);
  const normalizedAvailableValues = availableValues.map((el) =>
    typeof el === "object" ? el : { value: el, name: String(el) },
  );

  // Поля, которые ещё не добавлены
  const notUsedFields = options.filter(
    ({ value }) => !array.some((el) => el.key === value),
  );

  return (
    <>
      {array.map(({ key, value }) => {
        const option = options.find((el) => el.value === key);
        const name = option?.name;
        return (
          <TitleText key={key} title={name}>
            <WithoutBorderSelect
              options={normalizedAvailableValues}
              value={value}
              onChange={(newValue) => {
                const newObject = { ...object };
                newObject[key] = newValue;
                onChange(newObject);
              }}
            />

            {!isObjectFixed && (
              <TrashButton
                onDelete={() => {
                  const nextObject = { ...object };
                  delete nextObject[key];
                  onChange(nextObject);
                }}
                deleteTitle={deleteTitle}
                deleteDescription={name}
              />
            )}
          </TitleText>
        );
      })}

      {!isObjectFixed && (
        <AddElementButton
          onAdd={(selectedValue) =>
            onChange({
              ...object,
              [selectedValue]: normalizedAvailableValues[0].value,
            })
          }
          notUsedFields={notUsedFields}
          addTitle={addTitle}
        />
      )}
    </>
  );
};
