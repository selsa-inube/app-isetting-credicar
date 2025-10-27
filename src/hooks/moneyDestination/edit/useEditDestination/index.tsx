import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { IRuleDecision } from "@isettingkit/input";
import { FormikProps } from "formik";
import { useMediaQuery } from "@inubekit/inubekit";

import { useCreditLine } from "@hooks/moneyDestination/useCreditLine";
import { useEnumRules } from "@hooks/moneyDestination/useEnumRules";
import { useEnumsMoneyDestination } from "@hooks/useEnumsMoneyDestination";
import { useEvaluateRuleByBusinessUnit } from "@hooks/rules/useEvaluateRuleByBusinessUnit";
import { ETransactionOperation } from "@enum/transactionOperation";
import { EMoneyDestination } from "@enum/moneyDestination";
import { ECreditLines } from "@enum/creditLines";
import { formatDate } from "@utils/date/formatDate";
import { compareObjects } from "@utils/compareObjects";
import { arraysEqualWithoutDate } from "@utils/compareDecisionsWithoutDate";
import { normalizeDestination } from "@utils/destination/normalizeDestination";
import { formatDateDecision } from "@utils/date/formatDateDecision";
import { findDecisionDestination } from "@utils/findDecisionDestination";
import { editDestinationTabsConfig } from "@config/moneyDestination/editDestination/tabs";
import { mediaQueryTablet } from "@config/environment";
import { editLabels } from "@config/moneyDestination/editDestination/editLabels";
import { IUseEditDestination } from "@ptypes/hooks/moneyDestination/IUseEditDestination";
import { IGeneralInformationEntry } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IGeneralInformationEntry";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { IServerDomain } from "@ptypes/IServerDomain";
import { II18n } from "@ptypes/i18n";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IDecisionWithConditions } from "@ptypes/creditLines/IDecisionWithConditions";
import { IDecisionsByRule } from "@ptypes/context/creditLinesConstruction/IDecisionsByRule";

const useEditDestination = (props: IUseEditDestination) => {
  const { data, appData } = props;
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const getRule = () =>
    useEvaluateRuleByBusinessUnit({
      businessUnits: appData.businessUnit.publicCode,
      rulesData: {
        ruleName: EMoneyDestination.LINE_OF_CREDIT,
        conditions: [
          {
            condition: "MoneyDestination",
            value: data.nameDestination,
          },
        ],
      },
      language: appData.language,
    });
  const {
    evaluateRuleData,
    hasError: hasErrorRule,
    setHasError: setHasErrorRule,
    descriptionError,
  } = getRule();

  const dataEvaluate =
    evaluateRuleData && evaluateRuleData?.length > 0
      ? evaluateRuleData
          .map((item) => {
            return item.value;
          })
          .join(",")
      : "";

  const [isSelected, setIsSelected] = useState<string>(
    editDestinationTabsConfig.generalInformation.id,
  );

  const [formValues, setFormValues] = useState<IGeneralInformationEntry>({
    nameDestination: data.nameDestination ?? "",
    typeDestination: data.typeDestination,
    creditLine: "",
    description: data.description ?? "",
    icon: data.icon ?? "",
    id: data.id ?? "",
  });
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const [showGoBackModal, setShowGoBackModal] = useState(false);
  const [canRefresh, setCanRefresh] = useState(false);
  const [showRequestProcessModal, setShowRequestProcessModal] = useState(false);
  const [saveData, setSaveData] = useState<ISaveDataRequest>();
  const [showModal, setShowModal] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const navigate = useNavigate();
  const navigatePage = "/money-destination";
  const [valuesLine, setValuesLine] = useState<string>("");

  useEffect(() => {
    if (dataEvaluate && !isInitialized) {
      setFormValues((prev) => ({
        ...prev,
        creditLine: dataEvaluate,
      }));
      setIsInitialized(true);
      setValuesLine(dataEvaluate);
    }
  }, [dataEvaluate, isInitialized]);

  const initialGeneralInfData = useMemo(
    () => ({
      nameDestination: data.nameDestination ?? "",
      typeDestination: data.typeDestination,
      creditLine: dataEvaluate ?? "",
      description: data.description ?? "",
      icon: data.icon ?? "",
      id: data.id ?? "",
    }),
    [dataEvaluate, data],
  );
  const { optionsCreditLine, creditLineData } = useCreditLine();

  const generalInformationRef =
    useRef<FormikProps<IGeneralInformationEntry>>(null);
  const [creditLineValues, setCreditLineValues] = useState<IServerDomain[]>([]);

  const conditionRule = "MoneyDestination";

  useEffect(() => {
    setCreditLineValues(optionsCreditLine);
  }, [creditLineData]);

  const { enumDestination } = useEnumsMoneyDestination({
    businessUnits: appData.businessUnit.publicCode,
  });

  const valueName = (name: string) => {
    const normalizeData = normalizeDestination(enumDestination, name);
    return normalizeData?.i18nValue?.[appData.language as keyof II18n] ?? name;
  };

  const { ruleData } = useEnumRules({
    enumDestination: EMoneyDestination.LINE_OF_CREDIT,
    ruleCatalog: ECreditLines.RULE_CATALOG,
    catalogAction: ECreditLines.CATALOG_ACTION,
    businessUnits: appData.businessUnit.publicCode,
  });

  const conditionDestination =
    ruleData.conditionsThatEstablishesTheDecision?.find(
      (condition) => condition.conditionName === "MoneyDestination",
    )?.conditionName;

  const tranformEvaluteDecision = () => {
    if (!evaluateRuleData) return [];

    return evaluateRuleData.map((decision) => {
      const dataEvalute: IDecisionWithConditions = {
        effectiveFrom: formatDateDecision(String(decision.effectiveFrom)),
        value: decision?.value,
      };

      return {
        ruleName: decision.ruleName,
        decisionsByRule: [dataEvalute],
      };
    });
  };

  const currentDate = useMemo(() => formatDate(new Date()), []);

  const getRulesFromCreditLine = (creditLine: string) => {
    const creditLineSelected = creditLine
      .split(",")
      .filter((item) => item.trim());

    if (!creditLineSelected || creditLineSelected.length === 0) return [];
    return creditLineSelected.map((rule) => ({
      ruleName: EMoneyDestination.LINE_OF_CREDIT,
      decisionsByRule: [
        {
          effectiveFrom: currentDate,
          value: rule.trim(),
        },
      ],
    }));
  };
  const getInsertValues = () => {
    const currentRules = getRulesFromCreditLine(valuesLine ?? "");
    const evaluatedRules = tranformEvaluteDecision();

    if (
      arraysEqualWithoutDate(
        currentRules as IRuleDecisionExtended[],
        evaluatedRules as IRuleDecisionExtended[],
      )
    ) {
      return [];
    }

    return currentRules
      .filter((decision) => {
        return !findDecisionDestination(
          evaluatedRules as IRuleDecisionExtended[],
          decision,
        );
      })
      .map((decision) => {
        const decisionsByRule = decision.decisionsByRule?.map((condition) => {
          const data: IDecisionsByRule = {
            effectiveFrom: condition.effectiveFrom,
            value: condition.value,
            transactionOperation: ETransactionOperation.INSERT,
          };

          if (conditionDestination) {
            data.conditionGroups = [
              {
                conditionsThatEstablishesTheDecision: [
                  {
                    conditionName: conditionDestination,
                    value: valueName(formValues.nameDestination),
                  },
                ],
              },
            ];
          }
          return data;
        });

        return {
          modifyJustification: `${editLabels.modifyDecision} ${appData.user.userAccount}`,
          ruleName: decision.ruleName,
          decisionsByRule: decisionsByRule,
        };
      });
  };

  const getDeletedValues = () => {
    const currentRules = getRulesFromCreditLine(valuesLine ?? "");
    const evaluatedRules = tranformEvaluteDecision();

    if (
      arraysEqualWithoutDate(
        currentRules as IRuleDecisionExtended[],
        evaluatedRules as IRuleDecisionExtended[],
      )
    ) {
      return [];
    }

    return evaluatedRules
      .filter(
        (decision) =>
          !findDecisionDestination(
            currentRules,
            decision as IRuleDecisionExtended,
          ),
      )
      .map((decision) => {
        const decisionsByRule = decision.decisionsByRule?.map((condition) => {
          const data: IDecisionsByRule = {
            effectiveFrom: formatDateDecision(
              condition.effectiveFrom as string,
            ),
            value: condition.value,
            transactionOperation: ETransactionOperation.DELETE,
          };

          if (conditionDestination) {
            data.conditionGroups = [
              {
                conditionsThatEstablishesTheDecision: [
                  {
                    conditionName: conditionDestination,
                    value: valueName(formValues.nameDestination),
                  },
                ],
              },
            ];
          }
          return data;
        });
        return {
          modifyJustification: `${editLabels.modifyDecision} ${appData.user.userAccount}`,
          ruleName: decision.ruleName,
          decisionsByRule: decisionsByRule,
        };
      });
  };

  const newDecisions = useMemo(() => {
    const insertValues = getInsertValues().filter(
      (decision) =>
        decision.decisionsByRule && decision.decisionsByRule.length > 0,
    );
    const deleteValues = getDeletedValues().filter(
      (decision) =>
        decision.decisionsByRule && decision.decisionsByRule.length > 0,
    );

    const allValues = [...insertValues, ...deleteValues];

    const mergedDecisions = Object.values(
      allValues.reduce(
        (acc, decision) => {
          const rule = decision.ruleName;

          if (!acc[rule as string]) {
            acc[rule as string] = {
              ruleName: rule,
              modifyJustification: decision.modifyJustification,
              decisionsByRule: [],
            };
          }

          acc[rule as string].decisionsByRule?.push(
            ...(decision.decisionsByRule ?? []),
          );
          return acc;
        },
        {} as Record<string, IRuleDecisionExtended>,
      ),
    );

    return mergedDecisions;
  }, [valuesLine, evaluateRuleData, conditionDestination]);

  const onSubmit = () => {
    const currentValues = generalInformationRef.current?.values;
    const compare =
      JSON.stringify(initialGeneralInfData) === JSON.stringify(formValues);

    const valuesUpdatedName =
      initialGeneralInfData.nameDestination !== currentValues?.nameDestination;
    const valuesUpdatedDesc =
      initialGeneralInfData.description !== currentValues?.description;
    const valuesUpdatedLine =
      initialGeneralInfData.creditLine !== currentValues?.creditLine;

    const configurationRequestData: {
      moneyDestinationId: string;
      modifyJustification: string;
      abbreviatedName?: string;
      descriptionUse?: string;
      iconReference?: string;
      creditLine?: string;
      rules?: IRuleDecision[];
    } = {
      moneyDestinationId: data.id,
      modifyJustification: `${editLabels.modifyJustification} ${appData.user.userAccount}`,
    };

    if (currentValues?.nameDestination !== undefined && valuesUpdatedName) {
      configurationRequestData.abbreviatedName = valueName(
        currentValues?.nameDestination,
      );
      configurationRequestData.iconReference = currentValues?.icon;
    }
    if (currentValues?.description !== undefined && valuesUpdatedDesc) {
      configurationRequestData.descriptionUse = currentValues?.description;
    }

    if (currentValues?.creditLine !== undefined && valuesUpdatedLine)
      if (!compare) {
        if (
          initialGeneralInfData.nameDestination !== formValues.nameDestination
        ) {
          configurationRequestData.abbreviatedName = valueName(
            formValues.nameDestination,
          );
          configurationRequestData.iconReference = formValues.icon;
        }
        if (initialGeneralInfData.description !== formValues.description) {
          configurationRequestData.descriptionUse = formValues.description;
        }
      }

    if (newDecisions && newDecisions.length > 0) {
      configurationRequestData.rules = newDecisions;
    }

    setSaveData({
      applicationName: "ifac",
      businessManagerCode: appData.businessManager.publicCode,
      businessUnitCode: appData.businessUnit.publicCode,
      description: editLabels.description,
      entityName: conditionRule,
      requestDate: formatDate(new Date()),
      useCaseName: EMoneyDestination.USE_CASE_EDIT,
      configurationRequestData,
    });
    setShowRequestProcessModal(true);
  };

  useEffect(() => {
    if (generalInformationRef.current?.values) {
      setFormValues((prev) => ({
        ...prev,
        ...generalInformationRef.current?.values,
      }));
    }
  }, [generalInformationRef.current?.values]);

  const handleTabChange = (tabId: string) => {
    if (generalInformationRef.current?.values) {
      setFormValues((prev) => ({
        ...prev,
        ...generalInformationRef.current?.values,
      }));
    }
    setIsSelected(tabId);
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const hasUnsavedChanges =
        !compareObjects(initialGeneralInfData, formValues) ||
        (generalInformationRef.current &&
          !compareObjects(
            generalInformationRef.current.initialValues,
            generalInformationRef.current.values,
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
  }, [formValues, initialGeneralInfData, generalInformationRef, canRefresh]);

  const handleToggleEditedModal = () => {
    setShowModal(!showModal);
  };

  const handleOpenModal = () => {
    const compare = compareObjects(initialGeneralInfData, formValues);
    const compareCompany = compareObjects(
      generalInformationRef.current?.initialValues,
      generalInformationRef.current?.values,
    );
    if (!compare || !compareCompany) {
      setShowGoBackModal(true);
    } else {
      navigate(-1);
    }
  };

  const handleReset = () => {
    setShowGoBackModal(true);
  };

  const handleCloseGoBackModal = () => {
    setShowGoBackModal(false);
  };

  const handleGoBack = () => {
    setCanRefresh(true);
    navigate(-1);
  };

  const handleEditedModal = () => {
    setShowModal(false);
    onSubmit();
  };
  const smallScreen = useMediaQuery(mediaQueryTablet);

  const showGeneralInformation =
    isSelected === editDestinationTabsConfig.generalInformation.id;

  const handleToggleErrorRuleModal = () => {
    setHasErrorRule(!hasErrorRule);
    navigate(navigatePage);
  };

  return {
    formValues,
    initialGeneralInfData,
    generalInformationRef,
    isCurrentFormValid,
    isSelected,
    saveData,
    showRequestProcessModal,
    showModal,
    smallScreen,
    showGeneralInformation,
    showGoBackModal,
    creditLineValues,
    loading,
    hasErrorRule,
    descriptionError,
    setValuesLine,
    handleToggleErrorRuleModal,
    setCreditLineValues,
    handleOpenModal,
    handleCloseGoBackModal,
    handleEditedModal,
    handleGoBack,
    handleToggleEditedModal,
    handleReset,
    onSubmit,
    setIsCurrentFormValid,
    handleTabChange,
    setShowRequestProcessModal,
    setShowModal,
  };
};

export { useEditDestination };
