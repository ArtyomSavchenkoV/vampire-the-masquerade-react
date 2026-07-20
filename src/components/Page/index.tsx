import { FC, HTMLAttributes } from "react";
import styled from "@emotion/styled";
import { Header } from "./Header";
import useTranslate from "services/translate/useTranslate";

const PageRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderRoot = styled(Header)`
  flex: none;
`;

const ContentRoot = styled.div`
  flex: 1;
`;

interface TProps extends HTMLAttributes<HTMLDivElement> {}

export const Page: FC<TProps> = () => {
  const { translate } = useTranslate();

  return (
    <PageRoot>
      <HeaderRoot />
      <ContentRoot>{translate("content")}</ContentRoot>
    </PageRoot>
  );
};
