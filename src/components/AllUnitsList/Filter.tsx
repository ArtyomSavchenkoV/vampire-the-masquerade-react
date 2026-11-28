import styled from "@emotion/styled";
import { Button } from "baseComponents/Button";
import { Checkbox } from "baseComponents/Checkbox";
import { Dialog } from "baseComponents/Dialog";
import { DialogWindow } from "baseComponents/DialogWindow";
import { IndeterminateCheckbox } from "baseComponents/IndeterminateCheckbox";
import { clanNames } from "domain/Clan";
import { UnitType, unitTypes } from "domain/UnitType";
import { FC, useState } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions, useUnitsFilterSelector } from "store/selectors";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Group = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 8px;
  border-left: solid 2px ${({ theme }) => theme.palette.divider};
`;

interface TProps {}
export const Filter: FC<TProps> = () => {
  const { translate } = useTranslate();
  const [open, setOpen] = useState(false);
  const filter = useUnitsFilterSelector();
  const { setUnitsFilter } = useActions();

  const availableUnitTypes = unitTypes.filter(
    (type): type is Exclude<UnitType, "kindred"> => type !== "kindred",
  );

  const selectedClans =
    (filter.clans.length === clanNames.length && "checked") ||
    (filter.clans.length === 0 && "unchecked") ||
    "indeterminate";

  const changeSelectedClansHandler = (value: "checked" | "unchecked") => {
    setUnitsFilter({
      ...filter,
      clans: value === "checked" ? [...clanNames] : [],
    });
  };

  const selectedUnits =
    (filter.unitsTypes.length === availableUnitTypes.length &&
      selectedClans === "checked" &&
      "checked") ||
    (filter.unitsTypes.length === 0 &&
      selectedClans === "unchecked" &&
      "unchecked") ||
    "indeterminate";

  const changeSelectedUnitsHandler = (value: "checked" | "unchecked") => {
    setUnitsFilter({
      unitsTypes: value === "checked" ? [...availableUnitTypes] : [],
      clans: value === "checked" ? [...clanNames] : [],
    });
  };

  return (
    <>
      {/* Кнопка */}
      <Button onClick={() => setOpen(true)}>
        {translate("allUnitsList.filter")}
        {selectedUnits !== "checked" && " ( ! )"}
      </Button>

      {/* Окно */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogWindow
          title={translate("allUnitsList.filter")}
          onClose={() => setOpen(false)}
          size="sm"
        >
          <Content>
            <IndeterminateCheckbox
              value={selectedUnits}
              onChange={changeSelectedUnitsHandler}
            >
              {translate("allUnitsList.filterTotal")}
            </IndeterminateCheckbox>
            <Group>
              {availableUnitTypes.map((type) => (
                <Checkbox
                  key={type}
                  onChange={() => {
                    if (filter.unitsTypes.includes(type)) {
                      setUnitsFilter({
                        ...filter,
                        unitsTypes: filter.unitsTypes.filter(
                          (filterUnitType) => filterUnitType !== type,
                        ),
                      });
                    } else {
                      setUnitsFilter({
                        ...filter,
                        unitsTypes: [...filter.unitsTypes, type],
                      });
                    }
                  }}
                  checked={filter.unitsTypes.includes(type)}
                >
                  {translate(`unitTypes.${type}`)}
                </Checkbox>
              ))}
              <IndeterminateCheckbox
                value={selectedClans}
                onChange={changeSelectedClansHandler}
              >
                {translate("unitTypes.kindred")}
              </IndeterminateCheckbox>
              <Group>
                {clanNames.map((clanName) => (
                  <Checkbox
                    key={clanName}
                    onChange={() => {
                      if (filter.clans.includes(clanName)) {
                        setUnitsFilter({
                          ...filter,
                          clans: filter.clans.filter(
                            (filterClanName) => filterClanName !== clanName,
                          ),
                        });
                      } else {
                        setUnitsFilter({
                          ...filter,
                          clans: [...filter.clans, clanName],
                        });
                      }
                    }}
                    checked={filter.clans.includes(clanName)}
                  >
                    {translate(`clanes.${clanName}.name`)}
                  </Checkbox>
                ))}
              </Group>
            </Group>
          </Content>
        </DialogWindow>
      </Dialog>
    </>
  );
};
