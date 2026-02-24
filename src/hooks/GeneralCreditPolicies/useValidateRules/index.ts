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
      token: appData.token,
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

  const {
    evaluateRuleData: basicNotificFormatData,
    loading: basicNotificFormatLoadding,
    hasError: basicNotificFormatError,
  } = getRule(ENameRules.BASIC_NOTIFICATION_FORMAT);

  const {
    evaluateRuleData: basicNotificationRecData,
    loading: basicNotificationRecLoadding,
    hasError: basicNotificationRecError,
  } = getRule(ENameRules.BASIC_NOTIFICATION_RECIPIENT);

  const {
    evaluateRuleData: creditBureausConsultReqData,
    loading: creditBureausConsultReqLoadding,
    hasError: creditBureausConsultReqError,
  } = getRule(ENameRules.CREDIT_BUREAUS_CONSULTATION_REQUIRED);

  const {
    evaluateRuleData: inquiryValidityPeriodData,
    loading: inquiryValidityPeriodLoadding,
    hasError: inquiryValidityPeriodError,
  } = getRule(ENameRules.INQUIRY_VALIDITY_PERIOD);

  const {
    evaluateRuleData: lineCreditPayrollAdvanceData,
    loading: lineCreditPayrollAdvanceLoadding,
    hasError: lineCreditPayrollAdvanceError,
  } = getRule(ENameRules.LINE_CREDIT_PAYROLL_ADVANCE);

  const {
    evaluateRuleData: lineCreditPayrollSpecialAdvanceData,
    loading: lineCreditPayrollSpecialAdvanceLoadding,
    hasError: lineCreditPayrollSpecialAdvanceError,
  } = getRule(ENameRules.LINE_CREDIT_PAYROLL_SPECIAL_ADVANCE);

  const {
    evaluateRuleData: maximumNotifDocSizeData,
    loading: maximumNotifDocSizeLoadding,
    hasError: maximumNotifDocSizeError,
  } = getRule(ENameRules.MAXIMUM_NOTIFICATION_DOCUMENT_SIZE);

  const {
    evaluateRuleData: minCredBureauRiskScoreData,
    loading: minCredBureauRiskScoreLoadding,
    hasError: minCredBureauRiskScoreError,
  } = getRule(ENameRules.MINIMUM_CREDIT_BUREAU_RISKSCORE);

  const {
    evaluateRuleData: notifChannelData,
    loading: notifChannelLoadding,
    hasError: notifChannelError,
  } = getRule(ENameRules.NOTIFICATION_CHANNEL);

  const {
    evaluateRuleData: riskScoreApiUrlData,
    loading: riskScoreApiUrlLoadding,
    hasError: riskScoreApiUrlError,
  } = getRule(ENameRules.RISKSCORE_API_URL);

  useEffect(() => {
    setWithoutPolicies(
      ((methodsData?.length === 0 || methodsError) &&
        (additionalDebtorsData?.length === 0 || additionalError) &&
        (realGuaranteesData?.length === 0 || GuaranteesError) &&
        (contributionsData?.length === 0 || contributionsError) &&
        (incomeData?.length === 0 || incomeError) &&
        (scoreModelsData?.length === 0 || scoreModelsError) &&
        (minimumIncomeData?.length === 0 || minimumIncomeError) &&
        (basicNotificFormatData?.length === 0 || basicNotificFormatError) &&
        (basicNotificationRecData?.length === 0 || basicNotificationRecError) &&
        (creditBureausConsultReqData?.length === 0 ||
          creditBureausConsultReqError) &&
        (inquiryValidityPeriodData?.length === 0 ||
          inquiryValidityPeriodError) &&
        (lineCreditPayrollAdvanceData?.length === 0 ||
          lineCreditPayrollAdvanceError) &&
        (lineCreditPayrollSpecialAdvanceData?.length === 0 ||
          lineCreditPayrollSpecialAdvanceError) &&
        (maximumNotifDocSizeData?.length === 0 || maximumNotifDocSizeError) &&
        (minCredBureauRiskScoreData?.length === 0 ||
          minCredBureauRiskScoreError) &&
        (notifChannelData?.length === 0 || notifChannelError) &&
        (riskScoreApiUrlData?.length === 0 || riskScoreApiUrlError)) ??
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
        minimumIncomeLoadding ||
        basicNotificFormatLoadding ||
        basicNotificationRecLoadding ||
        creditBureausConsultReqLoadding ||
        inquiryValidityPeriodLoadding ||
        lineCreditPayrollAdvanceLoadding ||
        lineCreditPayrollSpecialAdvanceLoadding ||
        maximumNotifDocSizeLoadding ||
        minCredBureauRiskScoreLoadding ||
        notifChannelLoadding ||
        riskScoreApiUrlLoadding,
    );
  }, [
    methodsLoadding,
    additionalLoadding,
    realGuaLoadding,
    contributionsLoadding,
    incomeLoadding,
    scoreLoadding,
    minimumIncomeLoadding,
    basicNotificFormatLoadding,
    basicNotificationRecLoadding,
    creditBureausConsultReqLoadding,
    inquiryValidityPeriodLoadding,
    lineCreditPayrollAdvanceLoadding,
    lineCreditPayrollSpecialAdvanceLoadding,
    maximumNotifDocSizeLoadding,
    minCredBureauRiskScoreLoadding,
    notifChannelLoadding,
    riskScoreApiUrlLoadding,
  ]);

  return {
    contributionsData,
    incomeData,
    minimumIncomeData,
    scoreModelsData,
    methodsData,
    basicNotificFormatData,
    basicNotificationRecData,
    creditBureausConsultReqData,
    inquiryValidityPeriodData,
    lineCreditPayrollAdvanceData,
    lineCreditPayrollSpecialAdvanceData,
    maximumNotifDocSizeData,
    minCredBureauRiskScoreData,
    notifChannelData,
    riskScoreApiUrlData,
    additionalDebtorsData,
    realGuaranteesData,
    withoutPolicies,
    loadingPolicies,
  };
};

export { useValidateRules };
