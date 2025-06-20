import { MdOutlineStart } from "react-icons/md";
import { Location } from "react-router-dom";
import { ILinkNav } from "@inubekit/inubekit";
import { ICardData } from "@ptypes/home/ICardData";
import { actionsConfig } from "../mainActionLogout";

const createNavLink = (
  option: ICardData,
  defaultIcon: JSX.Element,
  location?: Location,
) => ({
  id: option?.id ?? "",
  label: option?.publicCode ?? "",
  icon: option?.icon ?? defaultIcon,
  path: option?.url ?? "",
  isActive: location ? location.pathname === option?.url : false,
});

const mainNavigation = (optionsCards: ICardData[], location?: Location) => {
  const linkNav = optionsCards.reduce<Record<string, ILinkNav>>(
    (acc, option) => {
      const navLink = createNavLink(option, <MdOutlineStart />, location);
      acc[navLink.id] = navLink;
      return acc;
    },
    {},
  );

  const optionsHeader = {
    nav: {
      reactPortalId: "portal",
      title: "MENU",
      sections: [
        {
          subtitle: "",
          links: Object.values(linkNav),

          isOpen: false,
          onClose: () => {
            console.log();
          },
          onToggle: () => {
            console.log();
          },
        },
      ],
      actions: actionsConfig(),
    },
    breakpoint: "848px",
  };

  const optionsNav = {
    title: "MENU",
    sections: {
      administrate: {
        name: "",
        links: linkNav,
      },
    },
  };

  return {
    optionsHeader,
    optionsNav,
  };
};

export { mainNavigation };
