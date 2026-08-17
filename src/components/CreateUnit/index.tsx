import styled from "@emotion/styled";
import { Select } from "baseComponents/Select";
import { ConfirmWindow } from "commonComponents/ConfirmWindow";
import { EditCreatureForm } from "commonComponents/editUnitForms/EditCreatureForm";
import { EditGhoulForm } from "commonComponents/editUnitForms/EditGhoulForm";
import { EditHumanForm } from "commonComponents/editUnitForms/EditHumanForm";
import { EditKindredForm } from "commonComponents/editUnitForms/EditKindredForm";
import { clanes } from "data/clanes";
import { initialCreature } from "data/initialCreature";
import { initialGhoul } from "data/initialGhoul";
import { initialHuman } from "data/initialHuman";
import { initialKindred } from "data/initialKindred";
import { ClanName, clanNames } from "domain/Clan";
import { Creature } from "domain/creature/Creature";
import { Ghoul } from "domain/ghoul/Ghoul";
import { Human } from "domain/human/Human";
import { Kindred } from "domain/kindred/Kindred";
import { UnitType, unitTypes } from "domain/UnitType";
import { FC, useState } from "react";
import useTranslate from "services/translate/useTranslate";
import { useActions } from "store/selectors";
import { v4 as uuidV4 } from "uuid";

const FormTitle = styled.div`
  font-size: 1.5em;
  text-align: center;
`;

const INITIAL_CLAN: ClanName = "Gangrel";

interface TProps {
  onClose: () => void;
}

export const CreateUnit: FC<TProps> = ({ onClose }) => {
  const { translate } = useTranslate();
  const { addUnit } = useActions();
  const [unitType, setUnitType] = useState<UnitType>("kindred");
  const [isUnitTypeSelected, setIsUnitTypeSelected] = useState(false);

  const [clan, setClan] = useState<ClanName>(INITIAL_CLAN);
  const [isClanSelected, setIsClanSelected] = useState(false);

  // Данные форм
  const [kindred, setKindred] = useState<Kindred>({
    ...initialKindred,
    clan: clanes[INITIAL_CLAN],
  });
  const [ghoul, setGhoul] = useState<Ghoul>(initialGhoul);
  const [human, setHuman] = useState<Human>(initialHuman);
  const [creature, setCreature] = useState<Creature>(initialCreature);

  const changeClanHandler = (clanName: ClanName) => {
    setClan(clanName);
    setKindred({
      ...initialKindred,
      clan: clanes[clanName],
    });
  };

  return (
    <ConfirmWindow
      title={translate("createUnit.title")}
      onConfirm={() => {
        if (!isUnitTypeSelected) {
          setIsUnitTypeSelected(true);
          return;
        }
        if (!isClanSelected && unitType === "kindred") {
          setIsClanSelected(true);
          return;
        }
        if (isClanSelected) {
          addUnit(uuidV4(), {
            type: "kindred",
            unit: kindred,
            notes: "",
          });
          onClose();
          return;
        }
        if (isUnitTypeSelected && unitType === "ghoul") {
          addUnit(uuidV4(), {
            type: "ghoul",
            unit: ghoul,
            notes: "",
          });
          onClose();
          return;
        }
        if (isUnitTypeSelected && unitType === "human") {
          addUnit(uuidV4(), {
            type: "human",
            unit: human,
            notes: "",
          });
          onClose();
          return;
        }
        if (isUnitTypeSelected && unitType === "creature") {
          addUnit(uuidV4(), {
            type: "creature",
            unit: creature,
            notes: "",
          });
          onClose();
          return;
        }
      }}
      onCancel={() => {
        if (isClanSelected) {
          setIsClanSelected(false);
          return;
        }
        if (isUnitTypeSelected) {
          setIsUnitTypeSelected(false);
          return;
        }
        onClose();
      }}
      onClose={onClose}
    >
      {/* 1 шаг - выбор типа */}
      {!isUnitTypeSelected && (
        <>
          <div>{translate("createUnit.selectUnitType")}</div>
          <Select
            options={unitTypes.map((unitType) => ({
              value: unitType,
              name: translate(`unitTypes.${unitType}`),
            }))}
            value={unitType}
            onChange={(unitType) => setUnitType(unitType)}
            size={4}
          />
        </>
      )}
      {/* 2 шаг (опционально) - выбор клана */}
      {!isClanSelected && isUnitTypeSelected && unitType === "kindred" && (
        <>
          <div>{translate("createUnit.selectClan")}</div>
          <Select
            options={clanNames.map((clanName) => ({
              value: clanName,
              name: translate(`clanes.${clanName}.name`),
            }))}
            value={clan}
            onChange={changeClanHandler}
            size={7}
          />
        </>
      )}
      {/* 3 шаг - открытие формы под определённый тип */}
      {isClanSelected && (
        <>
          <FormTitle>{translate("createUnit.editKindred")}</FormTitle>
          <EditKindredForm
            kindred={kindred}
            onChange={setKindred}
            onClanChange={changeClanHandler}
          />
        </>
      )}
      {isUnitTypeSelected && unitType === "ghoul" && (
        <>
          <FormTitle>{translate("createUnit.editGhoul")}</FormTitle>
          <EditGhoulForm ghoul={ghoul} onChange={setGhoul} />
        </>
      )}
      {isUnitTypeSelected && unitType === "human" && (
        <>
          <FormTitle>{translate("createUnit.editHuman")}</FormTitle>
          <EditHumanForm human={human} onChange={setHuman} />
        </>
      )}
      {isUnitTypeSelected && unitType === "creature" && (
        <>
          <FormTitle>{translate("createUnit.editCreature")}</FormTitle>
          <EditCreatureForm creature={creature} onChange={setCreature} />
        </>
      )}
    </ConfirmWindow>
  );
};
