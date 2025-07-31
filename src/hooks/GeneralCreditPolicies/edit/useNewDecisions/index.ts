import { useContext, useEffect, useState } from "react";
import { IRuleDecision } from "@isettingkit/input";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { normalizeEvaluateRuleData } from "@utils/normalizeEvaluateRuleData";
import { getNewInsertDecisions } from "@utils/getNewInsertDecisions";
import { getNewDeletedDecisions } from "@utils/getNewDeletedDecisions";
import { decisionWithoutConditions } from "@utils/decisionWithoutConditions";
import { formatDate } from "@utils/date/formatDate";
import { ETransactionOperation } from "@enum/transactionOperation";
import { ERulesOfDecisions } from "@enum/rulesOfDecisions";
import { ENameRules } from "@enum/nameRules";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { IDateVerification } from "@ptypes/generalCredPolicies/forms/IDateVerification";
import { IUseNewDecisions } from "@ptypes/hooks/IUseNewDecisions";

const useNewDecisions = (props: IUseNewDecisions) => {
  const {
    formValues,
    initialGeneralData,
    contributionsData,
    incomeData,
    scoreModelsData,
    normalizedContributions,
    normalizedIncome,
    normalizedScoreModels,
    prevContributionsRef,
    prevIncomesRef,
    prevScoreModelsRef,
    user,
  } = props;

  const { appData } = useContext(AuthAndPortalData);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const [showRequestProcessModal, setShowRequestProcessModal] = useState(false);
  const [contributionsPortfolio, setContributionsPortfolio] = useState<
    IRuleDecision[]
  >(contributionsData ?? []);
  const [incomePortfolio, setIncomePortfolio] = useState<IRuleDecision[]>([]);
  const [scoreModels, setScoreModels] = useState<IRuleDecision[]>([]);
  const [newDecisions, setNewDecisions] = useState<IRuleDecision[]>();
  const [dateDecisions, setDateDecisions] = useState<IDateVerification>();
  const [generalDecisions, setGeneralDecisions] = useState<IRuleDecision[]>([]);
  const [showReciprocity, setShowReciprocity] = useState(false);
  const [showFactor, setShowFactor] = useState(false);

  const dateCurrent = String(formatDate(new Date()));

  useEffect(() => {
    setDateDecisions({
      date: dateCurrent,
    });
  }, []);

  const valueTransactionOperation = (value: boolean) =>
    value ? ETransactionOperation.INSERT : ETransactionOperation.DELETE;

  const calculationValues = initialGeneralData.calculation !==
    formValues.calculation && {
    transactionOperation: valueTransactionOperation(formValues.calculation),
    value: ERulesOfDecisions.CALCULATION_BY_PAYMENT_CAPACITY,
  };

  const factorValues = initialGeneralData.factor !== formValues.factor && {
    transactionOperation: valueTransactionOperation(formValues.factor ?? false),
    value: ERulesOfDecisions.RISK_FACTOR,
  };

  const reciprocityValues = initialGeneralData.reciprocity !==
    formValues.reciprocity && {
    transactionOperation: valueTransactionOperation(
      formValues.reciprocity ?? false,
    ),
    value: ERulesOfDecisions.RECIPROCITY_OF_CONTRIBUTIONS,
  };

  const methodsArray = [calculationValues, factorValues, reciprocityValues];

  const reference = decisionWithoutConditions(
    ENameRules.REFERENCE,
    formValues.reference ?? "",
    initialGeneralData.reference,
    ETransactionOperation.INSERT,
    user,
  );

  const sourcesIncome = decisionWithoutConditions(
    ENameRules.SOURCES_INCOME,
    formValues.sourcesIncome ?? "",
    initialGeneralData.sourcesIncome,
    valueTransactionOperation(formValues.sourcesIncome),
    user,
  );

  const additionalDebtors = decisionWithoutConditions(
    ENameRules.ADDITIONAL_DEBTORS,
    formValues.additionalDebtors ?? "",
    initialGeneralData.additionalDebtors,
    valueTransactionOperation(formValues.additionalDebtors),
    user,
  );

  const financialObligations = decisionWithoutConditions(
    ENameRules.FINANCIAL_OBLIGATIONS,
    formValues.financialObligations ?? "",
    initialGeneralData.financialObligations,
    valueTransactionOperation(formValues.financialObligations),
    user,
  );

  const realGuarantees = decisionWithoutConditions(
    ENameRules.REAL_GUARANTEES,
    formValues.realGuarantees ?? "",
    initialGeneralData.realGuarantees,
    valueTransactionOperation(formValues.realGuarantees),
    user,
  );

  useEffect(() => {
    if (contributionsData && normalizedContributions) {
      setContributionsPortfolio(normalizedContributions);
    }
  }, [contributionsData]);

  useEffect(() => {
    if (incomeData && normalizedIncome) {
      setIncomePortfolio(normalizedIncome);
    }
  }, [incomeData]);

  useEffect(() => {
    if (scoreModelsData && normalizedScoreModels) {
      setScoreModels(normalizedScoreModels);
    }
  }, [scoreModelsData]);

  const newInsertValContribution = getNewInsertDecisions(
    appData.user.userAccount,
    prevContributionsRef,
    contributionsPortfolio,
    dateDecisions?.date,
  );

  const newInsertValIncomes = getNewInsertDecisions(
    appData.user.userAccount,
    prevIncomesRef,
    incomePortfolio,
    dateDecisions?.date,
  );

  const newInsertValScore = getNewInsertDecisions(
    appData.user.userAccount,
    prevScoreModelsRef,
    scoreModels,
    dateDecisions?.date,
  );

  const newDeleteValContribution = getNewDeletedDecisions(
    appData.user.userAccount,
    prevContributionsRef,
    contributionsPortfolio,
    dateDecisions?.date,
  );

  const newDeleteValIncomes = getNewDeletedDecisions(
    appData.user.userAccount,
    prevIncomesRef,
    incomePortfolio,
    dateDecisions?.date,
  );

  const newDeleteValScore = getNewDeletedDecisions(
    appData.user.userAccount,
    prevScoreModelsRef,
    scoreModels,
    dateDecisions?.date,
  );

  useEffect(() => {
    let methods;
    if (methodsArray.length > 0) {
      const validMethods = methodsArray.filter(
        (
          method,
        ): method is {
          transactionOperation: ETransactionOperation;
          value: ERulesOfDecisions;
        } => method !== false && method !== undefined && method !== null,
      );

      if (validMethods.length > 0) {
        methods = {
          ruleName: ENameRules.METHODS,
          modifyJustification: `${decisionsLabels.modifyJustification} ${user}`,
          decisionsByRule: validMethods.map((method) => ({
            effectiveFrom: String(formatDate(new Date())),
            transactionOperation: method.transactionOperation,
            value: method.value,
          })),
        };
      }
    }
    const allGeneralDecisions = [
      reference,
      methods,
      sourcesIncome,
      additionalDebtors,
      financialObligations,
      realGuarantees,
    ];

    const validGeneralDecisions = allGeneralDecisions.filter(
      (decision) => decision !== undefined,
    ) as IRuleDecision[];

    setGeneralDecisions(validGeneralDecisions ?? []);
  }, [formValues]);

  useEffect(() => {
    const insertValues = [
      newInsertValContribution,
      newInsertValIncomes,
      newInsertValScore,
    ].filter((decision) => decision !== undefined);

    const deleteValues = [
      newDeleteValContribution,
      newDeleteValIncomes,
      newDeleteValScore,
    ].filter((decision) => decision !== undefined);

    setNewDecisions(
      [
        ...(insertValues as IRuleDecision[]),
        ...(deleteValues as IRuleDecision[]),
        ...generalDecisions,
      ].flatMap((item) => item),
    );
  }, [contributionsPortfolio, incomePortfolio, scoreModels, generalDecisions]);

  return {
    showRequestProcessModal,
    contributionsPortfolio,
    isCurrentFormValid,
    incomePortfolio,
    scoreModels,
    dateDecisions,
    newDecisions,
    showReciprocity,
    showFactor,
    setShowReciprocity,
    setShowFactor,
    setDateDecisions,
    normalizeEvaluateRuleData,
    setIncomePortfolio,
    setScoreModels,
    setContributionsPortfolio,
    setIsCurrentFormValid,
    setShowRequestProcessModal,
  };
};

export { useNewDecisions };
