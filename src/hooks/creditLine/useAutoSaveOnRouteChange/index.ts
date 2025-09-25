import { useLocation } from "react-router-dom";
import { useModifyLinesConstructionData } from "../useModifyLinesConstructionData";
import { IUseAutoSaveOnRouteChange } from "@ptypes/hooks/creditLines/IUseAutoSaveOnRouteChange";

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
