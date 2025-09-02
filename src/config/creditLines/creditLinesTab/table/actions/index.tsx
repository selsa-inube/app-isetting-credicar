import {
  MdDeleteOutline,
  MdOutlineCreate,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { Icon } from "@inubekit/inubekit";

import { EComponentAppearance } from "@enum/appearances";
import { IAction } from "@ptypes/design/table/IAction";

const actions: IAction[] = [
  {
    id: "Details",

    content: () => (
      <Icon
        appearance={EComponentAppearance.DARK}
        icon={<MdOutlineRemoveRedEye />}
        size="16px"
        cursorHover
      />
    ),
  },
  {
    id: "edit",
    content: () => (
      <Icon
        appearance={EComponentAppearance.PRIMARY}
        icon={<MdOutlineCreate />}
        size="16px"
        cursorHover
      />
    ),
  },
  {
    id: "delete",
    content: () => (
      <Icon
        appearance={EComponentAppearance.DANGER}
        icon={<MdDeleteOutline />}
        size="16px"
        cursorHover
      />
    ),
  },
];

export { actions };
