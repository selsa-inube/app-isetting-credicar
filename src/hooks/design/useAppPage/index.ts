import { useContext, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";
import { useNavigate } from "react-router-dom";
import { ChangeToRequestTab } from "@context/changeToRequestTab/changeToRequest";
import { useOptionsByBusinessUnit } from "@hooks/staffPortal/useOptionsByBusinessUnit";
import { decrypt } from "@utils/crypto/decrypt";
import { mainNavigation } from "@config/mainNavigation";
import {
  maxWidthLineConstruction,
  maxWidthOtherPages,
  mediaQueryTablet,
  mediaQueryTabletMain,
} from "@config/environment";
import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortal/IBusinessUnitsPortalStaff";
import { IUseAppPage } from "@ptypes/hooks/IUseAppPage";

const useAppPage = (props: IUseAppPage) => {
  const { appData, businessUnitSigla, setBusinessUnitSigla, location } = props;
  const [collapse, setCollapse] = useState(false);
  const collapseMenuRef = useRef<HTMLDivElement>(null);
  const businessUnitChangeRef = useRef<HTMLDivElement>(null);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const portalId = localStorage.getItem("portalCode");
  const staffPortalId = portalId ? decrypt(portalId) : "";

  const { optionsCards } = useOptionsByBusinessUnit({
    businessUnit: businessUnitSigla,
    staffPortalId,
  });

  const navigate = useNavigate();

  const { optionsHeader, optionsNav } = mainNavigation(optionsCards, location);

  const { maxWidthPage, setMaxWidthPage } = useContext(ChangeToRequestTab);
  useEffect(() => {
    if (appData.businessUnit.publicCode) {
      setSelectedClient(appData.businessUnit.abbreviatedName);
    }
  }, [appData]);

  const handleLogoClick = (businessUnit: IBusinessUnitsPortalStaff) => {
    const selectJSON = JSON.stringify(businessUnit);
    setBusinessUnitSigla(selectJSON);
    setSelectedClient(businessUnit.abbreviatedName);
    setCollapse(false);
    navigate("/");
  };

  const isTablet = useMediaQuery(mediaQueryTablet);
  const isTabletMain = useMediaQuery(mediaQueryTabletMain);

  const routeConfigs = {
    "/edit-credit-lines": { maxWidth: maxWidthLineConstruction },
  };

  useEffect(() => {
    const currentRoute = Object.keys(routeConfigs).find((route) =>
      location.pathname.includes(route),
    );

    if (currentRoute) {
      setMaxWidthPage(maxWidthLineConstruction);
    } else {
      setMaxWidthPage(maxWidthOtherPages);
    }
  }, [location.pathname]);

  return {
    collapse,
    collapseMenuRef,
    businessUnitChangeRef,
    selectedClient,
    isTablet,
    isTabletMain,
    optionsHeader,
    optionsNav,
    maxWidthPage,
    setCollapse,
    handleLogoClick,
  };
};

export { useAppPage };
