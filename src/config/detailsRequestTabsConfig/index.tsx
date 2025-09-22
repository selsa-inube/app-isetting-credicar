import { MdOutlineErrorOutline } from "react-icons/md";
import { EComponentAppearance } from "@enum/appearances";

const detailsRequestTabsConfig = {
  errorData: {
    id: "errorData",
    isDisabled: false,
    label: "Error",
    icon: {
      icon: <MdOutlineErrorOutline />,
      appearance: EComponentAppearance.DANGER,
    },
  },
  trazabilityData: {
    id: "trazabilityData",
    isDisabled: false,
    label: "Trazabilidad",
  },
};

export { detailsRequestTabsConfig };
