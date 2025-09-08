import { Icon } from "@inubekit/inubekit";
import {
  MdDeleteOutline,
  MdOutlineCreate,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { EComponentAppearance } from "@enum/appearances";
import { IAction } from "@ptypes/design/table/IAction";

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
    content: () => (
      <Icon
        icon={<MdOutlineCreate />}
        appearance={EComponentAppearance.PRIMARY}
        size="16px"
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
