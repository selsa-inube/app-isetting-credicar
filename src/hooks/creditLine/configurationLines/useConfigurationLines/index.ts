/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";
import { IRuleDecision } from "@isettingkit/input";
import {
  IDragAndDropColumn,
  IDropdownMenuGroup,
} from "@isettingkit/business-rules";
import { FormikProps } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import { CreditLinesConstruction } from "@context/creditLinesConstruction";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { postCheckLineRuleConsistency } from "@services/creditLines/postCheckLineRuleConsistency";
import { useStepNavigation } from "@hooks/creditLine/useStepNavigation";
import { useEnumRules } from "@hooks/moneyDestination/useEnumRules";
import { useAutoSaveOnRouteChange } from "@hooks/creditLine/useAutoSaveOnRouteChange";
import { useSaveCreditlines } from "@hooks/creditLine/saveCreditLine/useSaveCreditlines";
import { compareObjects } from "@utils/compareObjects";
import { capitalizeText } from "@utils/capitalizeText";
import { transformationDecisions } from "@utils/transformationDecisions";
import { formatRuleDecisionsConfig } from "@utils/formatRuleDecisionsConfig";
import { optionTitleConfiguration } from "@utils/optionTitleConfiguration";
import { errorObject } from "@utils/errorObject";
import { ECreditLines } from "@enum/creditLines";
import { EUseCase } from "@enum/useCase";
import { clientsSupportLineLabels } from "@config/creditLines/configuration/clientsSupportLineLabels";
import { IErrors } from "@ptypes/IErrors";
import { ILinesConstructionData } from "@ptypes/context/creditLinesConstruction/ILinesConstructionData";
import { IUseConfigurationLines } from "@ptypes/hooks/creditLines/IUseConfigurationLines";
import { IModifyConstructionResponse } from "@ptypes/creditLines/IModifyConstructionResponse";
import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";
import { INameAndDescriptionEntry } from "@ptypes/creditLines/forms/INameAndDescriptionEntry";
import { ILanguage } from "@ptypes/i18n";
import { IPostCheckLineRule } from "@ptypes/creditLines/ISaveDataRequest";
import { useModalConfiguration } from "../useModalConfiguration";
import { useGroupOptions } from "../useGroupOptions";

const useConfigurationLines = (props: IUseConfigurationLines) => {
  const { templateKey } = props;

  const initialValues = {
    nameAndDescription: {
      aliasLine: "",
      nameLine: "",
      descriptionLine: "",
    },
    rules: [] as IRules[],
  };

  const { appData } = useContext(AuthAndPortalData);
  const [formValues, setFormValues] = useState(initialValues);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [showGoBackModal, setShowGoBackModal] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [canRefresh, setCanRefresh] = useState(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [linesData, setLinesData] = useState<IModifyConstructionResponse>();
  const [decisionsData, setDecisionData] = useState<IRuleDecision[]>([]);
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const [errorCheckData, setErrorCheckData] = useState<IErrors>({} as IErrors);
  const {
    setLinesConstructionData,
    setLoadingInitial,
    linesConstructionData,
    useCaseConfiguration,
  } = useContext(CreditLinesConstruction);
  const [data, setData] = useState<IModifyConstructionResponse>();
  const [unconfiguredRules, setUnconfiguredRules] = useState<
    IPostCheckLineRule[]
  >([]);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState<boolean>(false);
  const [showRequestProcessModal, setShowRequestProcessModal] =
    useState<boolean>(false);
  const [showUnconfiguredModal, setShowUnconfiguredModal] =
    useState<boolean>(false);
  const [clientSupportData, setClientSupportData] = useState<IRules[]>();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [showInfoErrorModal, setShowInfoErrorModal] = useState<boolean>(false);
  const [hasErrorCheck, setHasErrorCheck] = useState(false);
  const [optionsIncluded, setOptionsIncluded] = useState<IDragAndDropColumn>({
    legend: clientsSupportLineLabels.titleCustomerProfiles,
    items: [],
    emptyMessage: clientsSupportLineLabels.withoutIncluding,
    highlightFirst: true,
  });

  const [optionsExcluded, setOptionsExcluded] = useState<IDragAndDropColumn>({
    legend: clientsSupportLineLabels.titleDoesNotApply,
    items: [],
    emptyMessage: clientsSupportLineLabels.withoutExcluding,
    highlightFirst: false,
  });
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    setIsUpdated(false);
    setDecisionData([]);
  }, [location.pathname, templateKey]);

  const { linesConstructionData: initialData, loadingInitial: loading } =
    useContext(CreditLinesConstruction);

  useEffect(() => {
    if (
      !initialData.abbreviatedName &&
      !initialData.alias &&
      !initialData.descriptionUse
    ) {
      setFormValues(initialValues);
    } else {
      setFormValues((prev) => ({
        ...prev,
        nameAndDescription: {
          aliasLine: initialData.alias || "",
          nameLine: initialData.abbreviatedName || "",
          descriptionLine: initialData.descriptionUse || "",
        },
        rules: initialData.rules || [],
      }));
    }
  }, [
    initialData.abbreviatedName,
    initialData.alias,
    initialData.descriptionUse,
  ]);

  const { borrowerData, loading: loadingModify } = useAutoSaveOnRouteChange({
    option: useCaseConfiguration,
    linesData: linesData,
    userAccount: appData.user.userAccount,
    withNeWData: isUpdated,
    setIsUpdated,
  });

  const handleToggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

  const nameLineRef = useRef<FormikProps<INameAndDescriptionEntry>>(null);

  const handleOpenModal = () => {
    const compare = compareObjects(initialValues, formValues);
    const compareCompany = compareObjects(
      nameLineRef.current?.initialValues,
      nameLineRef.current?.values,
    );
    if (!compare || !compareCompany) {
      setShowGoBackModal(true);
    } else {
      navigate("/credit-lines");
    }
  };

  const handleGoBack = () => {
    setCanRefresh(true);
    navigate("/credit-lines");
  };

  const handleToggleErrorModal = () => {
    setHasError(!hasError);

    if (hasErrorCheck) {
      setHasErrorCheck(!hasErrorCheck);
    }
  };

  const handleCloseModal = () => {
    setShowGoBackModal(!showGoBackModal);
  };

  const handleToggleUnconfiguredRulesModal = () => {
    setShowUnconfiguredModal(!showUnconfiguredModal);
  };

  const handleUnconfiguredRules = () => {
    onSubmit();
    if (!loadingModify) {
      navigate("/credit-lines");
    }
  };

  const handleToggleSaveModal = () => {
    setShowSaveModal(!showSaveModal);
  };

  const handleSaveModal = () => {
    onSubmit();
  };

  const handleClickInfo = () => {
    setShowInfoErrorModal(!showInfoErrorModal);
  };

  const onSubmit = () => {
    setShowSaveModal(false);
    const { settingRequestId, ...dataWithoutId } = linesConstructionData;

    setData({
      settingRequestId: settingRequestId,
      configurationRequestData: dataWithoutId as Record<string, unknown>,
    });
    setShowRequestProcessModal(true);
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const hasUnsavedChanges =
        !compareObjects(initialValues, formValues) ||
        (nameLineRef.current &&
          !compareObjects(
            nameLineRef.current.initialValues,
            nameLineRef.current.values,
          ));

      if (hasUnsavedChanges) {
        event.preventDefault();
        setShowGoBackModal(!showGoBackModal);

        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [formValues, initialValues, nameLineRef, canRefresh]);

  const { ruleData } = useEnumRules({
    enumDestination: templateKey ?? "",
    ruleCatalog: ECreditLines.RULE_CATALOG,
    catalogAction: capitalizeText(ECreditLines.RULE_CATALOG),
    businessUnits: appData.businessUnit.publicCode,
  });

  const lineNameDecision = formValues.nameAndDescription.nameLine;
  const lineTypeDecision =
    (ruleData.i18n?.[
      appData.language as keyof typeof ruleData.i18n
    ] as string) ?? "";

  const ruleDict = {
    [String(ruleData.ruleName)]: {
      labelName: ruleData.i18n?.[appData.language as any] ?? ruleData.ruleName,
      descriptionUse:
        ruleData.i18n?.[appData.language as any] ?? ruleData.ruleName,
      decisionDataType: "alphabetical",
      howToSetTheDecision: "EqualTo",
    },
  };

  const conditionDict = {
    MoneyDestination: {
      labelName: "Que el Destino del dinero sea",
      descriptionUse: "Destino del dinero",
      conditionDataType: "Alphabetical",
      howToSetTheCondition: "EqualTo",
      listOfPossibleValues: [],
    },
    LineOfCredit: {
      labelName: "Línea de crédito",
      descriptionUse: "Línea de crédito",
      conditionDataType: "Alphabetical",
      howToSetTheCondition: "EqualTo",
      listOfPossibleValues: [],
    },
  };

  const initialDecisions: IRuleDecision[] = (linesConstructionData.rules ?? [])
    .filter((r) => r.ruleName === ruleData.ruleName)
    .flatMap((r) => transformationDecisions(r, { ruleDict, conditionDict }));

  const language = appData.language as ILanguage;

  const newData: {
    abbreviatedName?: string;
    alias?: string;
    descriptionUse?: string;
  } = {};

  useEffect(() => {
    if (!nameLineRef.current?.values) return;

    newData.alias = nameLineRef.current?.values.aliasLine;
    newData.abbreviatedName = nameLineRef.current?.values.nameLine;
    newData.descriptionUse = nameLineRef.current?.values.descriptionLine;

    if (Object.values(newData).length > 0)
      setLinesData((prev) => ({
        ...prev,
        settingRequestId: linesConstructionData.settingRequestId,
        configurationRequestData: {
          ...prev?.configurationRequestData,
          ...newData,
        },
      }));
  }, [nameLineRef.current?.values]);

  const mergeRules = (
    existingRules: IRuleDecision[] = [],
    newRules: IRuleDecision[] = [],
  ): IRuleDecision[] => {
    if (!newRules || newRules.length === 0) {
      return existingRules;
    }

    const newRulesMap = new Map(newRules.map((rule) => [rule.ruleName, rule]));

    const filteredExisting = existingRules.filter(
      (rule) => !newRulesMap.has(rule.ruleName),
    );

    return [...filteredExisting, ...newRules];
  };

  useEffect(() => {
    if (decisionsData.length === 0) return;

    const validateUseEdit = useCaseConfiguration === EUseCase.EDIT;

    const newFormattedRules = formatRuleDecisionsConfig(
      decisionsData,
      validateUseEdit,
    );
    setLinesData((prev) => {
      const existingRules =
        (prev?.configurationRequestData?.rules as
          | IRuleDecision[]
          | undefined) ??
        (linesConstructionData.rules as IRuleDecision[] | undefined) ??
        [];

      return {
        ...prev,
        settingRequestId: linesConstructionData.settingRequestId,
        configurationRequestData: {
          ...prev?.configurationRequestData,
          alias: linesConstructionData.alias,
          abbreviatedName: linesConstructionData.abbreviatedName,
          descriptionUse: linesConstructionData.descriptionUse,
          rules: mergeRules(existingRules, newFormattedRules),
        },
      };
    });
  }, [decisionsData]);

  useEffect(() => {
    setLinesData((prev) => {
      const existingRules =
        (prev?.configurationRequestData?.rules as
          | IRuleDecision[]
          | undefined) ??
        (linesConstructionData.rules as IRuleDecision[] | undefined) ??
        [];

      return {
        ...prev,
        settingRequestId: linesConstructionData.settingRequestId,
        configurationRequestData: {
          ...prev?.configurationRequestData,
          alias: linesConstructionData.alias,
          abbreviatedName: linesConstructionData.abbreviatedName,
          descriptionUse: linesConstructionData.descriptionUse,
          rules: mergeRules(existingRules, clientSupportData),
        },
      };
    });
  }, [clientSupportData]);

  const loadingModifyRef = useRef(loadingModify);
  const savePromiseRef = useRef<((value: boolean) => void) | null>(null);

  useEffect(() => {
    const wasLoading = loadingModifyRef.current;
    loadingModifyRef.current = loadingModify;

    if (wasLoading && !loadingModify && savePromiseRef.current) {
      savePromiseRef.current(true);
      savePromiseRef.current = null;
    }
  }, [loadingModify]);

  useEffect(() => {
    if (useCaseConfiguration !== EUseCase.DETAILS) {
      const currentFormValues = nameLineRef.current?.values;
      const hasFormChanges =
        currentFormValues &&
        (currentFormValues.aliasLine !== (initialData.alias || "") ||
          currentFormValues.nameLine !== (initialData.abbreviatedName || "") ||
          currentFormValues.descriptionLine !==
            (initialData.descriptionUse || ""));

      setHasUnsavedChanges(
        Boolean(
          hasFormChanges || decisionsData.length > 0 || clientSupportData,
        ),
      );
    }
  }, [nameLineRef.current?.values, decisionsData, clientSupportData]);

  useEffect(() => {
    setTimeout(() => {
      if (
        useCaseConfiguration === EUseCase.ADD &&
        !isUpdated &&
        hasUnsavedChanges
      ) {
        setIsUpdated(true);
      }
    }, 5000);
  }, [useCaseConfiguration, hasUnsavedChanges, isUpdated]);

  const handleStep = async (click: boolean): Promise<boolean> => {
    if (!click) {
      setIsUpdated(false);
      return true;
    }

    if (useCaseConfiguration === EUseCase.ADD && hasUnsavedChanges) {
      setIsUpdated(true);

      return new Promise((resolve) => {
        savePromiseRef.current = resolve;
      });
    }
    return true;
  };

  const handleSave = async (click: boolean): Promise<boolean> => {
    if (!click) {
      setShowSaveModal(false);
      setIsUpdated(false);
      setShowUnconfiguredModal(false);
      return true;
    }

    console.log({ useCaseConfiguration }, "EUseCase", EUseCase.ADD);

    if (useCaseConfiguration === EUseCase.ADD) {
      setIsUpdated(true);
      try {
        const result = await postCheckLineRuleConsistency(
          appData.user.userAccount,
          { rules: linesConstructionData.rules || [] },
          appData.businessUnit.publicCode,
        );
        setUnconfiguredRules(result);

        if (result.length > 0) {
          setShowUnconfiguredModal(true);
        } else {
          setShowSaveModal(true);
        }
      } catch (error) {
        console.info(error);
        setHasErrorCheck(true);
        setErrorCheckData(errorObject(error));
      }
    }

    return new Promise((resolve) => {
      savePromiseRef.current = resolve;
    });
  };

  const { groups } = useGroupOptions();

  const validateDisabled =
    loadingModify ||
    (templateKey === "CreditLineByRiskProfile" &&
      optionsIncluded.items.length === 0) ||
    (location.pathname ===
      "/credit-lines/edit-credit-lines/line-Names-Descriptions" &&
      !isCurrentFormValid);

  const nav = useStepNavigation({
    groups: groups as unknown as IDropdownMenuGroup[],
    disabledButtons: validateDisabled,
    handleStep,
    handleSave,
  });

  useEffect(() => {
    if (loadingModify) {
      setLoadingInitial(true);
    } else {
      setLoadingInitial(false);
      if (borrowerData?.settingRequestId) {
        const normalizeData: ILinesConstructionData = {
          settingRequestId: linesConstructionData.settingRequestId,
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
  }, [loadingModify, borrowerData?.settingRequestId, setLinesConstructionData]);

  console.log({ linesConstructionData });

  const {
    saveCreditLines,
    requestSteps,
    loadingSendData,
    showPendingModal,
    hasError: hasErrorSave,
    errorData,
    networkError,
    errorFetchRequest,
    showRequestStatusModal,
    handleToggleErrorModal: handleToggleErrorSaveModal,
    handleCloseRequestStatus,
    handleCloseProcess,
    handleClosePendingModal,
  } = useSaveCreditlines({
    useCase: useCaseConfiguration as EUseCase,
    businessUnits: appData.businessUnit.publicCode,
    userAccount: appData.user.userAccount,
    sendData: showRequestProcessModal,
    data: data || ({} as IModifyConstructionResponse),
    setSendData: setShowRequestProcessModal,
    setShowModal: setShowSaveModal,
  });

  const { modalData, showDecision } = useModalConfiguration({
    showGoBackModal,
    loading,
    hasError: false,
    errorData: {} as IErrors,
    showSaveModal,
    loadingSendData,
    hasErrorRequest: hasErrorSave,
    networkError,
    errorFetchRequest,
    showInfoErrorModal,
    hasErrorCheck,
    errorCheckData,
    handleClickInfo,
    handleToggleSaveModal,
    handleSaveModal,
    handleCloseModal,
    handleGoBack,
    handleToggleErrorModal,
    handleToggleErrorSaveModal,
  });

  const optionDetails =
    useCaseConfiguration === EUseCase.DETAILS ? true : false;

  const { title, description, optionCrumb } =
    optionTitleConfiguration(useCaseConfiguration);

  return {
    loading,
    initialValues,
    showDecision,
    modalData,
    canRefresh,
    showInfoModal,
    optionsExcluded,
    optionsIncluded,
    isCurrentFormValid,
    nameLineRef,
    formValues,
    saveCreditLines,
    showRequestProcessModal,
    showRequestStatusModal,
    isUpdated,
    lineNameDecision,
    lineTypeDecision,
    initialDecisions,
    language,
    ruleData,
    nav,
    loadingModify,
    requestSteps,
    loadingSendData,
    showPendingModal,
    hasErrorSave,
    errorData,
    networkError,
    errorFetchRequest,
    unconfiguredRules,
    showUnconfiguredModal,
    showSaveModal,
    showInfoErrorModal,
    useCaseConfiguration,
    title,
    description,
    optionCrumb,
    optionDetails,
    handleClickInfo,
    setClientSupportData,
    handleToggleUnconfiguredRulesModal,
    handleUnconfiguredRules,
    handleToggleErrorSaveModal,
    handleToggleErrorModal,
    handleCloseRequestStatus,
    handleCloseProcess,
    handleClosePendingModal,
    setDecisionData,
    setIsCurrentFormValid,
    setFormValues,
    setOptionsIncluded,
    setOptionsExcluded,
    handleToggleInfoModal,
    handleOpenModal,
  };
};

export { useConfigurationLines };
