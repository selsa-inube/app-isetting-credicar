import { IUseAutoSaveOnRouteChange } from "@ptypes/hooks/creditLines/IUseAutoSaveOnRouteChange";
import { useModifyLinesConstructionData } from "../useModifyLinesConstructionData";

const useAutoSaveOnRouteChange = (props: IUseAutoSaveOnRouteChange) => {
  const {
    debounceMs,
    linesData,
    userAccount,
    withNeWData,
    setIsUpdated,
    option,
    token,
  } = props;

  return useModifyLinesConstructionData({
    option,
    debounceMs,
    linesData,
    userAccount,
    withNeWData: withNeWData,
    setIsUpdated,
    token,
  });
};

export { useAutoSaveOnRouteChange };
