/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEnumeratorsCrediboard } from "@hooks/useEnumeratorsCrediboard";
import { getRequestsInProgress } from "@services/requestInProgress/getRequestsInProgress";
import { EManagementType } from "@enum/managementType";
import { EMoneyDestination } from "@enum/moneyDestination";
import { ERequestInProgress } from "@enum/requestInProgress";
import { normalizeDestination } from "@utils/destination/normalizeDestination";
import { IUseDataDestination } from "@ptypes/hooks/moneyDestination/IUseDataDestination";
import { IRequestsInProgress } from "@ptypes/requestInProgress/IRequestsInProgress";
import { IEditData } from "@ptypes/hooks/moneyDestination/IEditData";
import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";
import { IDecisionsByRule } from "@ptypes/context/creditLinesConstruction/IDecisionsByRule";

const useDataDestination = (props: IUseDataDestination) => {
  const { id, requestNumber, option, moneyDestinationData } = props;
  const { appData } = useContext(AuthAndPortalData);
  const [loading, setLoading] = useState<boolean>(false);
  const [requestsInProgress, setRequestsInProgress] = useState<
    IRequestsInProgress[]
  >([]);
  const [moneyDestination, setMoneyDestination] = useState<IEditData>({
    id: "",
    nameDestination: "",
    description: "",
    icon: "",
    typeDestination: "",
    creditLine: "",
  });

  const { enumData: type, loading: loadingEnum } = useEnumeratorsCrediboard({
    businessUnits: appData.businessUnit.publicCode,
    enumQuery: EMoneyDestination.DESTINATION_TYPE,
    token: appData.token,
  });

  const ruleLineCredit = (configurationRequest: any) => {
    const valuesRules: string[] = [];

    const rules = configurationRequest?.rules;

    if (!rules || !Array.isArray(rules) || rules.length === 0) return "";

    rules.forEach((rule: IRules) => {
      rule.decisionsByRule?.forEach((decision: IDecisionsByRule) => {
        if (decision.value) valuesRules.push(decision.value as string);
      });
    });

    return valuesRules.length > 0 ? valuesRules.join(", ") : "";
  };
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
    if (option === EManagementType.CURRENT && moneyDestinationData) {
      setMoneyDestination(moneyDestinationData);
    }
  }, [id, requestNumber, option, appData.businessUnit.publicCode]);

  const data = useMemo(() => {
    if (
      option === EManagementType.IN_PROGRESS &&
      requestsInProgress.length > 0
    ) {
      const configurationRequest = requestsInProgress.find(
        (item) => item,
      )?.configurationRequestData;

      return {
        id: requestsInProgress?.[0].id as string,
        nameDestination: configurationRequest?.abbreviatedName as string,
        description: configurationRequest?.descriptionUse as string,
        icon: configurationRequest?.iconReference as string,
        typeDestination: configurationRequest?.moneyDestinationType as string,
        creditLine: ruleLineCredit(configurationRequest),
      };
    }

    if (
      option === EManagementType.CURRENT &&
      Object.values(moneyDestination).length > 0
    ) {
      return moneyDestinationData;
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
      data?.typeDestination ?? "",
    );
    const valueTypeDestination =
      typeDestination?.i18n?.[
        appData.language as keyof typeof typeDestination.i18n
      ] ?? typeDestination?.description;

    return {
      ...data,
      typeDestination: valueTypeDestination ?? data?.typeDestination,
    };
  }, [data, type, loadingEnum, appData.language]);

  return { transformedMoneyDestination, loading };
};

export { useDataDestination };
