import { useContext, useState, useEffect } from "react";
import { nameRules } from "@config/generalCreditPolicies/assisted/nameRules";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEvaluateRuleByBusinessUnit } from "@hooks/rules/useEvaluateRuleByBusinessUnit";
import { IConditionsEvaluateRule } from "@ptypes/decisions/IConditionsEvaluateRule";

const useValidateRules = () => {
  const { appData } = useContext(AuthAndPortalData);
  const [withoutPolicies, setWithoutPolicies] = useState<boolean>(false);
  const [loadingPolicies, setLoadingPolicies] = useState<boolean>(false);

  const getRule = (ruleName: string, conditions?: IConditionsEvaluateRule[]) =>
    useEvaluateRuleByBusinessUnit(appData.businessUnit.publicCode, {
      ruleName,
      ...(conditions && { conditions }),
    });

  const {
    evaluateRuleData: referenceData,
    loading: referenceLoadding,
    hasError: referenceError,
  } = getRule(nameRules.reference);
  const {
    evaluateRuleData: methodsData,
    loading: methodsLoadding,
    hasError: methodsError,
  } = getRule(nameRules.methods);

  const {
    evaluateRuleData: additionalDebtorsData,
    loading: additionalLoadding,
    hasError: additionalError,
  } = getRule(nameRules.additionalDebtors);

  const {
    evaluateRuleData: sourcesIncomeData,
    loading: sourcesIncLoadding,
    hasError: sourcesIncomeError,
  } = getRule(nameRules.sourcesIncome);

  const {
    evaluateRuleData: financialObligData,
    loading: financialLoadding,
    hasError: obligationError,
  } = getRule(nameRules.financialObligations);

  const {
    evaluateRuleData: realGuaranteesData,
    loading: realGuaLoadding,
    hasError: GuaranteesError,
  } = getRule(nameRules.realGuarantees);

  const {
    evaluateRuleData: contributionsData,
    loading: contributionsLoadding,
    hasError: contributionsError,
  } = getRule(nameRules.contributionsPortfolio);

  const {
    evaluateRuleData: incomeData,
    loading: incomeLoadding,
    hasError: incomeError,
  } = getRule(nameRules.incomePortfolio);

  const {
    evaluateRuleData: scoreModelsData,
    loading: scoreLoadding,
    hasError: scoreModelsError,
  } = getRule(nameRules.scoreModels, [
    {
      condition: "BusinessUnit",
      value: appData.businessUnit.publicCode,
    },
  ]);

  useEffect(() => {
    setWithoutPolicies(
      (referenceError &&
        methodsError &&
        additionalError &&
        sourcesIncomeError &&
        obligationError &&
        GuaranteesError &&
        contributionsError &&
        incomeError &&
        scoreModelsError) ??
        false,
    );
  }, [
    referenceError,
    methodsError,
    additionalError,
    sourcesIncomeError,
    obligationError,
    GuaranteesError,
    contributionsError,
    incomeError,
    scoreModelsError,
  ]);

  useEffect(() => {
    setLoadingPolicies(
      referenceLoadding ||
        methodsLoadding ||
        additionalLoadding ||
        sourcesIncLoadding ||
        financialLoadding ||
        realGuaLoadding ||
        contributionsLoadding ||
        incomeLoadding ||
        scoreLoadding,
    );
  }, [
    referenceLoadding,
    methodsLoadding,
    additionalLoadding,
    sourcesIncLoadding,
    financialLoadding,
    realGuaLoadding,
    contributionsLoadding,
    incomeLoadding,
    scoreLoadding,
  ]);

  return {
    referenceData,
    contributionsData,
    incomeData,
    scoreModelsData,
    methodsData,
    additionalDebtorsData,
    sourcesIncomeData,
    financialObligData,
    realGuaranteesData,
    withoutPolicies,
    loadingPolicies,
  };
};

export { useValidateRules };
