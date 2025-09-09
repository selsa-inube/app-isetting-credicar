import { Icon } from "@inubekit/inubekit";
import { MdDeleteOutline, MdOutlineRemoveRedEye } from "react-icons/md";
import { EComponentAppearance } from "@enum/appearances";
import { IAction } from "@ptypes/design/table/IAction";
import { EditConstruction } from "@src/pages/creditLines/tabs/creditLinesTab/infoConfigurationModal/tools/edit";
import { IEntry } from "@src/types/design/table/IEntry";
import { ECreditLines } from "@src/enum/creditLines";

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
