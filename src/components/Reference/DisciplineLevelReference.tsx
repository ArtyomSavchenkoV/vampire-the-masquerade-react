import styled from "@emotion/styled";
import { StringButton } from "baseComponents/StringButton";
import { DisciplineLevel } from "commonComponents/DisciplineLevel";
import { TDisciplineLevelReference } from "domain/Reference";
import { ComponentProps, FC } from "react";
import useTranslate from "services/translate/useTranslate";
import { ButtonWindow } from "./ButtonWindow";

const Grid = styled.div(`
  display: flex;
  flex-direction: column;
  gap: 4px;
`);

interface TProps extends ComponentProps<typeof StringButton> {
  reference: TDisciplineLevelReference;
}
/**
 * Отображение текстовой кнопки с окном справки
 */
export const DisciplineLevelReference: FC<TProps> = ({
  reference,
  onClick,
  children,
  ...props
}) => {
  const { translate } = useTranslate();
  return (
    <ButtonWindow
      buttonTitle={children}
      onClick={onClick}
      title={translate(
        `disciplines.${reference.discipline}.levels.${reference.level}.name`,
      )}
      {...props}
    >
      <Grid>
        <DisciplineLevel
          disciplineName={reference.discipline}
          disciplineLevel={reference.level}
        />
      </Grid>
    </ButtonWindow>
  );
};
