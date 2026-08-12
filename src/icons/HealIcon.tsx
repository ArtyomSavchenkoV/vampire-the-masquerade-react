import { ComponentProps, FC } from "react";
import { InlineIcon } from "./InlineIcon";
import AddPath from "./AddPath";

interface TProps extends Omit<ComponentProps<typeof InlineIcon>, "children"> {}
export const HealIcon: FC<TProps> = ({ ...props }) => {
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

/**
      <path
        stroke="red"
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        fillRule="evenodd"
        clipRule="evenodd"
        d="								
          M12 22 
          Q5 20.5 12 19 
          Q19 17.5 12 16 
          Q5 14.5 12 13        
          Q17 12 18 8
          Q22 -1 15 3 
        "
      />
      <path
        stroke="currentColor"
        fill="red"
        strokeWidth={1.5}
        strokeLinecap="round"
        d="M15 6 C14 5 13.5 3.5 14.5 2.5 C15.5 1.5 17 2 16.5 3 C16 4 15.5 4.5 15 5 L14.5 5.5 Z"
      />
 */

/*

            <path
        fill="currentColor"
        strokeLinecap="round"
        d="
          M9 6 A0.5 0.5 0 0 1 8.2 4.5 Q9.5 2.7 11.5 2.5 A1 1 0 0 1 13 5.5 Z
        "
      />*/
