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
import { useStepNavigation } from "@hooks/creditLine/useStepNavigation";
import { useEnumRules } from "@hooks/moneyDestination/useEnumRules";
import { useAutoSaveOnRouteChange } from "@hooks/creditLine/useAutoSaveOnRouteChange";
import { compareObjects } from "@utils/compareObjects";
import { capitalizeText } from "@utils/capitalizeText";
import { transformationDecisions } from "@utils/transformationDecisions";
import { formatRuleDecisionsConfig } from "@utils/formatRuleDecisionsConfig";
import { ECreditLines } from "@enum/creditLines";
import { clientsSupportLineLabels } from "@config/creditLines/configuration/clientsSupportLineLabels";
import { IErrors } from "@ptypes/IErrors";
import { ILinesConstructionData } from "@ptypes/context/creditLinesConstruction/ILinesConstructionData";
import { IUseConfigurationLines } from "@ptypes/hooks/creditLines/IUseConfigurationLines";
import { IModifyConstructionResponse } from "@ptypes/creditLines/IModifyConstructionResponse";
import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";
import { INameAndDescriptionEntry } from "@ptypes/creditLines/forms/INameAndDescriptionEntry";
import { ILanguage } from "@ptypes/i18n";
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

  const { setLinesConstructionData, setLoadingInitial, linesConstructionData } =
    useContext(CreditLinesConstruction);

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);

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
  }, [location.pathname]);

  useEffect(() => {
    setDecisionData([]);
    setIsUpdated(false);
  }, [templateKey]);

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
  };

  const handleCloseModal = () => {
    setShowGoBackModal(!showGoBackModal);
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

  const { modalData, showDecision } = useModalConfiguration({
    showGoBackModal,
    loading,
    hasError: false,
    errorData: {} as IErrors,
    handleCloseModal,
    handleGoBack,
    handleToggleErrorModal,
  });

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
    return [...existingRules, ...newRules];
  };

  useEffect(() => {
    if (decisionsData.length === 0) return;

    const newFormattedRules = formatRuleDecisionsConfig(decisionsData);
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

  const { borrowerData, loading: loadingModify } = useAutoSaveOnRouteChange({
    linesData: linesData,
    userAccount: appData.user.userAccount,
    withNeWData: isUpdated,
  });

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

  const handleStep = async (click: boolean): Promise<boolean> => {
    if (!click) {
      setIsUpdated(false);
      return true;
    }

    const currentFormValues = nameLineRef.current?.values;
    const hasChanges =
      currentFormValues &&
      (currentFormValues.aliasLine !== (initialData.alias || "") ||
        currentFormValues.nameLine !== (initialData.abbreviatedName || "") ||
        currentFormValues.descriptionLine !==
          (initialData.descriptionUse || ""));

    if (hasChanges || decisionsData.length > 0) {
      setIsUpdated(true);

      return new Promise((resolve) => {
        savePromiseRef.current = resolve;
      });
    }

    return true;
  };

  const { groups } = useGroupOptions();

  const nav = useStepNavigation({
    groups: groups as unknown as IDropdownMenuGroup[],
    isProcessing: loadingModify,
    handleStep,
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
    isUpdated,
    lineNameDecision,
    lineTypeDecision,
    initialDecisions,
    language,
    ruleData,
    nav,
    loadingModify,
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
