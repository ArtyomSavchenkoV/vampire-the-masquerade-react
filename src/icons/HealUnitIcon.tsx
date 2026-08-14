import { ComponentProps, FC } from "react";
import { InlineIcon } from "./InlineIcon";
import { AddPath } from "./AddPath";

interface TProps extends Omit<ComponentProps<typeof InlineIcon>, "children"> {}
export const HealUnitIcon: FC<TProps> = ({ ...props }) => {
  return (
    <InlineIcon {...props}>
      {/* Чаша */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="								
          M22 7 Q12 16 2 7Z          
        "
      />
      {/* Ножка */}
      <path
        stroke="currentColor"
        fill="none"
        strokeWidth={2}
        strokeLinecap="butt"
        fillRule="evenodd"
        clipRule="evenodd"
        d="								
          M12 9 V22          
        "
      />
      {/* Основание */}
      <path
        stroke="currentColor"
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        fillRule="evenodd"
        clipRule="evenodd"
        d="								
          M8 22 H16          
        "
      />
      {/* Змейка тело */}
      <path
        stroke="currentColor"
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        fillRule="evenodd"
        clipRule="evenodd"
        d="
          M12 22 
          Q5 20.5 12 19 
          Q19 17.5 12 16 
          Q5 14.5 12 12        
          Q 26 4.5 13 3.5
        "
      />
      {/* Змейка голова */}
      <path
        fill="currentColor"
        strokeLinecap="round"
        d="
          M9 5.5 A0.5 0.5 0 0 1 8.2 4 Q9.5 2.2 11.5 2 A1 1 0 0 1 13 5 Z
        "
      />
      <AddPath />
    </InlineIcon>
  );
};
