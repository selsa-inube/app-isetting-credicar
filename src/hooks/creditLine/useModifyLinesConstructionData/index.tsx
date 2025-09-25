import { useEffect, useRef, useState } from "react";
import { patchModifyConstruction } from "@services/requestInProgress/patchModifyConstruction";
import { errorObject } from "@utils/errorObject";
import { IModifyConstructionResponse } from "@ptypes/creditLines/IModifyConstructionResponse";
import { IUseLinesConstructionData } from "@ptypes/hooks/creditLines/IUseLinesConstructionData";
import { IErrors } from "@ptypes/IErrors";

const useModifyLinesConstructionData = (props: IUseLinesConstructionData) => {
  const {
    debounceMs = 400,
    linesData,
    saveOn,
    userAccount,
    withNeWData = true,
  } = props;

  const [borrowerData, setBorrowerData] = useState<IModifyConstructionResponse>(
    {} as IModifyConstructionResponse,
  );
  const [hasError, setHasError] = useState(false);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);
  const [loading, setLoading] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (!withNeWData || !linesData) return;

    const run = async () => {
      setHasError(false);
      setErrorData({} as IErrors);
      setBorrowerData({} as IModifyConstructionResponse);
      setLoading(true);

      try {
        const data = await patchModifyConstruction(userAccount, linesData);
        setBorrowerData(data);
      } catch (error) {
        console.info(error);
        setHasError(true);
        setErrorData(errorObject(error));
      } finally {
        setLoading(false);
      }
    };

    timerRef.current = setTimeout(() => {
      void run();
    }, debounceMs);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [
    debounceMs,
    linesData?.settingRequestId,
    saveOn,
    userAccount,
    withNeWData,
  ]);

  return {
    borrowerData,
    errorData,
    hasError,
    loading,
    setHasError,
  };
};

export { useModifyLinesConstructionData };
