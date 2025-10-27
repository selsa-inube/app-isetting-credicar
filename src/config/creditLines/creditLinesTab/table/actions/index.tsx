import { Details } from "@pages/creditLines/tabs/creditLinesTab/tools/details";
import { Edit } from "@pages/creditLines/tabs/creditLinesTab/tools/edit";
import { Delete } from "@pages/creditLines/tabs/creditLinesTab/tools/delete";
import { IEntry } from "@ptypes/design/table/IEntry";

const actions = (setEntryDeleted: (value: string | number) => void) => {
  return [
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
};

export { actions };
