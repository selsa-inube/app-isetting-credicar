/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { compareObjects } from "@utils/compareObjects";
import { capitalizeText } from "@utils/capitalizeText";
import { transformationDecisions } from "@utils/transformationDecisions";
import { formatRuleDecisionsConfig } from "@utils/formatRuleDecisionsConfig";
import { optionTitleConfiguration } from "@utils/optionTitleConfiguration";
import { errorObject } from "@utils/errorObject";
import { formatDate } from "@utils/date/formatDate";
import { validateEditedRules } from "@utils/validateEditedRules";
import { getConditionsTraduction } from "@utils/getConditionsTraduction";
import { ECreditLines } from "@enum/creditLines";
import { EUseCase } from "@enum/useCase";
import { clientsSupportLineLabels } from "@config/creditLines/configuration/clientsSupportLineLabels";
import { creditLineLabels } from "@config/creditLines/configuration/creditLineLabels";
import { editCreditLabels } from "@config/creditLines/creditLinesTab/generic/editCreditLabels";
import { IErrors } from "@ptypes/IErrors";
import { ILinesConstructionData } from "@ptypes/context/creditLinesConstruction/ILinesConstructionData";
import { IUseConfigurationLines } from "@ptypes/hooks/creditLines/IUseConfigurationLines";
import { IModifyConstructionResponse } from "@ptypes/creditLines/IModifyConstructionResponse";
import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";
import { INameAndDescriptionEntry } from "@ptypes/creditLines/forms/INameAndDescriptionEntry";
import { ILanguage } from "@ptypes/i18n";
import { IPostCheckLineRule } from "@ptypes/creditLines/ISaveDataRequest";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { useModalConfiguration } from "../useModalConfiguration";
import { useGroupOptions } from "../useGroupOptions";
import { useEditCreditLines } from "../useEditCreditLines";
import { useSave } from "../useSave";
import { useModalOnSubmit } from "../useModalOnSubmit";

const useConfigurationLines = (props: IUseConfigurationLines) => {
  const { templateKey } = props;

  const initialValues = {
    nameAndDescription: {
      aliasLine: "",
      nameLine: "",
      descriptionLine: "",
    },
    rules: [] as IRuleDecisionExtended[],
  };

  const { appData } = useContext(AuthAndPortalData);
  const [formValues, setFormValues] = useState(initialValues);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [showGoBackModal, setShowGoBackModal] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [canRefresh, setCanRefresh] = useState(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [linesData, setLinesData] = useState<IModifyConstructionResponse>();
  const [showEditSubmitModal, setShowEditSubmitModal] =
    useState<boolean>(false);
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const [errorCheckData, setErrorCheckData] = useState<IErrors>({} as IErrors);
  const {
    setLinesConstructionData,
    setLoadingInitial,
    linesConstructionData,
    useCaseConfiguration,
    optionsAllRules,
  } = useContext(CreditLinesConstruction);
  const [data, setData] = useState<IModifyConstructionResponse>();
  const [editData, setEditData] = useState<ISaveDataRequest>();

  const [unconfiguredRules, setUnconfiguredRules] = useState<
    IPostCheckLineRule[]
  >([]);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState<boolean>(false);
  const [showRequestProcessModal, setShowRequestProcessModal] =
    useState<boolean>(false);
  const [showUnconfiguredModal, setShowUnconfiguredModal] =
    useState<boolean>(false);
  const [clientSupportData, setClientSupportData] = useState<IRules[]>();
  const [creditLineData, setCreditLineData] = useState<IRules[]>();
  const [decisionsData, setDecisionData] = useState<IRuleDecisionExtended[]>(
    [],
  );
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

  const [creditOptionsExcluded, setCreditOptionsIncluded] =
    useState<IDragAndDropColumn>({
      legend: creditLineLabels.titleCustomerProfiles,
      items: [],
      emptyMessage: creditLineLabels.withoutIncluding,
      highlightFirst: true,
    });
  const [creditOptionsIncluded, setCreditOptionsExcluded] =
    useState<IDragAndDropColumn>({
      legend: creditLineLabels.titleDoesNotApply,
      items: [],
      emptyMessage: creditLineLabels.withoutExcluding,
      highlightFirst: false,
    });

  const navigate = useNavigate();

  const location = useLocation();
  const language = appData.language as ILanguage;

  useEffect(() => {
    setIsUpdated(false);
    setDecisionData([]);
  }, [location.pathname, templateKey]);

  const {
    linesConstructionData: initialData,
    loadingInitial: loading,
    setLinesEditData,
    linesEditData,
  } = useContext(CreditLinesConstruction);

  useEffect(() => {
    if (!loading) {
      if (initialData.settingRequestId.length > 0) {
        const dataConfig: {
          nameAndDescription: {
            aliasLine: string;
            nameLine: string;
            descriptionLine: string;
          };
          rules?: IRuleDecisionExtended[];
        } = {
          nameAndDescription: {
            aliasLine: initialData.alias || "",
            nameLine: initialData.abbreviatedName || "",
            descriptionLine: initialData.descriptionUse || "",
          },
        };

        if (useCaseConfiguration !== EUseCase.EDIT) {
          dataConfig.rules = initialData.rules || [];
        }

        setFormValues((prev) => ({
          ...prev,
          ...dataConfig,
        }));
      } else {
        setFormValues(initialValues);
      }
    }
  }, [initialData]);

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
    const compareName = compareObjects(
      nameLineRef.current?.initialValues,
      nameLineRef.current?.values,
    );
    if (!compare || !compareName) {
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

  const handleEditSubmitModal = () => {
    setShowEditSubmitModal(!showEditSubmitModal);
  };

  const onSubmit = () => {
    setShowSaveModal(false);

    if (useCaseConfiguration === EUseCase.ADD) {
      const { settingRequestId, ...dataWithoutId } = linesConstructionData;
      setData({
        settingRequestId: settingRequestId,
        configurationRequestData: dataWithoutId as Record<string, unknown>,
      });
    }

    if (useCaseConfiguration === EUseCase.EDIT) {
      const { settingRequestId, ...dataWithoutId } = linesEditData;
      setEditData({
        applicationName: "ifac",
        businessManagerCode: appData.businessManager.publicCode,
        businessUnitCode: appData.businessUnit.publicCode,
        description: editCreditLabels.descriptionSaveData,
        entityName: ECreditLines.CREDIT_LINE_ENTITY,
        requestDate: formatDate(new Date()),
        useCaseName: ECreditLines.USE_CASE_EDIT,
        configurationRequestData: dataWithoutId,
      });
    }
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

  const { conditionTraduction, ruleNameTraduction, conditionCreditLine } =
    getConditionsTraduction(ruleData, language);

  const lineNameDecision = formValues.nameAndDescription.nameLine;
  const lineTypeDecision =
    (ruleData.i18n?.[
      appData.language as keyof typeof ruleData.i18n
    ] as string) ?? "";

  const mergeRules = (
    existingRules: IRuleDecision[] = [],
    newRules: IRuleDecision[] = [],
  ): IRuleDecision[] => {
    if (!newRules || newRules.length === 0) {
      return existingRules;
    }

    const newRulesGrouped = newRules.reduce(
      (newRule, rule) => {
        const key = rule.ruleName;
        if (!newRule[key as any]) {
          newRule[key as any] = [];
        }
        newRule[key as any].push(rule);
        return newRule;
      },
      {} as Record<string, IRuleDecision[]>,
    );

    const newRuleNames = Object.keys(newRulesGrouped);
    const filteredExisting = existingRules.filter(
      (rule) => !newRuleNames.includes(rule.ruleName ?? ""),
    );

    const mergedNewRules = Object.values(newRulesGrouped).flat();

    return [...filteredExisting, ...mergedNewRules];
  };

  const { ruleError, ruleLoadding, ruleErrorData, optionsConditionsCSV } =
    useEditCreditLines({
      useCaseConfiguration,
      templateKey: templateKey || "",
      decisionsData,
      setLinesConstructionData,
      linesConstructionData,
      clientSupportData,
      mergeRules,
      setLinesEditData,
    });

  const initialDecisions: any[] = (linesConstructionData.rules ?? [])
    .filter((r) => r.ruleName === ruleData.ruleName)
    .flatMap((r) => {
      const rule: IRuleDecisionExtended = {
        ...r,
      };

      return transformationDecisions(
        rule,
        conditionTraduction,
        ruleNameTraduction as string,
      );
    });

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

  useEffect(() => {
    if (decisionsData.length === 0) return;
    const validate = useCaseConfiguration === EUseCase.ADD;
    if (validate) {
      const newFormattedRules = formatRuleDecisionsConfig(
        decisionsData,
        false,
        linesConstructionData.abbreviatedName as string,
        conditionCreditLine,
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
    }
  }, [decisionsData, useCaseConfiguration]);

  useEffect(() => {
    const validate =
      useCaseConfiguration === EUseCase.EDIT ||
      useCaseConfiguration === EUseCase.DETAILS_CONDITIONAL;

    if (!validate) {
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
    }
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

  const validateCase =
    useCaseConfiguration === EUseCase.DETAILS ||
    useCaseConfiguration === EUseCase.DETAILS_CONDITIONAL;

  useEffect(() => {
    if (!validateCase) {
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
      setShowEditSubmitModal(false);
      return true;
    }
    if (useCaseConfiguration === EUseCase.ADD) {
      setIsUpdated(true);
      try {
        const result = await postCheckLineRuleConsistency(
          appData.user.userAccount,
          {
            rules: (linesConstructionData.rules || []).map((rule) => ({
              ...rule,
              decisionsByRule: rule.decisionsByRule ?? [],
            })) as IRules[],
          },
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

    if (useCaseConfiguration === EUseCase.EDIT) {
      setShowEditSubmitModal(true);
    }

    return new Promise((resolve) => {
      savePromiseRef.current = resolve;
    });
  };

  const { groups } = useGroupOptions();

  const optionDetails =
    useCaseConfiguration === EUseCase.DETAILS ||
    useCaseConfiguration === EUseCase.DETAILS_CONDITIONAL
      ? true
      : false;

  const validateConfig = () => {
    if (loadingModify) {
      return true;
    }

    if (
      !optionDetails &&
      templateKey === ECreditLines.CLIENT_SUPPORT_RULE &&
      optionsIncluded.items.length === 0
    ) {
      return true;
    }

    if (
      !optionDetails &&
      templateKey === ECreditLines.CREDIT_LINE_RULE &&
      optionsIncluded.items.length === 0
    ) {
      return true;
    }

    if (
      location.pathname ===
        "/credit-lines/edit-credit-lines/line-Names-Descriptions" &&
      !isCurrentFormValid
    ) {
      return true;
    }
    return false;
  };

  const validateDisabled = validateConfig();

  const validateButtonSend = Boolean(
    useCaseConfiguration === EUseCase.EDIT &&
      Object.entries(linesEditData).length === 0,
  );

  const nav = useStepNavigation({
    groups: groups as unknown as IDropdownMenuGroup[],
    disabledButtons: validateDisabled,
    disabledButtonSend: validateButtonSend,
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

  const {
    saveCreditLines,
    requestSteps,
    loadingSendData,
    showPendingModal,
    showRequestStatusModal,
    hasError: hasErrorSave,
    errorData,
    networkError,
    errorFetchRequest,
    handleToggleErrorModal: handleToggleErrorSaveModal,
    handleCloseRequestStatus,
    handleCloseProcess,
    handleClosePendingModal,
  } = useSave({
    useCaseConfiguration,
    showRequestProcessModal,
    data,
    editData: editData as ISaveDataRequest,
    setShowRequestProcessModal,
    setShowSaveModal,
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
    ruleLoadding,
    ruleError,
    ruleErrorData,
    handleClickInfo,
    handleToggleSaveModal,
    handleSaveModal,
    handleCloseModal,
    handleGoBack,
    handleToggleErrorModal,
    handleToggleErrorSaveModal,
  });

  const { submitModalData, showSendModal } = useModalOnSubmit({
    showConfigSubmitModal: showUnconfiguredModal,
    showEditSubmitModal,
    unconfiguredRules,
    editedRules: validateEditedRules(
      linesEditData,
      optionsAllRules,
    ) as IPostCheckLineRule[],
    onSaveModal: handleSaveModal,
    onEditSubmitModal: handleEditSubmitModal,
    onToggleUnconfiguredRules: handleToggleUnconfiguredRulesModal,
    onUnconfiguredModal: handleUnconfiguredRules,
  });

  const optionIcon =
    useCaseConfiguration === EUseCase.DETAILS ||
    useCaseConfiguration === EUseCase.DETAILS_CONDITIONAL ||
    useCaseConfiguration === EUseCase.EDIT
      ? true
      : false;

  const { title, description, optionCrumb } =
    optionTitleConfiguration(useCaseConfiguration);

  console.log("👀", { linesConstructionData, linesEditData });

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
    showSaveModal,
    showInfoErrorModal,
    useCaseConfiguration,
    title,
    description,
    optionCrumb,
    optionDetails,
    optionIcon,
    optionsConditionsCSV,
    clientSupportData,
    linesConstructionData,
    ruleLoadding,
    linesData,
    submitModalData,
    showSendModal,
    creditOptionsExcluded,
    creditOptionsIncluded,
    creditLineData,
    setCreditLineData,
    setCreditOptionsIncluded,
    setCreditOptionsExcluded,
    handleClickInfo,
    setClientSupportData,
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
