import { Delete } from "@pages/payrollAgreement/tabs/payrollAgreementTab/tools/delete";
import { Edit } from "@pages/payrollAgreement/tabs/payrollAgreementTab/tools/edit";
import { Details } from "@pages/payrollAgreement/tabs/payrollAgreementTab/tools/details";
import { ITitle } from "@ptypes/design/table/ITitle";
import { IAction } from "@ptypes/design/table/IAction";
import { IEntry } from "@ptypes/design/table/IEntry";
import { EPayrollAgreement } from "@enum/payrollAgreement";

const titles: ITitle[] = [
  {
    id: "payrollForDeductionAgreementCode",
    titleName: "Código",
    priority: 0,
  },
  {
    id: "abbreviatedName",
    titleName: "Nombre de nómina",
    priority: 1,
  },
];

const actionsConfig = (setEntryDeleted: (id: string | number) => void) => {
  const actions: IAction[] = [
    {
      id: "Details",
      content: (entry: IEntry) => <Details data={entry} />,
    },
    {
      id: "edit",
      content: (entry: IEntry) => (
        <Edit data={entry} useCaseEdit={EPayrollAgreement.USE_CASE_EDIT} />
      ),
    },
    {
      id: "delete",
      content: (entry: IEntry) => (
        <Delete data={entry} setEntryDeleted={setEntryDeleted} />
      ),
    },
  ];

  return actions;
};

const breakPoints = [
  { breakpoint: "(min-width: 745px)", totalColumns: 2 },
  { breakpoint: "(max-width: 744px)", totalColumns: 2 },
];

export { titles, actionsConfig, breakPoints };
