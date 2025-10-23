import { useMediaQuery } from "@inubekit/inubekit";
import { useState, useEffect, useContext } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { getMoneyDestinationData } from "@services/moneyDestination/getMoneyDestination";
import { useValidateUseCase } from "@hooks/useValidateUseCase";
import { useEmptyDataMessage } from "@hooks/emptyDataMessage";
import { useEvaluateRuleByBusinessUnit } from "@hooks/rules/useEvaluateRuleByBusinessUnit";
import { useEnumeratorsCrediboard } from "@hooks/useEnumeratorsCrediboard";
import { EMoneyDestination } from "@enum/moneyDestination";
import { EComponentAppearance } from "@enum/appearances";
import { errorObject } from "@utils/errorObject";
import { normalizeDestination } from "@utils/destination/normalizeDestination";
import { messageErrorStatusConsultation } from "@utils/messageErrorStatusConsultation";
import { tabLabels } from "@config/moneyDestination/moneyDestinationTab/tabLabels";
import { disabledModal } from "@config/disabledModal";
import { errorModal } from "@config/errorModal";
import { mediaQueryTablet } from "@config/environment";
import { IMoneyDestinationData } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IMoneyDestinationData";
import { IUseMoneyDestination } from "@ptypes/hooks/moneyDestination/IUseMoneyDestination";
import { IErrors } from "@ptypes/IErrors";
import { IEntry } from "@ptypes/design/table/IEntry";
import { extractDecisionValues } from "@utils/extractDecisionValues";
import { useCreditLine } from "../useCreditLine";

const useMoneyDestination = (props: IUseMoneyDestination) => {
  const { businessUnits } = props;

  const { appData } = useContext(AuthAndPortalData);
  const [moneyDestination, setMoneyDestination] = useState<
    IMoneyDestinationData[]
  >([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);
  const [showDecision, setShowDecision] = useState(false);
  const [searchMoneyDestination, setSearchMoneyDestination] =
    useState<string>("");
  const [loading, setLoading] = useState(true);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [entryDeleted, setEntryDeleted] = useState<string | number>("");
  const [dataOptions, setDataOptions] = useState<string>();
  const { disabledButton } = useValidateUseCase({
    useCase: EMoneyDestination.USE_CASE_ADD,
  });

  const { enumData: type, loading: loadingEnum } = useEnumeratorsCrediboard({
    businessUnits: appData.businessUnit.publicCode,
    enumQuery: EMoneyDestination.DESTINATION_TYPE,
  });

  const { optionsCreditLine } = useCreditLine();
  const getRule = (ruleName: string) =>
    useEvaluateRuleByBusinessUnit({
      businessUnits: appData.businessUnit.publicCode,
      rulesData: {
        ruleName,
      },
      language: appData.language,
    });

  const { evaluateRuleData, loading: loadingRule } = getRule(
    EMoneyDestination.LINE_OF_CREDIT,
  );

  useEffect(() => {
    if (evaluateRuleData && evaluateRuleData?.length > 0) {
      const { decisionValues } = extractDecisionValues(evaluateRuleData);

      const data = optionsCreditLine
        .filter((option) => decisionValues.includes(option.id))
        .map((item) => {
          return item.id;
        })
        .join(",");

      setDataOptions(data);
    } else {
      setDataOptions("");
    }
  }, [loadingRule, evaluateRuleData]);

  useEffect(() => {
    const fetchEnumData = async () => {
      setLoading(true);
      try {
        const data = await getMoneyDestinationData(businessUnits);
        const destinationData = data.map((destination) => {
          const typeDestination = normalizeDestination(
            type,
            destination.typeDestination ?? "",
          );
          const valueTypeDestination =
            typeDestination?.i18n?.[
              appData.language as keyof typeof typeDestination.i18n
            ] ?? typeDestination?.description;

          return {
            ...destination,
            typeDestination:
              valueTypeDestination ?? destination.typeDestination,
            creditLine: dataOptions ?? "",
          };
        });
        setMoneyDestination(destinationData);
      } catch (error) {
        console.info(error);
        setHasError(true);
        setErrorData(errorObject(error));
      } finally {
        setLoading(false);
      }
    };

    fetchEnumData();
  }, [loadingEnum, type, evaluateRuleData, dataOptions]);

  useEffect(() => {
    if (entryDeleted) {
      setMoneyDestination((prev) =>
        prev.filter((entry) => entry.id !== entryDeleted),
      );
    }
  }, [entryDeleted]);

  const handleSearchMoneyDestination = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchMoneyDestination(e.target.value);
  };

  const handleToggleInfoModal = () => {
    if (disabledButton && !hasError) {
      setShowInfoModal(!showInfoModal);
    } else {
      setHasError(!hasError);
    }
  };

  const handleToggleErrorModal = () => {
    setHasError(!hasError);
  };

  useEffect(() => {
    const decision = showInfoModal || hasError;
    setShowDecision(decision);
  }, [showInfoModal, hasError]);

  const modal = () => {
    const initial = {
      title: "",
      subtitle: "",
      description: "",
      actionText: "",
      icon: <></>,
      onCloseModal: () => void 0,
      onClick: () => void 0,
      withCancelButton: false,
      withIcon: false,
      appearance: EComponentAppearance.PRIMARY,
      appearanceButton: EComponentAppearance.PRIMARY,
    };

    if (!loading && hasError) {
      return {
        ...errorModal(messageErrorStatusConsultation(errorData.status)),
        onCloseModal: handleToggleInfoModal,
        onClick: handleToggleErrorModal,
        withCancelButton: false,
        withIcon: true,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    if (showInfoModal && !hasError) {
      return {
        ...disabledModal,
        onCloseModal: handleToggleInfoModal,
        onClick: handleToggleInfoModal,
        withCancelButton: false,
        withIcon: false,
        appearance: EComponentAppearance.PRIMARY,
        appearanceButton: EComponentAppearance.PRIMARY,
      };
    }

    return initial;
  };

  const modalData = modal();

  const smallScreen = useMediaQuery(mediaQueryTablet);
  const widthFirstColumn = smallScreen ? 72 : 80;

  const columnWidths = [widthFirstColumn];

  const emptyDataMessage = useEmptyDataMessage({
    loading,
    errorData,
    data: moneyDestination as Omit<IEntry[], "id">,
    smallScreen,
    message: tabLabels,
  });

  return {
    moneyDestination,
    hasError,
    searchMoneyDestination,
    loading,
    smallScreen,
    columnWidths,
    emptyDataMessage,
    disabledButton,
    showInfoModal,
    showDecision,
    modalData,
    handleToggleInfoModal,
    handleSearchMoneyDestination,
    setEntryDeleted,
  };
};

export { useMoneyDestination };
