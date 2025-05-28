import { DeleteCyclePayment } from "@pages/payrollAgreement/tabs/payrollAgreementTab/addPayrollAgreement/tools/deleteCyclePayment";
import { IAction } from "@ptypes/design/table/IAction";
import { IEntry } from "@ptypes/design/table/IEntry";
import { ITitle } from "@ptypes/design/table/ITitle";

const titles: ITitle[] = [
  {
    id: "cycleId",
    titleName: "Ciclo",
    priority: 1,
  },
  {
    id: "nameCycle",
    titleName: "Nombre del ciclo",
    priority: 0,
  },
  {
    id: "periodicity",
    titleName: "Periodicidad del ciclo",
    priority: 2,
  },
  {
    id: "payday",
    titleName: "Día de pago del ciclo",
    priority: 3,
  },
  {
    id: "numberDaysUntilCut",
    titleName: "# de días para el corte",
    priority: 4,
  },
];

const actionsConfig = (setEntryDeleted: (value: string | number) => void) => {
  const actions: IAction[] = [
    {
      id: "delete",
      actionName: "Eliminar",
      content: (entry: IEntry) => (
        <DeleteCyclePayment data={entry} setEntryDeleted={setEntryDeleted} />
      ),
    },
  ];

  return actions;
};

const breakPoints = [
  { breakpoint: "(min-width: 1100px)", totalColumns: 5 },
  { breakpoint: "(min-width: 1099px)", totalColumns: 4 },
  { breakpoint: "(max-width: 944px)", totalColumns: 3 },
  { breakpoint: "(max-width: 754px)", totalColumns: 2 },
  { breakpoint: "(max-width: 460px)", totalColumns: 1 },
];

export { titles, actionsConfig, breakPoints };
