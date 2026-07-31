import { Select } from "baseComponents/Select";
import { useState } from "react";
import { Button } from "baseComponents/Button";
import styled from "@emotion/styled";
import { ConfirmWindow } from "commonComponents/ConfirmWindow";
import { Dialog } from "commonComponents/Dialog";

const AddButton = styled(Button)`
  padding: 1px;
`;

export const AddElementButton = <ElementName extends string>({
  onAdd,
  notUsedFields,
  addTitle,
  allowDuplicates = false,
}: {
  onAdd: (object: ElementName) => void;
  notUsedFields: { value: ElementName; name: string }[];
  addTitle: string;
  allowDuplicates?: boolean;
}) => {
  const [selectedValue, setSelectedValue] = useState<ElementName | undefined>(
    notUsedFields[0]?.value,
  );

  const [open, setOpen] = useState(false);

  return (
    <>
      {notUsedFields.length > 0 && (
        <AddButton onClick={() => setOpen(true)}>+</AddButton>
      )}

      <Dialog open={open}>
        <ConfirmWindow
          title={addTitle}
          onConfirm={() => {
            if (selectedValue == null) {
              setOpen(false);
              return;
            }

            onAdd(selectedValue);

            // Выбираем следующее доступное поле или сбрасываем в undefined
            const nextAvailable = allowDuplicates
              ? notUsedFields.at(0)
              : notUsedFields
                  .filter(({ value }) => value !== selectedValue)
                  .at(0);

            setSelectedValue(nextAvailable?.value);
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
          onClose={() => setOpen(false)}
        >
          {selectedValue && (
            <Select
              // Для этого селекта options — это список полей (не значений)
              options={notUsedFields}
              value={selectedValue}
              onChange={(field) => {
                setSelectedValue(field);
              }}
              // Важно: Select ожидает value того же типа, что и в options
              // У нас options: { value: Field, name: string }[], значит value=Field
            />
          )}
        </ConfirmWindow>
      </Dialog>
    </>
  );
};
