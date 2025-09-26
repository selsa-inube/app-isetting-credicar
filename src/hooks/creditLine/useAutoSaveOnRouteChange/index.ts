import { useLocation } from "react-router-dom";
import { IUseAutoSaveOnRouteChange } from "@ptypes/hooks/creditLines/IUseAutoSaveOnRouteChange";
import { useModifyLinesConstructionData } from "../useModifyLinesConstructionData";

const useAutoSaveOnRouteChange = ({
  debounceMs,
  linesData,
  userAccount,
}: IUseAutoSaveOnRouteChange) => {
  const location = useLocation();

  return useModifyLinesConstructionData({
    debounceMs,
    linesData,
    saveOn: location.key ?? location.pathname,
    userAccount,
    withNeWData: true,
  });
};

export { useAutoSaveOnRouteChange };
