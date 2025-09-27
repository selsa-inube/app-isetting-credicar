import { useLocation } from "react-router-dom";
import { IUseAutoSaveOnRouteChange } from "@ptypes/hooks/creditLines/IUseAutoSaveOnRouteChange";
import { useModifyLinesConstructionData } from "../useModifyLinesConstructionData";

const useAutoSaveOnRouteChange = (props: IUseAutoSaveOnRouteChange) => {
  const { debounceMs, linesData, userAccount, withNeWData } = props;
  const location = useLocation();

  return useModifyLinesConstructionData({
    debounceMs,
    linesData,
    saveOn: location.key ?? location.pathname,
    userAccount,
    withNeWData: withNeWData,
  });
};

export { useAutoSaveOnRouteChange };
