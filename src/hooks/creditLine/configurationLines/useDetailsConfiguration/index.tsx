import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";
import { mediaQueryTablet } from "@config/environment";
import { IUseDetailsConstruction } from "@ptypes/hooks/creditLines/IUseDetailsConstruction";

const useDetailsConfiguration = (props: IUseDetailsConstruction) => {
  const { configurationData } = props;
  const navigate = useNavigate();

  const handleConfiguration = () => {
    if (!configurationData) {
      console.error("configurationData is undefined or null");
      return;
    }

    navigate(`/credit-lines/edit-credit-lines`, {
      state: { data: configurationData, option: "details" },
    });
  };

  const screenTablet = useMediaQuery(mediaQueryTablet);

  return {
    screenTablet,
    handleConfiguration,
  };
};

export { useDetailsConfiguration };
