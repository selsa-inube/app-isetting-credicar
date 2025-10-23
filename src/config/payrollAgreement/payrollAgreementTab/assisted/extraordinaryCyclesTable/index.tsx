import { DeleteCyclePayment } from "@pages/payrollAgreement/tabs/payrollAgreementTab/addPayrollAgreement/tools/deleteCyclePayment";
import { IAction } from "@ptypes/design/table/IAction";
import { IEntry } from "@ptypes/design/table/IEntry";
import { ITitle } from "@ptypes/design/table/ITitle";
import { DetailsCycles } from "@pages/payrollAgreement/tabs/payrollAgreementTab/tools/detailsCycles";
import { detailsExtCycle } from "../detailsExtCycle";

const titles: ITitle[] = [
  {
    id: "nameCycle",
    titleName: "Nombre del ciclo",
    priority: 0,
  },
  {
    id: "typePayment",
    titleName: "Tipo de pago del ciclo",
    priority: 1,
  },
  {
    id: "payday",
    titleName: "Día de pago del ciclo",
    priority: 2,
  },
  {
    id: "numberDaysUntilCut",
    titleName: "# de días para el corte",
    priority: 3,
  },
];

const actionsConfig = (
  setEntryDeleted: (value: string | number) => void,
  isMobile: boolean,
) => {
  const actions: IAction[] = [
    {
      id: "delete",
      actionName: "Eliminar",
      content: (entry: IEntry) => (
        <DeleteCyclePayment data={entry} setEntryDeleted={setEntryDeleted} />
      ),
    },
  ];
  if (isMobile) {
    actions.unshift({
      id: "edit",
      actionName: "Editar",
      content: (entry: IEntry) => (
        <DetailsCycles data={entry} detailsCycle={detailsExtCycle} />
      ),
    });
  }

  return actions;
};

const breakPoints = [
  { breakpoint: "(min-width: 1300px)", totalColumns: 4 },
  { breakpoint: "(min-width: 1000px)", totalColumns: 2 },
  { breakpoint: "(max-width: 744px)", totalColumns: 1 },
];

export { titles, actionsConfig, breakPoints };
