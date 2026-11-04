import { ComponentProps, FC } from "react";
import { TitleText as BaseTitleText } from "commonComponents/TitleText";

interface IProps extends ComponentProps<typeof BaseTitleText> {}
export const TitleText: FC<IProps> = ({ ...props }) => {
  return (
    <BaseTitleText
      {...props}
      gridTemplateColumnsOnNormal="1fr 125px"
      smallSize={260}
    />
  );
};
