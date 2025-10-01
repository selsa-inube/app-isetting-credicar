import { IUseAutoSaveOnRouteChange } from "@ptypes/hooks/creditLines/IUseAutoSaveOnRouteChange";
import { useModifyLinesConstructionData } from "../useModifyLinesConstructionData";

const useAutoSaveOnRouteChange = (props: IUseAutoSaveOnRouteChange) => {
  const { debounceMs, linesData, userAccount, withNeWData } = props;

  return useModifyLinesConstructionData({
    debounceMs,
    linesData,
    userAccount,
    withNeWData: withNeWData,
  });
};

export { useAutoSaveOnRouteChange };
