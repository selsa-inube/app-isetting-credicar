import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import { CreditLinesConstruction } from "@context/creditLinesConstruction";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { patchModifyConstruction } from "@services/creditLines/patchModifyConstruction";
import { useEnumAllRulesConfiguration } from "@hooks/useEnumAllRulesConfiguration";
import { useGroupRules } from "@hooks/creditLine/useGroupRules";
import { errorObject } from "@utils/errorObject";
import { ECreditLines } from "@enum/creditLines";
import { EManagementType } from "@enum/managementType";
import { EUseCase } from "@enum/useCase";
import { ILinesConstructionData } from "@ptypes/context/creditLinesConstruction/ILinesConstructionData";
import { IModifyConstructionResponse } from "@ptypes/creditLines/IModifyConstructionResponse";
import { IUseConfigurationInitial } from "@ptypes/hooks/creditLines/IUseConfigurationInitial";
import { IErrors } from "@ptypes/IErrors";
import { INavigationRule } from "@ptypes/creditLines/INavigationRule";
import { useModalConfigurationInitial } from "../useModalConfigurationInitial";

const useConfigurationInitial = (props: IUseConfigurationInitial) => {
  const { data, option, loadingCreditData, optionRequest } = props;
  const { appData } = useContext(AuthAndPortalData);
  const {
    optionsAllRules,
    allValidRules,
    filterRules,
    setOptionsAllRules,
    setLinesConstructionData,
    setLinesEditData,
    setLoadingInitial,
    setUseCaseConfiguration,
    setOptionRequest,
  } = useContext(CreditLinesConstruction);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showErrorRulesModal, setShowErrorRulesModal] =
    useState<boolean>(false);
  const [showWithoutDataModal, setShowWithoutDataModal] =
    useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [linesData, setLinesData] = useState<any>();
  const [borrowerData, setBorrowerData] = useState<IModifyConstructionResponse>(
    {} as IModifyConstructionResponse,
  );
  const [hasError, setHasError] = useState(false);
  const [errorData, setErrorData] = useState<IErrors>({} as IErrors);
  const [loading, setLoading] = useState(false);
  const hasNavigatedToError = useRef(false);
  const shouldNavigate = useRef(true);

  const navigate = useNavigate();
  const withoutData = data === undefined;

  const ruleCatalog = ECreditLines.RULE_CATALOG;
  const catalogAction = ECreditLines.CATALOG_ACTION;

  useEffect(() => {
    setOptionRequest("");
  }, []);

  const {
    optionsGroups,
    loading: loadingGroupRules,
    hasError: hasErrorGroupRules,
    errorData: errorDataGroupRules,
  } = useGroupRules({ filterRules });

  const {
    optionsAllRules: rules,
    enumRuleData,
    hasError: hasErrorAllRules,
    loading: loadingAllRules,
    setHasError: setHasErrorAllRules,
  } = useEnumAllRulesConfiguration({
    ruleCatalog,
    catalogAction,
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

  const validateOptionrequest = optionRequest === EManagementType.IN_PROGRESS;

  useEffect(() => {
    if (!withoutData) {
      if (Object.values(data).length === 0) return;

      if (data.configurationRequestData === undefined) {
        const dataInitial: {
          configurationRequestData: {
            abbreviatedName: string;
            alias: string;
            descriptionUse: string;
          };
          settingRequestId: string;
          requestNumber?: string;
        } = {
          configurationRequestData: {
            abbreviatedName: data.abbreviatedName,
            alias: data.alias,
            descriptionUse: data.descriptionUse,
          },
          settingRequestId: data.lineOfCreditId,
        };

        if (data.requestNumber) {
          dataInitial.requestNumber = data.requestNumber;
        }
        setLinesData(dataInitial);
      } else {
        const dataFormatted: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          configurationRequestData: any;
          settingRequestId: string;
          requestNumber?: string;
        } = {
          settingRequestId: data.settingRequestId,
          configurationRequestData: data.configurationRequestData,
        };

        if (data.requestNumber) {
          dataFormatted.requestNumber = data.requestNumber;
        }
        setLinesData(dataFormatted);
      }

      if (option) {
        setUseCaseConfiguration(option);
      }

      if (optionRequest) {
        setOptionRequest(optionRequest);
      }
    }
  }, [option, data, optionRequest]);

  useEffect(() => {
    if (!linesData?.settingRequestId) return;
    const fetchLinesConstructiontData = async () => {
      setHasError(false);
      setErrorData({} as IErrors);
      setBorrowerData({} as IModifyConstructionResponse);

      if (
        optionRequest !== EManagementType.IN_PROGRESS &&
        linesData &&
        option === EUseCase.ADD
      ) {
        setLoading(true);
        try {
          const data = await patchModifyConstruction(
            appData.user.userAccount,
            linesData,
            appData.token,
          );
          setBorrowerData(data);
        } catch (error) {
          console.info(error);
          setHasError(true);
          setErrorData(errorObject(error));
          shouldNavigate.current = false;
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchLinesConstructiontData();
  }, [JSON.stringify(linesData)]);

  useEffect(() => {
    if (loading || loadingCreditData) {
      setLoadingInitial(true);
    } else {
      setTimeout(() => setLoadingInitial(false), 2000);
      if (!loading || !loadingCreditData) {
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

      if (
        !hasErrorAllRules &&
        shouldNavigate.current &&
        !hasNavigatedToError.current &&
        data &&
        Object.values(data).length > 0
      ) {
        setTimeout(() => {
          navigate("/credit-lines/edit-credit-lines/line-Names-Descriptions");
        }, 500);
      }
    }
  }, [loading, data, option, borrowerData?.settingRequestId, hasErrorAllRules]);

  useEffect(() => {
    if (!linesData) {
      setLoadingInitial(true);
    } else {
      setLoadingInitial(false);
      if (!loading) {
        if (
          (option !== EUseCase.ADD ||
            (validateOptionrequest && option === EUseCase.ADD)) &&
          linesData
        ) {
          const normalizeData: ILinesConstructionData = {
            settingRequestId: linesData.settingRequestId,
            ...(data.requestNumber && {
              requestNumber: linesData.requestNumber,
            }),
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

      if (
        !loadingAllRules &&
        !loadingCreditData &&
        !hasErrorAllRules &&
        shouldNavigate.current &&
        !hasNavigatedToError.current &&
        data &&
        Object.values(data).length > 0
      ) {
        setTimeout(() => {
          navigate("/credit-lines/edit-credit-lines/line-Names-Descriptions");
        }, 500);
      }
    }
  }, [
    loading,
    option,
    linesData,
    hasErrorAllRules,
    loadingAllRules,
    loadingCreditData,
    data,
    optionRequest,
  ]);

  const handleToggleErrorModal = () => {
    setHasError(!hasError);
    if (hasError) {
      setShowErrorModal(false);
      hasNavigatedToError.current = true;
      shouldNavigate.current = false;
    }
    navigate("/credit-lines");
  };

  const handleToggleErrorRulesModal = () => {
    setHasErrorAllRules(!hasErrorAllRules);
    if (hasErrorAllRules) {
      setShowErrorRulesModal(false);
      hasNavigatedToError.current = true;
      shouldNavigate.current = false;
    }
    navigate("/credit-lines");
  };

  const handleToggleWithouDataModal = () => {
    setShowWithoutDataModal(!showWithoutDataModal);
    hasNavigatedToError.current = true;
    shouldNavigate.current = false;
    navigate("/credit-lines");
  };

  const { showDecision, modalData } = useModalConfigurationInitial({
    errorData,
    showErrorModal,
    showErrorRulesModal,
    loadingGroupRules,
    loading,
    data,
    showWithoutDataModal,
    withoutData,
    hasError,
    hasErrorAllRules,
    loadingAllRules,
    hasErrorGroupRules,
    errorDataGroupRules,
    optionRequest: validateOptionrequest,
    handleToggleErrorModal,
    handleToggleWithouDataModal,
    handleToggleErrorRulesModal,
  });

  return {
    groups: optionsGroups,
    optionsAllRules,
    loadingAllRules,
    loadingGroupRules,
    showDecision,
    modalData,
  };
};

export { useConfigurationInitial };
