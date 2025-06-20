import { Edit } from "@pages/moneyDestination/tabs/moneyDestinationTab/tools/edit";
import { Delete } from "@pages/moneyDestination/tabs/moneyDestinationTab/tools/delete";
import { Details } from "@pages/moneyDestination/tabs/moneyDestinationTab/tools/details";
import { IAction } from "@ptypes/design/table/IAction";
import { ITitle } from "@ptypes/design/table/ITitle";
import { IEntry } from "@ptypes/design/table/IEntry";

const titles: ITitle[] = [
  {
    id: "abbreviatedName",
    titleName: "Nombre del destino",
    priority: 0,
  },
  {
    id: "descriptionUse",
    titleName: "Descripción del destino",
    priority: 1,
  },
];

const actionsConfig = (setEntryDeleted: (value: string | number) => void) => {
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
