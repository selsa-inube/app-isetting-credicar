import {
  MdCreditCard,
  MdOutlineFeed,
  MdOutlineHandshake,
  MdOutlinePayments,
} from "react-icons/md";
import { ICardData } from "@ptypes/home/ICardData";

const mainCards: ICardData[] = [
  {
    publicCode: "Líneas de Crédito",
    icon: <MdOutlinePayments />,
    url: "/credit-lines",
  },
  {
    publicCode: "Destinos de dinero",
    icon: <MdCreditCard />,
    url: "/money-destination",
  },
  {
    publicCode: "Nóminas de convenio",
    icon: <MdOutlineHandshake />,
    url: "/payroll-agreement",
  },
  {
    publicCode: "Politicas generales de credito",
    icon: <MdOutlineFeed />,
    url: "/general-credit-policies",
  },
];

export { mainCards };
