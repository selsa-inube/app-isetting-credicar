import { MdOutlineReportProblem } from "react-icons/md";

const errorModal = (description: string) => {
  return {
    title: "Importante",
    description: description,
    actionText: "Entendido",
    icon: <MdOutlineReportProblem />,
  };
};
export { errorModal };
