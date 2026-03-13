/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { getRequestsInProgress } from "@services/requestInProgress/getRequestsInProgress";
import { EManagementType } from "@enum/managementType";
import { ERequestInProgress } from "@enum/requestInProgress";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";
import { IUseDataCreditLine } from "@ptypes/hooks/creditLines/IUseDataCreditLine";

const useDataCreditLine = (props: IUseDataCreditLine) => {
  const { id, optionRequest, creditLineData } = props;

  const { appData } = useContext(AuthAndPortalData);
  const [loading, setLoading] = useState<boolean>(false);

  const [requestsInProgress, setRequestsInProgress] = useState<
    IRequestsInProgress[]
  >([]);
  const [creditLine, setCreditLine] = useState<any>(creditLineData ?? {});

  useEffect(() => {
    const fetchRequestsInProgressData = async () => {
      if (!id) return;

      if (optionRequest === EManagementType.IN_PROGRESS) {
        setLoading(true);
        try {
          const result = await getRequestsInProgress(
            appData.businessManager.publicCode,
            appData.businessUnit.publicCode,
            ERequestInProgress.CREDIT_LINE,
            appData.token,
            id,
          );
          setRequestsInProgress(result);
        } catch (error) {
          console.info(error);
        } finally {
          setTimeout(() => setLoading(false), 2000);
        }
      }
    };
    fetchRequestsInProgressData();
  }, [id, optionRequest, appData.businessManager.publicCode]);

  useEffect(() => {
    if (creditLineData && Object.values(creditLineData).length > 0) {
      setCreditLine(creditLineData);
    }
  }, [creditLineData]);

  const data = useMemo(() => {
    if (
      optionRequest === EManagementType.IN_PROGRESS &&
      requestsInProgress.length > 0
    ) {
      const configurationRequest = requestsInProgress.find((item) => item);
      return configurationRequest;
    }

    if (
      optionRequest === undefined &&
      creditLine &&
      Object.values(creditLine).length > 0
    ) {
      return creditLine;
    }

    return undefined;
  }, [creditLine, requestsInProgress]);

  return { data, loading };
};

export { useDataCreditLine };
