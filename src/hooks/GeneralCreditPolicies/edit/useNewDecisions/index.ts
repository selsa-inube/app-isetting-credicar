import { useEffect, useState } from "react";
import { normalizeEvaluateRuleData } from "@utils/normalizeEvaluateRuleData";
import { getNewDeletedDecisions } from "@utils/getNewDeletedDecisions";
import { decisionWithoutConditions } from "@utils/decisionWithoutConditions";
import { formatDate } from "@utils/date/formatDate";
import { getNewInsertDecisions } from "@utils/getNewInsertDecisions";
import { ETransactionOperation } from "@enum/transactionOperation";
import { ERulesOfDecisions } from "@enum/rulesOfDecisions";
import { ENameRules } from "@enum/nameRules";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { IDateVerification } from "@ptypes/generalCredPolicies/forms/IDateVerification";
import { IUseNewDecisions } from "@ptypes/hooks/IUseNewDecisions";
import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const useNewDecisions = (props: IUseNewDecisions) => {
  const {
    formValues,
    initialGeneralData,
    contributionsData,
    minimumIncomeData,
    incomeData,
    methodsData,
    scoreModelsData,
    additionalDebtorsData,
    realGuaranteesData,
    normalizedContributions,
    normalizedMinimumIncome,
    normalizedIncome,
    normalizedScoreModels,
    prevContributionsRef,
    prevIncomesRef,
    prevScoreModelsRef,
    prevMinimumIncomeRef,
  } = props;

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const [showRequestProcessModal, setShowRequestProcessModal] = useState(false);
  const [contributionsPortfolio, setContributionsPortfolio] = useState<
    IRuleDecisionExtended[]
  >(contributionsData ?? []);
  const [incomePortfolio, setIncomePortfolio] = useState<
    IRuleDecisionExtended[]
  >([]);
  const [minimumIncomePercentage, setMinimumIncomePercentage] = useState<
    IRuleDecisionExtended[]
  >(minimumIncomeData ?? []);
  const [scoreModels, setScoreModels] = useState<IRuleDecisionExtended[]>([]);
  const [newDecisions, setNewDecisions] = useState<IRuleDecisionExtended[]>();
  const [dateDecisions, setDateDecisions] = useState<IDateVerification>();
  const [generalDecisions, setGeneralDecisions] = useState<
    IRuleDecisionExtended[]
  >([]);
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

  const calculationValues =
    initialGeneralData.PaymentCapacityBasedCreditLimit !==
      formValues.PaymentCapacityBasedCreditLimit && {
      transactionOperation: valueTransactionOperation(
        formValues.PaymentCapacityBasedCreditLimit,
      ),
      value: ERulesOfDecisions.CALCULATION_BY_PAYMENT_CAPACITY,
    };

  const factorValues = initialGeneralData.RiskAnalysisBasedCreditLimit !==
    formValues.RiskAnalysisBasedCreditLimit && {
    transactionOperation: valueTransactionOperation(
      formValues.RiskAnalysisBasedCreditLimit ?? false,
    ),
    value: ERulesOfDecisions.RISK_FACTOR,
  };

  const reciprocityValues = initialGeneralData.ReciprocityBasedCreditLimit !==
    formValues.ReciprocityBasedCreditLimit && {
    transactionOperation: valueTransactionOperation(
      formValues.ReciprocityBasedCreditLimit ?? false,
    ),
    value: ERulesOfDecisions.RECIPROCITY_OF_CONTRIBUTIONS,
  };

  const methodsArray = [calculationValues, factorValues, reciprocityValues];

  const additionalDebtors = decisionWithoutConditions(
    ENameRules.ADDITIONAL_DEBTORS,
    formValues.additionalDebtors ?? "",
    initialGeneralData.additionalDebtors,
    ETransactionOperation.PARTIAL_UPDATE,
    additionalDebtorsData,
  );

  const realGuarantees = decisionWithoutConditions(
    ENameRules.REAL_GUARANTEES,
    formValues.realGuarantees ?? "",
    initialGeneralData.realGuarantees,
    ETransactionOperation.PARTIAL_UPDATE,
    realGuaranteesData,
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

  useEffect(() => {
    if (minimumIncomeData && normalizedMinimumIncome) {
      setMinimumIncomePercentage(normalizedMinimumIncome);
    }
  }, [minimumIncomeData]);

  const newInsertValContribution = getNewInsertDecisions(
    prevContributionsRef,
    contributionsPortfolio,
    dateDecisions?.date,
  );

  const newInsertValIncomes = getNewInsertDecisions(
    prevIncomesRef,
    incomePortfolio,
    dateDecisions?.date,
  );

  const newInsertPercentage = getNewInsertDecisions(
    prevMinimumIncomeRef,
    minimumIncomePercentage,
    dateDecisions?.date,
  );

  const newInsertValScore = getNewInsertDecisions(
    prevScoreModelsRef,
    scoreModels,
    dateDecisions?.date,
  );

  const newDeleteValContribution = getNewDeletedDecisions(
    prevContributionsRef,
    contributionsPortfolio,
    dateDecisions?.date,
  );

  const newDeleteValIncomes = getNewDeletedDecisions(
    prevIncomesRef,
    incomePortfolio,
    dateDecisions?.date,
  );

  const newDeletePercentage = getNewDeletedDecisions(
    prevMinimumIncomeRef,
    minimumIncomePercentage,
    dateDecisions?.date,
  );

  const newDeleteValScore = getNewDeletedDecisions(
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
          modifyJustification: `${decisionsLabels.modifyJustification} ${ENameRules.METHODS}`,
          decisionsByRule: validMethods.map((method) => ({
            decisionId: methodsData?.[0].decisionId,
            effectiveFrom: String(formatDate(new Date())),
            transactionOperation: method.transactionOperation,
            value: method.value,
          })),
        };
      }
    }

    const allGeneralDecisions = [methods, additionalDebtors, realGuarantees];

    const validGeneralDecisions = allGeneralDecisions.filter(
      (decision) => decision !== undefined,
    ) as IRules[];

    setGeneralDecisions(validGeneralDecisions ?? []);
  }, [formValues]);

  useEffect(() => {
    const insertValues = [
      newInsertValContribution,
      newInsertValIncomes,
      newInsertValScore,
      newInsertPercentage,
    ].filter((decision) => decision !== undefined);

    const deleteValues = [
      newDeleteValContribution,
      newDeleteValIncomes,
      newDeleteValScore,
      newDeletePercentage,
    ].filter((decision) => decision !== undefined);

    setNewDecisions(
      [...insertValues, ...deleteValues, ...generalDecisions].flatMap(
        (item) => item as IRules,
      ),
    );
  }, [
    contributionsPortfolio,
    incomePortfolio,
    minimumIncomePercentage,
    scoreModels,
    generalDecisions,
  ]);

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
    minimumIncomePercentage,
    setMinimumIncomePercentage,
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
