import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FormikProps } from "formik";
import { ICondition, IRuleDecision } from "@isettingkit/input";
import { useMediaQuery } from "@inubekit/inubekit";

import { useEvaluateRuleByBusinessUnit } from "@hooks/rules/useEvaluateRuleByBusinessUnit";
import { formatDate } from "@utils/date/formatDate";
import { compareObjects } from "@utils/compareObjects";
import { formatDateDecision } from "@utils/date/formatDateDecision";
import { arraysEqual } from "@utils/destination/arraysEqual";
import { findDecision } from "@utils/destination/findDecision";
import { ETransactionOperation } from "@enum/transactionOperation";
import { editDestinationTabsConfig } from "@config/moneyDestination/editDestination/tabs";
import { mediaQueryTablet } from "@config/environment";
import { editLabels } from "@config/moneyDestination/editDestination/editLabels";
import { IUseEditDestination } from "@ptypes/hooks/moneyDestination/IUseEditDestination";
import { IGeneralInformationEntry } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IGeneralInformationEntry";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";

const useEditDestination = (props: IUseEditDestination) => {
  const { data, appData } = props;
  const initialGeneralInfData = {
    nameDestination: data.nameDestination ?? "",
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
  const [creditLineDecisions, setCreditLineDecisions] = useState<
    IRuleDecision[]
  >([]);
  const [newDecisions, setNewDecisions] = useState<IRuleDecision[]>();
  const generalInformationRef =
    useRef<FormikProps<IGeneralInformationEntry>>(null);

  const [nameDecision, setNameDecision] = useState(
    generalInformationRef.current?.values?.nameDestination ??
      data.nameDestination,
  );

  const navigate = useNavigate();

  const ruleName = "LineOfCredit";
  const conditionRule = "MoneyDestination";

  const { evaluateRuleData } = useEvaluateRuleByBusinessUnit(
    appData.businessUnit.publicCode,
    {
      ruleName: ruleName,
      conditions: [
        {
          condition: conditionRule,
          value: data.nameDestination,
        },
      ],
    },
  );

  useEffect(() => {
    setNameDecision(formValues.nameDestination ?? data.nameDestination);
  }, [formValues.nameDestination]);

  const normalizeEvaluateRuleData: IRuleDecision[] | undefined =
    evaluateRuleData?.map((item) => {
      return {
        ...item,
        conditionsThatEstablishesTheDecision:
          item.conditionsThatEstablishesTheDecision?.map((condition) => {
            return {
              ...condition,
              hidden: condition.conditionName === conditionRule,
            };
          }),
      };
    });

  useEffect(() => {
    if (evaluateRuleData && normalizeEvaluateRuleData) {
      setCreditLineDecisions(normalizeEvaluateRuleData);
    }
  }, [evaluateRuleData]);

  const prevCreditLineDecisionsRef = useRef<IRuleDecision[]>([]);
  prevCreditLineDecisionsRef.current = normalizeEvaluateRuleData ?? [];

  const newInsertValues = () => {
    if (!arraysEqual(prevCreditLineDecisionsRef.current, creditLineDecisions)) {
      return creditLineDecisions
        .filter(
          (decision) =>
            !findDecision(prevCreditLineDecisionsRef.current, decision),
        )
        .map((decision) => {
          const decisionsByRule: IRuleDecision = {
            conditionsThatEstablishesTheDecision:
              decision.conditionsThatEstablishesTheDecision?.map(
                (condition) => {
                  return {
                    conditionName: condition.conditionName,
                    labelName: condition.labelName,
                    value: condition.value,
                  };
                },
              ) as ICondition[],
            effectiveFrom: formatDateDecision(decision.effectiveFrom as string),
            value: decision.value,
            transactionOperation: ETransactionOperation.INSERT,
          };

          if (decision.validUntil) {
            decisionsByRule.validUntil = formatDateDecision(
              decision.validUntil as string,
            );
          }

          return {
            modifyJustification: `${editLabels.modifyDecision} ${appData.user.userAccount}`,
            ruleName: decision.ruleName,
            decisionsByRule: [decisionsByRule],
          };
        });
    }
  };

  const newDeletedValues = () => {
    if (!arraysEqual(prevCreditLineDecisionsRef.current, creditLineDecisions)) {
      return prevCreditLineDecisionsRef.current
        .filter((decision) => !findDecision(creditLineDecisions, decision))
        .map((decision: IRuleDecision) => {
          const decisionsByRule: IRuleDecision = {
            conditionsThatEstablishesTheDecision:
              decision.conditionsThatEstablishesTheDecision?.map(
                (condition) => {
                  return {
                    conditionName: condition.conditionName,
                    labelName: condition.labelName,
                    value: condition.value,
                  };
                },
              ) as ICondition[],
            effectiveFrom: formatDateDecision(decision.effectiveFrom as string),
            value: decision.value,
            transactionOperation: ETransactionOperation.DELETE,
          };

          if (decision.validUntil) {
            decisionsByRule.validUntil = formatDateDecision(
              decision.validUntil as string,
            );
          }

          return {
            modifyJustification: `${editLabels.modifyDecision} ${appData.user.userAccount}`,
            ruleName: decision.ruleName,
            decisionsByRule: [decisionsByRule],
          };
        });
    }
  };

  useEffect(() => {
    const insertValues = newInsertValues();
    const deleteValues = newDeletedValues();

    setNewDecisions([...(insertValues ?? []), ...(deleteValues ?? [])]);
  }, [creditLineDecisions]);

  const onSubmit = () => {
    const currentValues = generalInformationRef.current?.values;
    const compare =
      JSON.stringify(initialGeneralInfData) === JSON.stringify(formValues);

    const valuesUpdatedName =
      initialGeneralInfData.nameDestination !== currentValues?.nameDestination;
    const valuesUpdatedDesc =
      initialGeneralInfData.description !== currentValues?.description;

    const configurationRequestData: {
      moneyDestinationId: string;
      modifyJustification: string;
      abbreviatedName?: string;
      descriptionUse?: string;
      iconReference?: string;
      rules?: IRuleDecision[];
    } = {
      moneyDestinationId: data.id,
      modifyJustification: `${editLabels.modifyJustification} ${appData.user.userAccount}`,
    };

    if (currentValues?.nameDestination !== undefined && valuesUpdatedName) {
      configurationRequestData.abbreviatedName = currentValues?.nameDestination;
      configurationRequestData.iconReference = currentValues?.icon;
    }
    if (currentValues?.description !== undefined && valuesUpdatedDesc) {
      configurationRequestData.descriptionUse = currentValues?.description;
    }

    if (!compare && isSelected === editDestinationTabsConfig.creditLine.id) {
      if (
        initialGeneralInfData.nameDestination !== formValues.nameDestination
      ) {
        configurationRequestData.abbreviatedName = formValues.nameDestination;
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
      useCaseName: "ModifyMoneyDestination",
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

  const showDecisionsForm =
    isSelected === editDestinationTabsConfig.creditLine.id;

  return {
    creditLineDecisions,
    normalizeEvaluateRuleData,
    formValues,
    initialGeneralInfData,
    generalInformationRef,
    isCurrentFormValid,
    nameDecision,
    isSelected,
    saveData,
    showRequestProcessModal,
    showModal,
    smallScreen,
    showGeneralInformation,
    showDecisionsForm,
    showGoBackModal,
    handleOpenModal,
    handleCloseGoBackModal,
    handleEditedModal,
    handleGoBack,
    handleToggleEditedModal,
    handleReset,
    onSubmit,
    setCreditLineDecisions,
    setIsCurrentFormValid,
    handleTabChange,
    setShowRequestProcessModal,
    setShowModal,
  };
};

export { useEditDestination };
