import { useEffect, useState } from "react";
import { patchModifyConstruction } from "@services/requestInProgress/patchModifyConstruction";
import { errorObject } from "@utils/errorObject";
import { IModifyConstructionResponse } from "@ptypes/creditLines/IModifyConstructionResponse";
import { IUseLinesConstructionData } from "@ptypes/hooks/creditLines/IUseLinesConstructionData";
import { IErrors } from "@ptypes/IErrors";

const useModifyLinesConstructionData = (props: IUseLinesConstructionData) => {
  const { userAccount, linesData, withNeWData, setIsUpdated } = props;
  const [borrowerData, setBorrowerData] = useState<IModifyConstructionResponse>(
    {} as IModifyConstructionResponse,
  );
  const [hasError, setHasError] = useState(false);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLinesConstructiontData = async () => {
      setHasError(false);
      setErrorData({} as IErrors);
      setBorrowerData({} as IModifyConstructionResponse);

      if (withNeWData && linesData) {
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
          if (setIsUpdated) {
            setIsUpdated(false);
          }
        }
      } else {
        setLoading(false);
      }
    };

    fetchLinesConstructiontData();
  }, [withNeWData, userAccount, linesData?.settingRequestId]);

  return {
    borrowerData,
    hasError,
    errorData,
    loading,
    setHasError,
  };
};

export { useModifyLinesConstructionData };
