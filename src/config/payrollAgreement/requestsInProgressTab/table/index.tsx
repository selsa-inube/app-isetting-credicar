import { Cancel } from "@pages/payrollAgreement/tabs/requestsInProgressTab/tools/cancel";
import { Details } from "@pages/payrollAgreement/tabs/requestsInProgressTab/tools/details";
import { IAction } from "@ptypes/design/table/IAction";
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

const actionsConfig = (setEntryCanceled: (value: string | number) => void) => {
  const actions: IAction[] = [
    {
      id: "Details",
      content: (entry) => <Details data={entry} />,
    },

    {
      id: "cancel",
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
