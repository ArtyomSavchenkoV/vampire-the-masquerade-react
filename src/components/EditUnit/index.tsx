import { Dialog } from "commonComponents/Dialog";
import { ComponentProps, FC, memo, useState } from "react";
import { IconButton } from "baseComponents/IconButton";
import { PaperPath } from "icons/PaperPath";
import { InlineIcon } from "icons/InlineIcon";
import { useEditUnitSelector } from "./selectors";
import { EditKindredWindow } from "./EditKindredWindow";
import { EditGhoulWindow } from "./EditGhoulWindow";
import { EditHumanWindow } from "./EditHumanWindow";
import { EditCreatureWindow } from "./EditCreatureWindow";

interface TProps extends Omit<
  ComponentProps<typeof IconButton>,
  "onClick" | "children"
> {
  unitId: string;
}

export const EditUnit: FC<TProps> = memo(({ unitId, ...props }) => {
  const [open, setOpen] = useState(false);
  const { unitType } = useEditUnitSelector(unitId);

  return (
    <>
      <IconButton
        onClick={() => {
          setOpen(true);
        }}
        {...props}
      >
        <InlineIcon>
          <PaperPath />
        </InlineIcon>
      </IconButton>

      <Dialog open={open}>
        {unitType === "kindred" && (
          <EditKindredWindow
            kindredId={unitId}
            onClose={() => setOpen(false)}
            onSuccess={() => setOpen(false)}
          />
        )}
        {unitType === "ghoul" && (
          <EditGhoulWindow
            ghoulId={unitId}
            onClose={() => setOpen(false)}
            onSuccess={() => setOpen(false)}
          />
        )}
        {unitType === "human" && (
          <EditHumanWindow
            humanId={unitId}
            onClose={() => setOpen(false)}
            onSuccess={() => setOpen(false)}
          />
        )}
        {unitType === "creature" && (
          <EditCreatureWindow
            creatureId={unitId}
            onClose={() => setOpen(false)}
            onSuccess={() => setOpen(false)}
          />
        )}
      </Dialog>
    </>
  );
});
