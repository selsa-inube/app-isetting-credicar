import { useContext, useEffect, useState } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { getRequestsInProgress } from "@services/requestInProgress/getRequestsInProgress";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";
import { IUseIdRequestInProgress } from "@ptypes/hooks/IUseIdRequestInProgress";

const useIdRequestInProgress = (props: IUseIdRequestInProgress) => {
  const { id, requestNumber, entity } = props;
  const { appData } = useContext(AuthAndPortalData);
  const [loading, setLoading] = useState<boolean>(false);
  const [requestsInProgress, setRequestsInProgress] = useState<
    IRequestsInProgress[]
  >([]);

  useEffect(() => {
    const fetchRequestsInProgressData = async () => {
      setLoading(true);
      try {
        if (appData.businessManager.publicCode.length > 0) {
          const data = await getRequestsInProgress(
            appData.businessManager.publicCode,
            appData.businessUnit.publicCode,
            entity,
            appData.token,
            id,
            requestNumber,
          );
          setRequestsInProgress(data);
        }
      } catch (error) {
        console.info(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestsInProgressData();
  }, [id, appData.businessManager.publicCode, appData.businessUnit.publicCode]);

  return {
    requestsInProgress,
    loading,
  };
};

export { useIdRequestInProgress };
