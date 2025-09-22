import { ITitle } from "@ptypes/design/table/ITitle";

const titles: ITitle[] = [
  {
    id: "requestDate",
    titleName: "Fecha solicitud",
    priority: 2,
  },
  {
    id: "description",
    titleName: "Descripción solicitud",
    priority: 0,
  },
  {
    id: "requestStatus",
    titleName: "Estado solicitud",
    priority: 1,
  },
];

export { titles };
