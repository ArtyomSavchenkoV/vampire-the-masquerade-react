import { FC, ReactNode, useCallback } from "react";
import styled from "@emotion/styled";
import { createPortal } from "react-dom";

const PADDING = 24 as const;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Window = styled.div`
  max-width: calc(100% - ${PADDING * 2}px);
  max-height: calc(100% - ${PADDING * 2}px);
`;

interface TProps {
  children: ReactNode;
  open: boolean;
  onClose?: () => void;
}

export const Dialog: FC<TProps> = ({ children, open, onClose }) => {
  const handleOverlayClick = useCallback(
    (ev: React.MouseEvent) => {
      // Закрываем только если клик был прямо по оверлею (не по окну)
      if (onClose && ev.target === ev.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  return open
    ? createPortal(
        <Overlay onClick={handleOverlayClick}>
          <Window>{children}</Window>
        </Overlay>,
        document.body,
      )
    : null;
};
