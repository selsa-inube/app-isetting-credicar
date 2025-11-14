import { useContext, useState, useEffect } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEvaluateRuleByBusinessUnit } from "@hooks/rules/useEvaluateRuleByBusinessUnit";
import { ENameRules } from "@enum/nameRules";
import { EGeneralPolicies } from "@enum/generalPolicies";
import { IConditionsEvaluateRule } from "@ptypes/decisions/IConditionsEvaluateRule";

const useValidateRules = () => {
  const { appData } = useContext(AuthAndPortalData);
  const [withoutPolicies, setWithoutPolicies] = useState<boolean>(false);
  const [loadingPolicies, setLoadingPolicies] = useState<boolean>(false);

  const getRule = (ruleName: string, conditions?: IConditionsEvaluateRule[]) =>
    useEvaluateRuleByBusinessUnit({
      businessUnits: appData.businessUnit.publicCode,
      rulesData: {
        ruleName,
        ...(conditions && { conditions }),
      },
      language: appData.language,
    });

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

  const {
    evaluateRuleData: minimumIncomeData,
    loading: minimumIncomeLoadding,
    hasError: minimumIncomeError,
  } = getRule(ENameRules.MINIMUM_INCOME_PERCENTAGE);

  useEffect(() => {
    setWithoutPolicies(
      ((methodsData?.length === 0 || methodsError) &&
        (additionalDebtorsData?.length === 0 || additionalError) &&
        (realGuaranteesData?.length === 0 || GuaranteesError) &&
        (contributionsData?.length === 0 || contributionsError) &&
        (incomeData?.length === 0 || incomeError) &&
        (scoreModelsData?.length === 0 || scoreModelsError) &&
        (minimumIncomeData?.length === 0 || minimumIncomeError)) ??
        false,
    );
  }, [
    methodsData,
    additionalDebtorsData,
    realGuaranteesData,
    contributionsData,
    incomeData,
    scoreModelsData,
    minimumIncomeData,
    methodsError,
    additionalError,
    GuaranteesError,
    contributionsError,
    minimumIncomeError,
    incomeError,
    scoreModelsError,
  ]);

  useEffect(() => {
    setLoadingPolicies(
      methodsLoadding ||
        additionalLoadding ||
        realGuaLoadding ||
        contributionsLoadding ||
        incomeLoadding ||
        scoreLoadding ||
        minimumIncomeLoadding,
    );
  }, [
    methodsLoadding,
    additionalLoadding,
    realGuaLoadding,
    contributionsLoadding,
    incomeLoadding,
    scoreLoadding,
    minimumIncomeLoadding,
  ]);

  return {
    contributionsData,
    incomeData,
    minimumIncomeData,
    scoreModelsData,
    methodsData,
    additionalDebtorsData,
    realGuaranteesData,
    withoutPolicies,
    loadingPolicies,
  };
};

export { useValidateRules };
