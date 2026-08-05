import { FC } from "react";

interface TProps extends React.HTMLAttributes<HTMLTableRowElement> {
  // React+emotion некорректно отрабатывает isSelected в E:\Программирование\Vampire the masquerade\project\src\commonComponents\StyledRow.tsx
  // Поэтому явно его исключаем из пропсов tr
  isSelected?: boolean;
}

export const Tr: FC<TProps> = ({ isSelected: _, ...props }) => {
  return <tr {...props} />;
};
