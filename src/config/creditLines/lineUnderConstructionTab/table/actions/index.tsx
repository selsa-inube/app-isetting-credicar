import { EditConstruction } from "@pages/creditLines/tabs/linesUnderConstructionTab/tools/edit";
import { DetailsConfiguration } from "@pages/creditLines/tabs/linesUnderConstructionTab/tools/details";
import { Delete } from "@pages/creditLines/tabs/linesUnderConstructionTab/tools/delete";
import { ECreditLines } from "@enum/creditLines";
import { IEntry } from "@ptypes/design/table/IEntry";

const actionsConfig = (setEntryDeleted: (value: string | number) => void) => {
  return [
    {
      id: "Details",
      content: (entry: IEntry) => <DetailsConfiguration data={entry} />,
    },
    {
      id: "edit",
      content: (entry: IEntry) => (
        <EditConstruction
          data={entry}
          useCaseConfiguration={ECreditLines.USE_CASE_CONFIG_CONSTRUCTION}
        />
      ),
    },
    {
      id: "delete",
      content: (entry: IEntry) => (
        <Delete data={entry} setEntryCanceled={setEntryDeleted} />
      ),
    },
  ];
};
export { actionsConfig };
