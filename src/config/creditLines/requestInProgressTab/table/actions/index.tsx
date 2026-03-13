import { Cancel } from "@pages/creditLines/tabs/requestsInProgressTab/tools/cancel";
import { EditRequest } from "@pages/creditLines/tabs/requestsInProgressTab/tools/edit";
import { Details } from "@pages/creditLines/tabs/requestsInProgressTab/tools/details";
import { IAction } from "@ptypes/design/table/IAction";

const actionsConfig = (setEntryCanceled: (value: string | number) => void) => {
  const actions: IAction[] = [
    {
      id: "Details",
      content: (entry) => <Details data={entry} />,
    },

    {
      id: "edit",
      content: (entry) => <EditRequest data={entry} />,
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

export { actionsConfig };
