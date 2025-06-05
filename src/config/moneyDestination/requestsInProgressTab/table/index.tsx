import { Details } from "@pages/moneyDestination/tabs/requestsInProgressTab/tools/details";
import { Cancel } from "@pages/moneyDestination/tabs/requestsInProgressTab/tools/cancel";
import { ITitle } from "@ptypes/design/table/ITitle";
import { IAction } from "@ptypes/design/table/IAction";

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

const actionsConfig = (setEntryCanceled: (value: string | number) => void) => {
  const actions: IAction[] = [
    {
      id: "Details",
      content: (entry) => <Details data={entry} />,
    },

    {
      id: "delete",
      content: (entry) => (
        <Cancel data={entry} setEntryCanceled={setEntryCanceled} />
      ),
    },
  ];

  return actions;
};

const breakPoints = [
  { breakpoint: "(min-width: 745px)", totalColumns: 3 },
  { breakpoint: "(max-width: 744px)", totalColumns: 2 },
];

export { titles, actionsConfig, breakPoints };
