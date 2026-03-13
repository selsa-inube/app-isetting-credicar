import { useContext, useEffect, useMemo, useState } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { getRequestsInProgress } from "@services/requestInProgress/getRequestsInProgress";
import { EManagementType } from "@enum/managementType";
import { ERequestInProgress } from "@enum/requestInProgress";
import { transformationRulesRequest } from "@utils/transformationRulesRequest";
import { errorObject } from "@utils/errorObject";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";
import { IUseDataGenPolicies } from "@ptypes/hooks/generalCreditPolicies/IUseDataGenPolicies";
import { IErrors } from "@ptypes/IErrors";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const useDataGeneralPolicies = (props: IUseDataGenPolicies) => {
  const { id, requestNumber, option } = props;
  const { appData } = useContext(AuthAndPortalData);
  const [loading, setLoading] = useState<boolean>(false);
  const [requestsInProgress, setRequestsInProgress] = useState<
    IRequestsInProgress[]
  >([]);
  const [hasError, setHasError] = useState(false);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);

  useEffect(() => {
    const fetchRequestsInProgressData = async () => {
      if (!id) return;

      if (!requestNumber) return;

      if (option === EManagementType.IN_PROGRESS) {
        setLoading(true);
        try {
          const result = await getRequestsInProgress(
            appData.businessManager.publicCode,
            appData.businessUnit.publicCode,
            ERequestInProgress.GENERAL_CREDIT_POLICIES,
            appData.token,
            id,
            requestNumber,
          );
          setRequestsInProgress(result);
        } catch (error) {
          console.info(error);
          setHasError(true);
          setErrorData(errorObject(error));
        } finally {
          setTimeout(() => setLoading(false), 2000);
        }
      }
    };
    fetchRequestsInProgressData();
  }, [id, option, requestNumber, appData.businessManager.publicCode]);

  const data = useMemo(() => {
    if (
      option === EManagementType.IN_PROGRESS &&
      requestsInProgress.length > 0
    ) {
      const configurationRequest = requestsInProgress.find(
        (item) => item,
      )?.configurationRequestData;

      const rules = configurationRequest?.rules;
      const rulesMap = transformationRulesRequest(
        rules as unknown as IRuleDecisionExtended[],
      );

      return rulesMap;
    }
  }, [requestsInProgress]);

  return { requestsInProgress, data, loading, hasError, errorData };
};

export { useDataGeneralPolicies };
