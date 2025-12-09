import { MdOutlineReport } from "react-icons/md";

const errorModal = (description: string, fixError?: string) => {
  return {
    title: "Error",
    description: description,
    actionText: "Entendido",
    icon: <MdOutlineReport />,
    moreDetails: fixError
      ? `Cómo solucionarlo: ${fixError}`
      : "Cómo solucionarlo: Por favor contacte a su operador",
  };
};
export { errorModal };
