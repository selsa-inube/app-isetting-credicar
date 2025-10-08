import { Icon } from "@inubekit/inubekit";
import { MdDeleteOutline } from "react-icons/md";
import { EditConstruction } from "@pages/creditLines/tabs/linesUnderConstructionTab/tools/edit";
import { DetailsConfiguration } from "@pages/creditLines/tabs/linesUnderConstructionTab/tools/details";
import { EComponentAppearance } from "@enum/appearances";
import { ECreditLines } from "@enum/creditLines";
import { IAction } from "@ptypes/design/table/IAction";
import { IEntry } from "@ptypes/design/table/IEntry";

const actions: IAction[] = [
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
    content: () => (
      <Icon
        icon={<MdDeleteOutline />}
        appearance={EComponentAppearance.DANGER}
        size="16px"
      />
    ),
  },
];

export { actions };
