import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IRuleDecision } from "@isettingkit/input";
import { FormikProps } from "formik";
import { useMediaQuery } from "@inubekit/inubekit";

import { useCreditLine } from "@hooks/moneyDestination/useCreditLine";
import { useEnumsMoneyDestination } from "@hooks/useEnumsMoneyDestination";
import { useEvaluateRuleByBusinessUnit } from "@hooks/rules/useEvaluateRuleByBusinessUnit";
import { ETransactionOperation } from "@enum/transactionOperation";
import { EMoneyDestination } from "@enum/moneyDestination";
import { formatDate } from "@utils/date/formatDate";
import { compareObjects } from "@utils/compareObjects";
import { extractDecisionValues } from "@utils/extractDecisionValues";
import { normalizeDestination } from "@utils/destination/normalizeDestination";
import { arraysEqual } from "@utils/destination/arraysEqual";
import { formatDateDecision } from "@utils/date/formatDateDecision";
import { normalizeOptions } from "@utils/destination/normalizeOptions";
import { findDecision } from "@utils/destination/findDecision";
import { editDestinationTabsConfig } from "@config/moneyDestination/editDestination/tabs";
import { mediaQueryTablet } from "@config/environment";
import { editLabels } from "@config/moneyDestination/editDestination/editLabels";
import { IUseEditDestination } from "@ptypes/hooks/moneyDestination/IUseEditDestination";
import { IGeneralInformationEntry } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IGeneralInformationEntry";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { IServerDomain } from "@ptypes/IServerDomain";
import { II18n } from "@ptypes/i18n";

const useEditDestination = (props: IUseEditDestination) => {
  const { data, appData } = props;

  const initialGeneralInfData = {
    nameDestination: data.nameDestination ?? "",
    typeDestination: data.typeDestination ?? "",
    creditLine: "",
    description: data.description ?? "",
    icon: data.icon ?? "",
    id: data.id ?? "",
  };

  const [isSelected, setIsSelected] = useState<string>(
    editDestinationTabsConfig.generalInformation.id,
  );
  const [formValues, setFormValues] = useState<IGeneralInformationEntry>(
    initialGeneralInfData,
  );
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const [showGoBackModal, setShowGoBackModal] = useState(false);
  const [canRefresh, setCanRefresh] = useState(false);
  const [showRequestProcessModal, setShowRequestProcessModal] = useState(false);
  const [saveData, setSaveData] = useState<ISaveDataRequest>();
  const [showModal, setShowModal] = useState(false);
  const [creditDecisions, setCreditDecisions] = useState<IServerDomain[]>([]);

  const { optionsCreditLine, creditLineData } = useCreditLine();

  const getRule = (ruleName: string) =>
    useEvaluateRuleByBusinessUnit({
      businessUnits: appData.businessUnit.publicCode,
      rulesData: {
        ruleName,
      },
      language: appData.language,
    });

  const { evaluateRuleData, loading } = getRule(
    EMoneyDestination.LINE_OF_CREDIT,
  );

  useEffect(() => {
    if (!loading && evaluateRuleData) {
      const { decisionValues } = extractDecisionValues(evaluateRuleData);

      const dataOptions = optionsCreditLine.filter((option) =>
        decisionValues.includes(option.id)
          ? { ...option, checked: true }
          : { ...option, checked: false },
      );

      setCreditLineValues(dataOptions);
      setFormValues((prev) => ({
        ...prev,
        creditLine: dataOptions
          .map((item) => {
            return item.id;
          })
          .join(","),
      }));
    }
  }, [loading, evaluateRuleData]);

  const generalInformationRef =
    useRef<FormikProps<IGeneralInformationEntry>>(null);
  const [creditLineValues, setCreditLineValues] = useState<IServerDomain[]>([]);

  const navigate = useNavigate();

  const conditionRule = "MoneyDestination";

  useEffect(() => {
    setCreditLineValues(optionsCreditLine);
  }, [creditLineData]);

  const memoizedOptionsCreditLine = useMemo(
    () => optionsCreditLine,
    [JSON.stringify(optionsCreditLine)],
  );

  useEffect(() => {
    const option = formValues.creditLine
      .split(",")
      .map((item) => normalizeOptions(memoizedOptionsCreditLine, item.trim()))
      .filter((item): item is IServerDomain => item !== undefined);

    setCreditDecisions((prev) => {
      if (JSON.stringify(prev) === JSON.stringify(option)) {
        return prev;
      }
      return option;
    });
  }, [formValues.creditLine, memoizedOptionsCreditLine]);

  const tranformEvaluteDecision = useMemo(() => {
    if (!evaluateRuleData) return [];

    return evaluateRuleData.map((decision) => {
      const dataEvalute = {
        effectiveFrom: decision.decisionsByRule[0].effectiveFrom,
        value: decision?.decisionsByRule[0].value,
      };
      return {
        ruleName: decision.ruleName,
        decisionsByRule: [dataEvalute],
      };
    });
  }, [evaluateRuleData]);

  const currentDate = useMemo(() => formatDate(new Date()), []);

  const transformDecision = useMemo(() => {
    return creditDecisions?.map((rule) => ({
      effectiveFrom: currentDate,
      value: rule?.id,
    }));
  }, [creditDecisions, currentDate]);

  const rules = useMemo(() => {
    return [
      {
        ruleName: EMoneyDestination.LINE_OF_CREDIT,
        decisionsByRule: transformDecision,
      },
    ];
  }, [transformDecision]);

  const getDeletedValues = useCallback(() => {
    if (!arraysEqual(rules, tranformEvaluteDecision)) {
      return tranformEvaluteDecision
        .filter((decision) => !findDecision(rules, decision))
        .map((decision) => {
          const decisionsByRule = decision.decisionsByRule?.map((condition) => {
            return {
              effectiveFrom: formatDateDecision(
                condition.effectiveFrom as string,
              ),
              value: condition.value,
              transactionOperation: ETransactionOperation.DELETE,
            };
          });

          return {
            modifyJustification: `${editLabels.modifyDecision} ${appData.user.userAccount}`,
            ruleName: decision.ruleName,
            decisionsByRule: [decisionsByRule],
          };
        });
    }
    return [];
  }, [rules, tranformEvaluteDecision, appData.user.userAccount]);

  const getInsertValues = useCallback(() => {
    if (!arraysEqual(rules, tranformEvaluteDecision)) {
      return rules
        .filter((decision) => !findDecision(tranformEvaluteDecision, decision))
        .map((decision) => {
          const decisionsByRule = decision.decisionsByRule?.map((condition) => {
            return {
              effectiveFrom: formatDateDecision(
                condition.effectiveFrom as string,
              ),
              value: condition.value,
              transactionOperation: ETransactionOperation.INSERT,
            };
          });

          return {
            modifyJustification: `${editLabels.modifyDecision} ${appData.user.userAccount}`,
            ruleName: decision.ruleName,
            decisionsByRule: [decisionsByRule],
          };
        });
    }
    return [];
  }, [rules, tranformEvaluteDecision, appData.user.userAccount]);

  const newDecisions = useMemo(() => {
    const insertValues = getInsertValues().filter(
      (decision) =>
        decision.decisionsByRule && decision.decisionsByRule.length > 0,
    );
    const deleteValues = getDeletedValues().filter(
      (decision) =>
        decision.decisionsByRule && decision.decisionsByRule.length > 0,
    );
    return [...insertValues, ...deleteValues];
  }, [getInsertValues, getDeletedValues]);

  const onSubmit = () => {
    const { enumDestination } = useEnumsMoneyDestination({
      businessUnits: appData.businessUnit.publicCode,
    });
    const currentValues = generalInformationRef.current?.values;
    const compare =
      JSON.stringify(initialGeneralInfData) === JSON.stringify(formValues);

    const valuesUpdatedName =
      initialGeneralInfData.nameDestination !== currentValues?.nameDestination;
    const valuesUpdatedDesc =
      initialGeneralInfData.description !== currentValues?.description;
    const valuesUpdatedLine =
      initialGeneralInfData.creditLine !== currentValues?.creditLine;
    const valueName = (name: string) => {
      const normalizeData = normalizeDestination(enumDestination, name);
      return (
        normalizeData?.i18nValue?.[appData.language as keyof II18n] ?? name
      );
    };

    const configurationRequestData: {
      moneyDestinationId: string;
      modifyJustification: string;
      abbreviatedName?: string;
      descriptionUse?: string;
      iconReference?: string;
      moneyDestinationType?: string;
      creditLine?: string;
      rules?: IRuleDecision[];
    } = {
      moneyDestinationId: data.id,
      moneyDestinationType: data.typeDestination,
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
