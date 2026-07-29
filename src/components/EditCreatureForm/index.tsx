import { Creature } from "domain/creature/Creature";
import { Human } from "domain/human/Human";
import { FC } from "react";

interface TProps {
  creature: Creature;
  onChange: (creature: Creature) => void;
}

export const EditCreatureForm: FC<TProps> = ({}) => {
  return <div>EditCreatureForm</div>;
};
