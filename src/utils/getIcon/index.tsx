import * as MdIcons from "react-icons/md";
import { ReactNode } from "react";
import { IconType } from "react-icons";

const getIcon = (
  iconReference?: string,
  size = 20,
  withIconDefault = true,
): ReactNode => {
  const withouIcon = withIconDefault ? (
    <MdIcons.MdOutlineFax size={size} />
  ) : (
    <></>
  );
  if (iconReference && iconReference.trim() !== "") {
    const IconComponent: IconType | undefined = (
      MdIcons as Record<string, IconType>
    )[iconReference];

    if (!IconComponent) {
      return withouIcon;
    } else {
      return <IconComponent size={size} />;
    }
  }

  return withouIcon;
};

export { getIcon };
