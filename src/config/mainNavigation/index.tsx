import { MdOutlineStart } from "react-icons/md";
import { Location } from "react-router-dom";
import { ILinkNav } from "@inubekit/inubekit";
import { ICardData } from "@ptypes/home/ICardData";
import { actionsConfig } from "../mainActionLogout";
import { useTranslation } from "react-i18next";

const createNavLink = (
  option: ICardData,
  defaultIcon: JSX.Element,
  t: (key: string) => string,
  location?: Location,
) => {
  const id = option?.id ?? "";

  const translationMap: Record<string, string> = {
    "Destinos de dinero": "mainMenuNavigation.moneyDestination",
    "Nóminas de convenio": "mainMenuNavigation.payrollAgreement",
    "Politicas generales de credito":
      "mainMenuNavigation.generalCreditPolicies",
  };

  const label = t(translationMap[id] || id);

  return {
    id,
    label,
    icon: option?.icon ?? defaultIcon,
    path: option?.url ?? "",
    isActive: location ? location.pathname === option?.url : false,
  };
};

const mainNavigation = (optionsCards: ICardData[], location?: Location) => {
  const { t } = useTranslation();
  const linkNav = optionsCards.reduce<Record<string, ILinkNav>>(
    (acc, option) => {
      const navLink = createNavLink(option, <MdOutlineStart />, t, location);
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
