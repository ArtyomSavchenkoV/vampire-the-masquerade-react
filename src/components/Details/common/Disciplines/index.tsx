import styled from "@emotion/styled";
import { getDefinedEntries } from "utils/object/getDefinedEntries";
import {
  DisciplineLevel as TDisciplineLevel,
  disciplineLevels,
  DisciplineName,
} from "domain/Discipline";
import { FC } from "react";
import { DisciplineLevel } from "./DisciplineLevel";

const Root = styled.div(`
  display: flex;
  gap: 12px;
`);

const Discipline = styled.div(`
  display: flex;
  flex-direction: column;
  gap: 12px; 
`);

const StyledDisciplineLevel = styled(DisciplineLevel)(`
    width: 250px;
    height: 300px;
    overflow: auto;
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
  return (
    <Root>
      {disciplines &&
        getDefinedEntries(disciplines).map(({ key, value: masteredLevel }) => (
          <Discipline key={key}>
            {disciplineLevels.map((level) => (
              <StyledDisciplineLevel
                key={level}
                disciplineName={key}
                disciplineLevel={level}
                isHasBeenMastered={masteredLevel >= level}
              />
            ))}
          </Discipline>
        ))}
      {acquiredDisciplines &&
        getDefinedEntries(acquiredDisciplines).map(
          ({ key, value: masteredLevel }) => (
            <Discipline key={key}>
              {disciplineLevels.map((level) => (
                <StyledDisciplineLevel
                  key={level}
                  disciplineName={key}
                  disciplineLevel={level}
                  isHasBeenMastered={masteredLevel >= level}
                />
              ))}
            </Discipline>
          ),
        )}
    </Root>
  );
};
