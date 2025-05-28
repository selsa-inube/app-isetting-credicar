import { Delete } from "@pages/payrollAgreement/tabs/payrollAgreementTab/tools/delete";
import { Edit } from "@pages/payrollAgreement/tabs/payrollAgreementTab/tools/edit";
import { Details } from "@pages/payrollAgreement/tabs/payrollAgreementTab/tools/details";
import { ITitle } from "@ptypes/design/table/ITitle";
import { IAction } from "@ptypes/design/table/IAction";
import { IEntry } from "@ptypes/design/table/IEntry";

const titles: ITitle[] = [
  {
    id: "abbreviatedName",
    titleName: "Nombre de nómina",
    priority: 0,
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
      content: (entry: IEntry) => <Edit data={entry} />,
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
  { breakpoint: "(max-width: 744px)", totalColumns: 1 },
];

export { titles, actionsConfig, breakPoints };
