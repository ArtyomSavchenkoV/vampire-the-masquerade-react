import styled from "@emotion/styled";
import {
  HealthLevelData,
  HealthLevelName,
  Wounds as TWounds,
} from "domain/Health";
import { useOnElementResize } from "hooks/useOnElementResize";
import { AggravatedIcon } from "icons/AggravatedIcon";
import { BashingIcon } from "icons/BashingIcon";
import { HitBoxIcon } from "icons/HitBoxIcon";
import { LethalIcon } from "icons/LethalIcon";
import { FC, HTMLAttributes, useMemo, useRef, useState } from "react";
import { chunkArray } from "utils/array/chunkArray";

const TEN_ELEMS = 10;
const FIVE_ELEMS = 5;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  font-size: 1.33em;
`;

const Row = styled.div<{ align: "left" | "center" | "right" }>(
  ({ align }) => `
  display: flex;
  gap: 4px;
  justify-content: ${align};
`,
);

const Colored = styled.div<{ healthLevelName: HealthLevelName }>(
  ({ healthLevelName }) => `
  color: ${(healthLevelName === "incapacitated" && "orange") || (healthLevelName === "final" && "red") || "initial"};
`,
);

interface TProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  wounds: TWounds;
  healthLevels: Readonly<HealthLevelData[]>;
  align?: "left" | "center" | "right";
}
export const Wounds: FC<TProps> = ({
  wounds,
  healthLevels,
  align = "center",
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isSmallElement, setIsSmallElement] = useState(false);
  useOnElementResize({
    elementRef: ref,
    onResize: (size) =>
      setIsSmallElement(size.width < 21.5 * TEN_ELEMS + 4 * (TEN_ELEMS - 1)),
  });

  const woundsLevels = healthLevels
    .filter((healthLevel) => healthLevel.name !== "unimpaired")
    .map((healthLevel, i) => ({
      healthLevelName: healthLevel.name,
      wound: i < wounds.length ? wounds[i] : null,
    }));

  const chunkArr = useMemo(
    () => chunkArray(woundsLevels, isSmallElement ? FIVE_ELEMS : TEN_ELEMS),
    [woundsLevels, isSmallElement],
  );

  return (
    <Root ref={ref} {...props}>
      {chunkArr.map((chunk, i) => (
        <Row key={i} align={align}>
          {chunk.map((option, j) => (
            <Colored healthLevelName={option.healthLevelName}>
              {(option.wound === "bashing" && <BashingIcon key={j} />) ||
                (option.wound === "lethal" && <LethalIcon key={j} />) ||
                (option.wound === "aggravated" && (
                  <AggravatedIcon key={j} />
                )) || <HitBoxIcon key={j} />}
            </Colored>
          ))}
        </Row>
      ))}
    </Root>
  );
};
