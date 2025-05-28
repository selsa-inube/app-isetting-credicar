import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useOptionsByBusinessUnit } from "@hooks/staffPortal/useOptionsByBusinessUnit";
import { IAppData } from "@ptypes/context/authAndPortalDataProvider/IAppData";
import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortal/IBusinessUnitsPortalStaff";
import { decrypt } from "@utils/crypto/decrypt";
import { useMediaQuery } from "@inubekit/inubekit";
import { mainNavigation } from "@config/mainNavigation";

const useAppPage = (
  appData: IAppData,
  businessUnitSigla: string,
  setBusinessUnitSigla: React.Dispatch<React.SetStateAction<string>>,
) => {
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

  const location = useLocation();

  const { optionsHeader, optionsNav } = mainNavigation(optionsCards, location);

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

  const isTablet = useMediaQuery("(max-width: 849px)");
  const isTabletMain = useMediaQuery("(max-width: 1000px)");

  return {
    collapse,
    collapseMenuRef,
    businessUnitChangeRef,
    selectedClient,
    isTablet,
    isTabletMain,
    optionsHeader,
    optionsNav,
    setCollapse,
    handleLogoClick,
  };
};

export { useAppPage };
