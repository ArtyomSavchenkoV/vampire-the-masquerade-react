import { Kindred } from "domain/kindred/Kindred";
import { FC } from "react";

interface TProps {
  kindred: Kindred;
  onChange: (kindred: Kindred) => void;
}

export const EditKindredForm: FC<TProps> = ({}) => {
  return <div>EditKindredForm</div>;
};
