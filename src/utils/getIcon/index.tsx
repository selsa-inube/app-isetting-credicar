import * as MdIcons from "react-icons/md";
import { ReactNode } from "react";
import { IconType } from "react-icons";

const getIcon = (iconReference?: string, size = 20): ReactNode => {
  if (iconReference && iconReference.trim() !== "") {
    const IconComponent: IconType | undefined = (
      MdIcons as Record<string, IconType>
    )[iconReference];
    if (!IconComponent) {
      return <MdIcons.MdOutlineFax size={size} />;
    } else {
      return <IconComponent size={size} />;
    }
  }

  return <MdIcons.MdOutlineFax size={size} />;
};

export { getIcon };
