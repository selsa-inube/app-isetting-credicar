import { IRequestSteps } from "@design/modals/requestProcessModal/types";

const requestStepsInitial: IRequestSteps[] = [
  { name: "Solicitud radicada", status: "pending" },
  { name: "Agregando", status: "pending" },
  { name: "Solicitud agregada", status: "pending" },
];

export { requestStepsInitial };
