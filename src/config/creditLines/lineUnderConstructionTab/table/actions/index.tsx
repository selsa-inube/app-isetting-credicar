import { Icon } from "@inubekit/inubekit";
import { MdDeleteOutline, MdOutlineRemoveRedEye } from "react-icons/md";
import { EditConstruction } from "@pages/creditLines/tabs/linesUnderConstructionTab/edit";
import { EComponentAppearance } from "@enum/appearances";
import { ECreditLines } from "@enum/creditLines";
import { IAction } from "@ptypes/design/table/IAction";
import { IEntry } from "@ptypes/design/table/IEntry";

const actions: IAction[] = [
  {
    id: "Details",

    content: () => (
      <Icon
        icon={<MdOutlineRemoveRedEye />}
        appearance={EComponentAppearance.DARK}
        size="16px"
      />
    ),
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
