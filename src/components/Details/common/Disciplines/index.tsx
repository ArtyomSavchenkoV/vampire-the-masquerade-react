import styled from "@emotion/styled";
import { getDefinedEntries } from "utils/object/getDefinedEntries";
import {
  DisciplineLevel as TDisciplineLevel,
  disciplineLevels,
  DisciplineName,
} from "domain/Discipline";
import { FC } from "react";
import { DisciplineLevel } from "commonComponents/DisciplineLevel";
import { Card } from "baseComponents/Card";
import { DetailsSectionTitle } from "commonComponents/DetailsSectionTitle";
import useTranslate from "services/translate/useTranslate";
import { Reference } from "components/Reference";

const Root = styled.div(`
  display: flex;
  gap: 12px;
`);

const Discipline = styled.div(`
  display: flex;
  flex-direction: column;
  gap: 12px; 
`);

const DisciplineLevelRoot = styled(Card)<{ isNotMastered: boolean }>(
  ({ isNotMastered }) => `
    width: 270px;
    height: 360px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 4px;
    ${isNotMastered ? "opacity: .5; background-color: #eee;" : ""}
  `,
);

const Name = styled(DetailsSectionTitle)(`
  font-size: 1em;
`);

interface TProps {
  disciplines?: Partial<Record<DisciplineName, TDisciplineLevel>>;
  /** Обретённые дисциплины */
  acquiredDisciplines?: Partial<Record<DisciplineName, TDisciplineLevel>>;
}
export const Disciplines: FC<TProps> = ({
  disciplines,
  acquiredDisciplines,
}) => {
  const { translate } = useTranslate();
  return (
    <Root>
      {disciplines &&
        getDefinedEntries(disciplines).map(({ key, value: masteredLevel }) => (
          <Discipline key={key}>
            {disciplineLevels.map((level) => (
              <DisciplineLevelRoot
                key={level}
                isNotMastered={masteredLevel < level}
              >
                {/* Название */}
                <Name>
                  {translate(`disciplines.${key}.levels.${level}.name`)}
                  <> </>
                  <Reference
                    reference={{
                      type: "disciplineLevel",
                      discipline: key,
                      level,
                    }}
                  >
                    ( i )
                  </Reference>
                </Name>
                <DisciplineLevel disciplineName={key} disciplineLevel={level} />
              </DisciplineLevelRoot>
            ))}
          </Discipline>
        ))}
      {acquiredDisciplines &&
        getDefinedEntries(acquiredDisciplines).map(
          ({ key, value: masteredLevel }) => (
            <Discipline key={key}>
              {disciplineLevels.map((level) => (
                <DisciplineLevelRoot
                  key={level}
                  isNotMastered={masteredLevel < level}
                >
                  {/* Название */}
                  <Name>
                    {translate(`disciplines.${key}.levels.${level}.name`)}
                    <> </>
                    <Reference
                      reference={{
                        type: "disciplineLevel",
                        discipline: key,
                        level,
                      }}
                    >
                      ( i )
                    </Reference>
                  </Name>
                  <DisciplineLevel
                    disciplineName={key}
                    disciplineLevel={level}
                  />
                </DisciplineLevelRoot>
              ))}
            </Discipline>
          ),
        )}
    </Root>
  );
};
