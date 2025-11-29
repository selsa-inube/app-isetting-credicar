import { useMediaQueries } from "@inubekit/inubekit";
import { useContext, useEffect, useRef, useState } from "react";
import { useIAuth } from "@inube/iauth-react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useOptionsByBusinessUnit } from "@hooks/staffPortal/useOptionsByBusinessUnit";
import { useCaseForStaff } from "@hooks/staffPortal/useCaseForStaff";
import { tokens } from "@design/tokens";
import { enviroment } from "@config/environment";
import { mainNavigation } from "@config/mainNavigation";
import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortal/IBusinessUnitsPortalStaff";

const useHome = () => {
  const {
    appData,
    businessUnitsToTheStaff,
    businessUnitSigla,
    setBusinessUnitSigla,
    setUseCases,
  } = useContext(AuthAndPortalData);

  const { logout } = useIAuth();
  const [collapse, setCollapse] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [dataExists, setDataExists] = useState<boolean>(false);

  const collapseMenuRef = useRef<HTMLDivElement>(null);
  const businessUnitChangeRef = useRef<HTMLDivElement>(null);

  const { optionsCards, loading, hasError } = useOptionsByBusinessUnit({
    businessUnit: businessUnitSigla,
    staffPortalId: appData.portal.publicCode,
  });

  const { optionsHeader } = mainNavigation(optionsCards);

  useEffect(() => {
    if (appData.businessUnit.publicCode) {
      setSelectedClient(appData.businessUnit.abbreviatedName);
    }
  }, [appData]);

  const { useCases: useCases } = useCaseForStaff({
    businessUnitPrevious: appData.businessUnit.publicCode,
    useCasesByStaff: appData.useCasesByStaff,
    businessUnit: businessUnitSigla,
    userAccount: appData.user.userAccount,
    businessManagerCode: appData.businessManager.publicCode,
  });

  const handleLogoClick = (businessUnit: IBusinessUnitsPortalStaff) => {
    const selectJSON = JSON.stringify(businessUnit);
    setBusinessUnitSigla(selectJSON);
    setSelectedClient(businessUnit.abbreviatedName);
    setCollapse(false);
  };

  useEffect(() => {
    if (businessUnitSigla && useCases.length > 0) {
      const useCasesJSON = JSON.stringify(useCases);
      setUseCases(useCasesJSON);
    }
  }, [businessUnitSigla, useCases, setUseCases]);

  const username = appData.user.userName.split(" ")[0];

  const {
    "(max-width: 532px)": screenMobile,
    "(max-width: 805px)": screenTablet,
    "(max-width: 944px)": screenTabletHeader,
  }: Record<string, boolean> = useMediaQueries([
    "(max-width: 532px)",
    "(max-width: 805px)",
    "(max-width: 944px)",
  ]);

  const handlelogout = () => {
    logout({ logoutParams: { returnTo: enviroment.REDIRECT_URI } });
  };

  const hasMultipleBusinessUnits = businessUnitsToTheStaff.length > 1;

  useEffect(() => {
    if (hasError) {
      setDataExists(false);
    }

    if (optionsCards && optionsCards?.length > 0) {
      setDataExists(true);
    }
  }, [optionsCards, hasError]);

  const padding = !dataExists
    ? tokens.spacing.s0
    : `${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s500}`;

  return {
    businessUnitChangeRef,
    businessUnitsToTheStaff,
    collapse,
    collapseMenuRef,
    selectedClient,
    optionsCards,
    loading,
    appData,
    username,
    screenMobile,
    screenTablet,
    screenTabletHeader,
    hasMultipleBusinessUnits,
    dataExists,
    optionsHeader,
    padding,
    handlelogout,
    setCollapse,
    handleLogoClick,
  };
};

export { useHome };
