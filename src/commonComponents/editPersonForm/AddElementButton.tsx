import { useEffect, useState } from "react";
import { Button } from "baseComponents/Button";
import styled from "@emotion/styled";
import { ConfirmWindow } from "commonComponents/ConfirmWindow";
import { Dialog } from "commonComponents/Dialog";

const AddButton = styled(Button)`
  padding: 1px;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AddElementButton = <ElementName extends string>({
  onAdd,
  notUsedFields,
  addTitle,
}: {
  onAdd: (object: ElementName) => void;
  notUsedFields: { value: ElementName; name: string }[];
  addTitle: string;
  allowDuplicates?: boolean;
  selectSize?: number;
}) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (notUsedFields.length === 0) {
      setOpen(false);
    }
  }, [notUsedFields.length]);

  return (
    <>
      {notUsedFields.length > 0 && (
        <AddButton onClick={() => setOpen(true)}>+</AddButton>
      )}

      <Dialog open={open}>
        <ConfirmWindow title={addTitle} onClose={() => setOpen(false)}>
          <Options>
            {notUsedFields.map(({ value, name }) => (
              <Button
                key={value}
                onClick={() => {
                  onAdd(value);
                }}
              >
                {name}
              </Button>
            ))}
          </Options>
        </ConfirmWindow>
      </Dialog>
    </>
  );
};
