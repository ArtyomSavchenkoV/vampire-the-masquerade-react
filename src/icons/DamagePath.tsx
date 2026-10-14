import { FC } from "react";

interface IProps {}
export const DamagePath: FC<IProps> = () => {
  return (
    <>
      {/* Клинок */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="								
          M 4.7 15.05 Q 9.7 6.39 13.5 2.81 Q 12.3 7.89 7.3 16.55 Z   
          M 6.87 16.3 Q 5.8 19.15 3.87 21.5 L 2.13 20.5 Q 3.2 17.65 5.13 15.3 Z
        "
      />
      <path
        stroke="currentColor"
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        fillRule="evenodd"
        clipRule="evenodd"
        d="								
          M 3.4 14.3 L 8.6 17.3
          M 2.13 20.5 L 3.87 21.5    
        "
      />
      {/* Эмульсия */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="
          M15.5 5.25 Q21 8 20 12 Z
          M21 13 Q22.5 14.5 22.5 15.5 Q22 17 20.5 15.5 Z
        "
      />
    </>
  );
};
