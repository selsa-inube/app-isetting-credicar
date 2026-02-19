import { useContext, useEffect, useMemo, useState } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEnumeratorsCrediboard } from "@hooks/useEnumeratorsCrediboard";
import { getMoneyDestinationData } from "@services/moneyDestination/getMoneyDestination";
import { getRequestsInProgress } from "@services/requestInProgress/getRequestsInProgress";
import { EManagementType } from "@enum/managementType";
import { EMoneyDestination } from "@enum/moneyDestination";
import { ERequestInProgress } from "@enum/requestInProgress";
import { normalizeDestination } from "@utils/destination/normalizeDestination";
import { IUseDataDestination } from "@ptypes/hooks/moneyDestination/IUseDataDestination";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";
import { IMoneyDestinationData } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IMoneyDestinationData";

const useDataDestination = (props: IUseDataDestination) => {
  const { id, requestNumber, option } = props;
  const { appData } = useContext(AuthAndPortalData);
  const [loading, setLoading] = useState<boolean>(false);
  const [requestsInProgress, setRequestsInProgress] = useState<
    IRequestsInProgress[]
  >([]);
  const [moneyDestination, setMoneyDestination] = useState<
    IMoneyDestinationData[]
  >([]);

  const { enumData: type, loading: loadingEnum } = useEnumeratorsCrediboard({
    businessUnits: appData.businessUnit.publicCode,
    enumQuery: EMoneyDestination.DESTINATION_TYPE,
    token: appData.token,
  });

  useEffect(() => {
    const fetchRequestsInProgressData = async () => {
      if (!id) return;

      if (!requestNumber) return;

      if (
        // appData.businessManager.publicCode.length > 0 &&
        option === EManagementType.IN_PROGRESS
      ) {
        setLoading(true);
        try {
          const result = await getRequestsInProgress(
            appData.businessManager.publicCode,
            appData.businessUnit.publicCode,
            ERequestInProgress.MONEY_DESTINATION,
            appData.token,
            id,
            requestNumber,
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
  }, [id, option, requestNumber, appData.businessManager.publicCode]);

  useEffect(() => {
    const fetchData = async () => {
      if (option === EManagementType.CURRENT) {
        setLoading(true);
        try {
          const result = await getMoneyDestinationData(
            appData.businessUnit.publicCode,
            appData.token,
          );
          setMoneyDestination(result);
        } catch (error) {
          console.info(error);
        } finally {
          setTimeout(() => setLoading(false), 2000);
        }
      }
    };
    fetchData();
  }, [id, requestNumber, option, appData.businessUnit.publicCode]);

  const data = useMemo(() => {
    if (requestsInProgress.length > 0) {
      const configurationRequest = requestsInProgress.find(
        (item) => item,
      )?.configurationRequestData;
      return {
        id: requestsInProgress?.[0].id as string,
        nameDestination: configurationRequest?.abbreviatedName as string,
        description: configurationRequest?.descriptionUse as string,
        icon: configurationRequest?.iconReference as string,
        typeDestination: configurationRequest?.moneyDestinationType as string,
        creditLine: configurationRequest?.creditLine as string,
      };
    }

    if (moneyDestination.length > 0) {
      const destination = moneyDestination.find((item) => item.id === id);
      return {
        id: destination?.moneyDestinationId ?? "",
        nameDestination: destination?.name ?? "",
        description: destination?.descriptionUse ?? "",
        icon: destination?.iconReference ?? "",
        typeDestination: destination?.moneyDestinationType ?? "",
        creditLine: destination?.creditLine ?? "",
      };
    }

    return {
      id: "",
      nameDestination: "",
      description: "",
      icon: "",
      typeDestination: "",
      creditLine: "",
    };
  }, [moneyDestination, requestsInProgress]);

  const transformedMoneyDestination = useMemo(() => {
    if (loadingEnum || !type || type.length === 0) {
      return data;
    }

    const typeDestination = normalizeDestination(
      type,
      data.typeDestination ?? "",
    );
    const valueTypeDestination =
      typeDestination?.i18n?.[
        appData.language as keyof typeof typeDestination.i18n
      ] ?? typeDestination?.description;

    return {
      ...data,
      typeDestination: valueTypeDestination ?? data.typeDestination,
    };
  }, [data, type, loadingEnum, appData.language]);

  return { transformedMoneyDestination, loading };
};

export { useDataDestination };
