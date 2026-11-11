import styled from "@emotion/styled";
import { Children, FC, Fragment, HTMLAttributes, ReactNode } from "react";

const Paragraph = styled.p`
  margin: 0;
  text-indent: 1em;
  overflow-wrap: anywhere;
`;

/** Разбивает смешанных детей (строки + элементы) на абзацы по "\n". */
const splitToParagraphs = (children: ReactNode): ReactNode[][] => {
  const paragraphs: ReactNode[][] = [];
  let current: ReactNode[] = [];

  const flush = () => {
    if (current.length > 0) {
      paragraphs.push(current);
    }
    current = [];
  };

  Children.toArray(children).forEach((child) => {
    if (typeof child === "string") {
      const parts = child.split("\n");
      parts.forEach((part, index) => {
        if (index > 0) flush();
        if (part.length > 0) current.push(part);
      });
    } else {
      // элементы (например, <b> или <Reference>) остаются в текущем абзаце
      current.push(child);
    }
  });

  flush();
  return paragraphs;
};

interface IProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Разбивает содержимое на абзацы по "\n".
 */
export const Text: FC<IProps> = ({ children, ...props }) => {
  const paragraphs = splitToParagraphs(children);

  return (
    <div {...props}>
      {paragraphs.map((nodes, paragraphIndex) => (
        <Paragraph key={paragraphIndex}>
          {nodes.map((node, nodeIndex) => (
            <Fragment key={nodeIndex}>{node}</Fragment>
          ))}
        </Paragraph>
      ))}
    </div>
  );
};
