import { useContext, useState, useEffect } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEvaluateRuleByBusinessUnit } from "@hooks/rules/useEvaluateRuleByBusinessUnit";
import { IConditionsEvaluateRule } from "@ptypes/decisions/IConditionsEvaluateRule";
import { ENameRules } from "@enum/nameRules";
import { EGeneralPolicies } from "@enum/generalPolicies";

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
  } = getRule(ENameRules.REFERENCE);
  const {
    evaluateRuleData: methodsData,
    loading: methodsLoadding,
    hasError: methodsError,
  } = getRule(ENameRules.METHODS);

  const {
    evaluateRuleData: additionalDebtorsData,
    loading: additionalLoadding,
    hasError: additionalError,
  } = getRule(ENameRules.ADDITIONAL_DEBTORS);

  const {
    evaluateRuleData: sourcesIncomeData,
    loading: sourcesIncLoadding,
    hasError: sourcesIncomeError,
  } = getRule(ENameRules.SOURCES_INCOME);

  const {
    evaluateRuleData: financialObligData,
    loading: financialLoadding,
    hasError: obligationError,
  } = getRule(ENameRules.FINANCIAL_OBLIGATIONS);

  const {
    evaluateRuleData: realGuaranteesData,
    loading: realGuaLoadding,
    hasError: GuaranteesError,
  } = getRule(ENameRules.REAL_GUARANTEES);

  const {
    evaluateRuleData: contributionsData,
    loading: contributionsLoadding,
    hasError: contributionsError,
  } = getRule(ENameRules.CONTRIBUTIONS_PORTFOLIO);

  const {
    evaluateRuleData: incomeData,
    loading: incomeLoadding,
    hasError: incomeError,
  } = getRule(ENameRules.INCOME_PORTFOLIO);

  const {
    evaluateRuleData: scoreModelsData,
    loading: scoreLoadding,
    hasError: scoreModelsError,
  } = getRule(ENameRules.SCORE_MODELS, [
    {
      condition: EGeneralPolicies.CONDITION_BUSINESS_UNIT,
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
