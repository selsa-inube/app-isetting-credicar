import { useTranslation } from "react-i18next";
import { INav } from "@ptypes/home/INav";
import { ICardData } from "@ptypes/home/ICardData";
import { MdOutlineStart } from "react-icons/md";
import { Location } from "react-router-dom";

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

const mainNavigation = (
  optionsCards: ICardData[],
  location?: Location,
): INav => {
  const { t } = useTranslation();

  const linkNav = optionsCards.reduce<
    Record<string, ReturnType<typeof createNavLink>>
  >((acc, option) => {
    const navLink = createNavLink(option, <MdOutlineStart />, t, location);
    acc[navLink.id] = navLink;
    return acc;
  }, {});

  return {
    items: {
      title: "MENU",
      sections: {
        administrate: {
          name: "",
          links: linkNav,
        },
      },
    },
    breakpoint: "848px",
  };
};

export { mainNavigation };
