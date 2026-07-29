import { Human } from "domain/human/Human";
import { FC } from "react";

interface TProps {
  human: Human;
  onChange: (human: Human) => void;
}

export const EditHumanForm: FC<TProps> = ({}) => {
  return <div>EditHumanForm</div>;
};
