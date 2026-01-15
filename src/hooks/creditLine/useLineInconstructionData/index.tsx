import { useContext, useEffect, useState } from "react";
import { getLineUnderConstruction } from "@services/creditLines/getLineUnderConstruction";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { errorObject } from "@utils/errorObject";
import { ECreditLines } from "@enum/creditLines";
import { ILineUnderConstructionData } from "@ptypes/creditLines/ILineUnderConstructionData";
import { IErrors } from "@ptypes/IErrors";

const useLineInconstructionData = () => {
  const { appData } = useContext(AuthAndPortalData);

  const [lineUnderConstruction, setlineUnderConstruction] = useState<
    ILineUnderConstructionData[]
  >([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);

  useEffect(() => {
    const fetchLineInconstructionData = async () => {
      setLoading(true);
      if (appData.businessManager.publicCode.length > 0) {
        try {
          const data = await getLineUnderConstruction(
            appData.businessManager.publicCode,
            appData.businessUnit.publicCode,
            ECreditLines.REQUEST_STATUS,
            ECreditLines.CREDIT_LINE_ENTITY,
            appData.token,
          );
          setlineUnderConstruction(data);
        } catch (error) {
          console.info(error);
          setHasError(true);
          setErrorData(errorObject(error));
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLineInconstructionData();
  }, [appData.businessManager.publicCode]);

  return {
    lineUnderConstruction,
    hasError,
    errorData,
    loading,
    setHasError,
    setlineUnderConstruction,
  };
};

export { useLineInconstructionData };
