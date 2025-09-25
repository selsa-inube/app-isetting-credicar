import {
  MdOutlineBeachAccess,
  MdDirectionsCar,
  MdHandyman,
  MdCreditCard,
  MdAndroid,
} from "react-icons/md";
import { IconWithText } from "@design/data/iconWithText";

const dataMoneyDestination = [
  {
    id: "1",
    abbreviatedName: (
      <IconWithText
        withIconBefore
        icon={<MdOutlineBeachAccess size={16} />}
        text="Vacaciones"
      />
    ),
    descriptionUse:
      "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: "2",
    abbreviatedName: (
      <IconWithText
        withIconBefore
        icon={<MdDirectionsCar size={16} />}
        text="Vehículo"
      />
    ),
    descriptionUse:
      "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: "3",
    abbreviatedName: (
      <IconWithText
        withIconBefore
        icon={<MdCreditCard size={16} />}
        text="Credito personal"
      />
    ),
    descriptionUse:
      "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: "4",
    abbreviatedName: (
      <IconWithText
        withIconBefore
        icon={<MdAndroid size={16} />}
        text="Libre inversión"
      />
    ),
    descriptionUse:
      "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: "5",
    abbreviatedName: (
      <IconWithText
        withIconBefore
        icon={<MdHandyman size={16} />}
        text="Lorem ipsum sopdm"
      />
    ),
    descriptionUse:
      "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
];

export { dataMoneyDestination };
