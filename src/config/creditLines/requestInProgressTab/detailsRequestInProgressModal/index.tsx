import { MdCheck, MdOutlineRemoveRedEye } from "react-icons/md";

const detailsRequestInProgressModal = {
  title: "Detalles de solicitud",
  labelActionButton: "Más detalles",
  labelCloseButton: "Cerrar",
  labelCloseModal: "Cerrar",
  labelThirdButton: "Aprobar",
  iconBeforeButton: <MdOutlineRemoveRedEye />,
  iconApprovalButton: <MdCheck />,
  labelRequest: "Solicitud",
  labelsTraceability: "Trazabilidad",
  errorTitle: "Error presentado en la solicitud",
  withoutError: "No fue posible obtener el error presentado",
};

export { detailsRequestInProgressModal };
