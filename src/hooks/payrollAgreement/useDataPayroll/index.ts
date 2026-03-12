import { useContext, useEffect, useMemo, useState } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { getRequestsInProgress } from "@services/requestInProgress/getRequestsInProgress";
import { EManagementType } from "@enum/managementType";
import { ERequestInProgress } from "@enum/requestInProgress";
import { errorObject } from "@utils/errorObject";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";
import { IPayrollAgreementData } from "@ptypes/payrollAgreement/payrollAgreementTab/IPayrollAgreementData";
import { IUsePayrollData } from "@ptypes/hooks/payrollAgreement/IUsePayrollData";
import { IErrors } from "@ptypes/IErrors";

const useDataPayroll = (props: IUsePayrollData) => {
  const { id, requestNumber, option, payrollData } = props;
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
            ERequestInProgress.PAYROLL_AGREEMENT,
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
      const requestData = requestsInProgress.find(
        (item) => item,
      )?.configurationRequestData;
      return requestData as unknown as IPayrollAgreementData;
    }

    if (
      option === EManagementType.CURRENT &&
      Object.values(payrollData).length > 0
    ) {
      return payrollData;
    }

    return undefined;
  }, [payrollData, requestsInProgress]);

  return { data, loading, hasError, errorData };
};

export { useDataPayroll };
