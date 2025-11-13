import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CreditLinesConstruction } from "@context/creditLinesConstruction";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { patchModifyConstruction } from "@services/creditLines/patchModifyConstruction";
import { useEnumAllRulesConfiguration } from "@hooks/useEnumAllRulesConfiguration";
import { useGroupRules } from "@hooks/creditLine/useGroupRules";
import { messageErrorStatusConsultation } from "@utils/messageErrorStatusConsultation";
import { errorObject } from "@utils/errorObject";
import { EComponentAppearance } from "@enum/appearances";
import { ECreditLines } from "@enum/creditLines";
import { EUseCase } from "@enum/useCase";
import { errorModal } from "@config/errorModal";
import { withoutDataModal } from "@config/withoutData";
import { ILinesConstructionData } from "@ptypes/context/creditLinesConstruction/ILinesConstructionData";
import { IModifyConstructionResponse } from "@ptypes/creditLines/IModifyConstructionResponse";
import { IUseConfigurationInitial } from "@ptypes/hooks/creditLines/IUseConfigurationInitial";
import { IErrors } from "@ptypes/IErrors";
import { INavigationRule } from "@ptypes/creditLines/INavigationRule";

const useConfigurationInitial = (props: IUseConfigurationInitial) => {
  const { data, option } = props;
  const { appData } = useContext(AuthAndPortalData);
  const {
    optionsAllRules,
    allValidRules,
    setOptionsAllRules,
    setLinesConstructionData,
    setLinesEditData,
    setLoadingInitial,
    setUseCaseConfiguration,
  } = useContext(CreditLinesConstruction);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showErrorRulesModal, setShowErrorRulesModal] =
    useState<boolean>(false);

  const [showWithoutDataModal, setShowWithoutDataModal] =
    useState<boolean>(false);
  const [showDecision, setShowDecision] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [linesData, setLinesData] = useState<any>();
  const [borrowerData, setBorrowerData] = useState<IModifyConstructionResponse>(
    {} as IModifyConstructionResponse,
  );
  const [hasError, setHasError] = useState(false);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const withoutData = data === undefined;

  const ruleCatalog = ECreditLines.RULE_CATALOG;
  const catalogAction = ECreditLines.CATALOG_ACTION;
  const { optionsGroups } = useGroupRules();

  const {
    optionsAllRules: rules,
    enumRuleData,
    hasError: hasErrorAllRules,
    loading: loadingAllRules,
    setHasError: setHasErrorAllRules,
  } = useEnumAllRulesConfiguration({
    ruleCatalog,
    catalogAction,
    optionsContext: optionsAllRules,
    validRules: allValidRules,
  });

  useEffect(() => {
    setLinesEditData({} as ILinesConstructionData);
  }, []);

  useEffect(() => {
    if (enumRuleData.length > 0) {
      setOptionsAllRules(rules as INavigationRule[]);
    }
  }, [enumRuleData]);

  useEffect(() => {
    if (!withoutData) {
      if (data.configurationRequestData === undefined) {
        const dataInitial = {
          configurationRequestData: {
            abbreviatedName: data.abbreviatedName,
            alias: data.alias,
            descriptionUse: data.descriptionUse,
          },
          settingRequestId: data.lineOfCreditId,
        };
        setLinesData(dataInitial);
      } else {
        setLinesData({
          settingRequestId: data.settingRequestId,
          configurationRequestData: data.configurationRequestData,
        });
      }
      setUseCaseConfiguration(option);
    }
  }, [option, data]);

  useEffect(() => {
    const fetchLinesConstructiontData = async () => {
      setHasError(false);
      setErrorData({} as IErrors);
      setBorrowerData({} as IModifyConstructionResponse);

      if (linesData && option === EUseCase.ADD) {
        setLoading(true);
        try {
          const data = await patchModifyConstruction(
            appData.user.userAccount,
            linesData,
          );
          setBorrowerData(data);
        } catch (error) {
          console.info(error);
          setHasError(true);
          setErrorData(errorObject(error));
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchLinesConstructiontData();
  }, [linesData?.settingRequestId]);

  useEffect(() => {
    if (loading) {
      setLoadingInitial(true);
    } else {
      setLoadingInitial(false);
      if (!loading) {
        if (option === EUseCase.ADD && borrowerData?.settingRequestId) {
          const normalizeData: ILinesConstructionData = {
            settingRequestId: data.settingRequestId,
            abbreviatedName: String(
              borrowerData.configurationRequestData?.abbreviatedName ?? "",
            ),
            alias: String(borrowerData.configurationRequestData?.alias ?? ""),
            descriptionUse: String(
              borrowerData.configurationRequestData?.descriptionUse ?? "",
            ),
            lineOfCreditId: borrowerData.settingRequestId,
          };

          if (borrowerData.configurationRequestData?.rules) {
            normalizeData.rules = Object(
              borrowerData.configurationRequestData.rules,
            );
          }
          setLinesConstructionData((prev) => ({
            ...prev,
            ...normalizeData,
          }));
        }
      }

      if (!loadingAllRules && !hasErrorAllRules) {
        setTimeout(() => {
          navigate("/credit-lines/edit-credit-lines/line-Names-Descriptions");
        }, 500);
      }
    }
  }, [loading, option, borrowerData?.settingRequestId]);

  useEffect(() => {
    if (!linesData) {
      setLoadingInitial(true);
    } else {
      setLoadingInitial(false);
      if (!loading) {
        if (option !== EUseCase.ADD && linesData) {
          const normalizeData: ILinesConstructionData = {
            settingRequestId: linesData.settingRequestId,
            abbreviatedName: String(
              linesData.configurationRequestData?.abbreviatedName ?? "",
            ),
            alias: String(linesData.configurationRequestData?.alias ?? ""),
            descriptionUse: String(
              linesData.configurationRequestData?.descriptionUse ?? "",
            ),
            lineOfCreditId: linesData.settingRequestId,
          };

          if (linesData.configurationRequestData?.rules) {
            normalizeData.rules = Object(
              linesData.configurationRequestData.rules,
            );
          }
          setLinesConstructionData((prev) => ({
            ...prev,
            ...normalizeData,
          }));
        }
      }

      if (!loadingAllRules && !hasErrorAllRules) {
        setTimeout(() => {
          navigate("/credit-lines/edit-credit-lines/line-Names-Descriptions");
        }, 500);
      }
    }
  }, [loading, option, linesData, hasErrorAllRules, loadingAllRules]);

  const handleToggleErrorModal = () => {
    setHasError(!hasError);
    if (hasError) {
      setShowErrorModal(false);
    }
  };

  const handleToggleErrorRulesModal = () => {
    setHasErrorAllRules(!hasErrorAllRules);
    if (hasErrorAllRules) {
      setShowErrorRulesModal(false);
    }
  };

  const handleToggleWithouDataModal = () => {
    setShowWithoutDataModal(!showWithoutDataModal);
    navigate("/credit-lines");
  };
  useEffect(() => {
    const decision =
      showErrorModal ||
      showWithoutDataModal ||
      hasError ||
      hasErrorAllRules ||
      showErrorRulesModal ||
      withoutData;
    setShowDecision(decision);
  }, [showErrorModal, showWithoutDataModal, hasError, hasErrorAllRules]);

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
        onCloseModal: handleToggleErrorModal,
        onClick: handleToggleErrorModal,
        withCancelButton: false,
        withIcon: true,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    if (!loadingAllRules && hasErrorAllRules) {
      return {
        ...errorModal(messageErrorStatusConsultation(errorData.status)),
        onCloseModal: handleToggleErrorRulesModal,
        onClick: handleToggleErrorRulesModal,
        withCancelButton: false,
        withIcon: true,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    if (data === undefined && !hasErrorAllRules) {
      return {
        ...withoutDataModal,
        onCloseModal: handleToggleWithouDataModal,
        onClick: handleToggleWithouDataModal,
        withCancelButton: false,
        withIcon: true,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    return initial;
  };

  const modalData = modal();

  return {
    groups: optionsGroups,
    optionsAllRules,
    loadingAllRules,
    showDecision,
    modalData,
  };
};

export { useConfigurationInitial };
