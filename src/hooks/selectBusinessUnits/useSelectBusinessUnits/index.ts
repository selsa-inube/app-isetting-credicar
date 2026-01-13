import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMediaQueries } from "@inubekit/inubekit";
import { validateBusinessUnities } from "@utils/selectBusinessUnits/validateBusinessUnities";
import { IAppData } from "@ptypes/context/authAndPortalDataProvider/IAppData";
import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortal/IBusinessUnitsPortalStaff";

const useSelectBusinessUnits = (
  appData: IAppData,
  setBusinessUnitsToTheStaff: React.Dispatch<
    React.SetStateAction<IBusinessUnitsPortalStaff[]>
  >,
) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (appData.portal.publicCode) {
      validateBusinessUnities(
        appData.portal.publicCode,
        appData.user.identificationDocumentNumber || "",
      ).then((data) => {
        setBusinessUnitsToTheStaff(data);
      });
    }
  }, [appData.portal.publicCode]);

  useEffect(() => {
    if (
      location.pathname === "/selectBusinessUnit" ||
      location.pathname === "/selectBusinessUnit/" ||
      location.pathname === "/"
    ) {
      navigate(`/selectBusinessUnit/checking-credentials/`);
    }
  }, [location, navigate, appData]);

  const {
    "(max-width: 1100px)": screenTablet,
    "(min-width: 1101px) and (max-width: 2200px)": screenDesktop,
  }: Record<string, boolean> = useMediaQueries([
    "(max-width: 1100px)",
    "(min-width: 1101px) and (max-width: 2200px)",
  ]);

  const imageWidth = () => {
    if (screenDesktop) return "240px";
    if (screenTablet) return "200px";
    return "160px";
  };

  return { imageWidth, screenTablet, screenDesktop };
};

export { useSelectBusinessUnits };
