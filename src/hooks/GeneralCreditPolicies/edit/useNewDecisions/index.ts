import { useEffect, useMemo, useState } from "react";
import { normalizeEvaluateRuleData } from "@utils/normalizeEvaluateRuleData";
import { getNewDeletedDecisions } from "@utils/getNewDeletedDecisions";
import { decisionWithoutConditions } from "@utils/decisionWithoutConditions";
import { formatDate } from "@utils/date/formatDate";
import { getDecisionIdMethods } from "@utils/decisions/getDecisionIdMethods";
import { getNewInsertDecisions } from "@utils/getNewInsertDecisions";
import { ETransactionOperation } from "@enum/transactionOperation";
import { ERulesOfDecisions } from "@enum/rulesOfDecisions";
import { ENameRules } from "@enum/nameRules";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { IDateVerification } from "@ptypes/generalCredPolicies/forms/IDateVerification";
import { IUseNewDecisions } from "@ptypes/hooks/IUseNewDecisions";
import { IRules } from "@ptypes/context/creditLinesConstruction/IRules";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IRuleKey, IRuleState } from "@ptypes/generalCredPolicies/IRuleState";

const useNewDecisions = (props: IUseNewDecisions) => {
  const {
    formValues,
    initialGeneralData,
    decisionData,
    contributionsData,
    minimumIncomeData,
    incomeData,
    methodsData,
    scoreModelsData,
    additionalDebtorsData,
    realGuaranteesData,
    creditBureausConsultReqData,
    inquiryValidityPeriodData,
    lineCreditPayrollAdvanceData,
    lineCreditPayrollSpecialAdvanceData,
    maximumNotifDocSizeData,
    basicNotificFormatData,
    basicNotificationRecData,
    minCredBureauRiskScoreData,
    notifChannelData,
    riskScoreApiUrlData,
    prevContributionsRef,
    prevIncomesRef,
    prevScoreModelsRef,
    prevMinimumIncomeRef,
    prevBasicNotificFormatRef,
    prevBasicNotificationRecRef,
    prevMinCredBureauRiskScoreRef,
    prevNotifChannelRef,
    prevRiskScoreApiUrlRef,
  } = props;

  const [isCurrentFormValid, setIsCurrentFormValid] = useState<boolean>(false);
  const [showRequestProcessModal, setShowRequestProcessModal] =
    useState<boolean>(false);
  const [rulesData, setRulesData] = useState<IRuleState>({
    ReciprocityFactorForCreditLimit: contributionsData ?? [],
    RiskScoreFactorForCreditLimit: incomeData ?? [],
    MinimumSubsistenceReservePercentage: minimumIncomeData ?? [],
    CreditRiskScoringModel: scoreModelsData ?? [],
    BasicNotificationFormat: basicNotificFormatData ?? [],
    BasicNotificationRecipient: basicNotificationRecData ?? [],
    MinimumCreditBureauRiskScore: minCredBureauRiskScoreData ?? [],
    NotificationChannel: notifChannelData ?? [],
    RiskScoreApiUrl: riskScoreApiUrlData ?? [],
  });
  const [newDecisions, setNewDecisions] = useState<IRuleDecisionExtended[]>();
  const [dateDecisions, setDateDecisions] = useState<IDateVerification>();
  const [generalDecisions, setGeneralDecisions] = useState<
    IRuleDecisionExtended[]
  >([]);
  const [showReciprocity, setShowReciprocity] = useState<boolean>(false);
  const [showFactor, setShowFactor] = useState<boolean>(false);

  const dateCurrent = String(formatDate(new Date()));

  useEffect(() => {
    setDateDecisions({
      date: dateCurrent,
    });
  }, []);

  const ruleNameToKeyMap: Record<string, IRuleKey> = {
    [ENameRules.CONTRIBUTIONS_PORTFOLIO]: "ReciprocityFactorForCreditLimit",
    [ENameRules.INCOME_PORTFOLIO]: "RiskScoreFactorForCreditLimit",
    [ENameRules.MINIMUM_INCOME_PERCENTAGE]:
      "MinimumSubsistenceReservePercentage",
    [ENameRules.SCORE_MODELS]: "CreditRiskScoringModel",
    [ENameRules.BASIC_NOTIFICATION_FORMAT]: "BasicNotificationFormat",
    [ENameRules.BASIC_NOTIFICATION_RECIPIENT]: "BasicNotificationRecipient",
    [ENameRules.MINIMUM_CREDIT_BUREAU_RISKSCORE]:
      "MinimumCreditBureauRiskScore",
    [ENameRules.NOTIFICATION_CHANNEL]: "NotificationChannel",
    [ENameRules.RISKSCORE_API_URL]: "RiskScoreApiUrl",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normalizeDecisionData = (data: any[]): IRuleState => {
    if (!Array.isArray(data) || data.length === 0) {
      return {
        ReciprocityFactorForCreditLimit: [],
        RiskScoreFactorForCreditLimit: [],
        MinimumSubsistenceReservePercentage: [],
        CreditRiskScoringModel: [],
        BasicNotificationFormat: [],
        BasicNotificationRecipient: [],
        MinimumCreditBureauRiskScore: [],
        NotificationChannel: [],
        RiskScoreApiUrl: [],
      };
    }

    const groupedRules: Partial<IRuleState> = {};

    data.forEach((decision) => {
      const ruleName = decision.ruleName;
      const key = ruleNameToKeyMap[ruleName];

      if (!key) {
        console.warn(`No se encontró mapeo para ruleName: ${ruleName}`);
        return;
      }
      const normalizedDecision: IRuleDecisionExtended = {
        decisionId: decision.decisionId || `Decisión ${Math.random()}`,
        ruleName: decision.ruleName,
        labelName: decision.labelName || decision.ruleName,
        ruleDataType: decision.ruleDataType || decision.decisionDataType,
        value: decision.value,
        howToSetTheDecision: decision.howToSetTheDecision,
        effectiveFrom: decision.effectiveFrom,
        typeDecision: decision.typeDecision || "Permanent",
        conditionGroups: Array.isArray(decision.conditionGroups)
          ? decision.conditionGroups
          : [],
        decisionsByRule: Array.isArray(decision.decisionsByRule)
          ? decision.decisionsByRule
          : [],
      };

      if (!groupedRules[key]) {
        groupedRules[key] = [];
      }
      groupedRules[key]!.push(normalizedDecision);
    });

    return {
      ReciprocityFactorForCreditLimit:
        groupedRules.ReciprocityFactorForCreditLimit || [],
      RiskScoreFactorForCreditLimit:
        groupedRules.RiskScoreFactorForCreditLimit || [],
      MinimumSubsistenceReservePercentage:
        groupedRules.MinimumSubsistenceReservePercentage || [],
      CreditRiskScoringModel: groupedRules.CreditRiskScoringModel || [],
      BasicNotificationFormat: groupedRules.BasicNotificationFormat || [],
      BasicNotificationRecipient: groupedRules.BasicNotificationRecipient || [],
      MinimumCreditBureauRiskScore:
        groupedRules.MinimumCreditBureauRiskScore || [],
      NotificationChannel: groupedRules.NotificationChannel || [],
      RiskScoreApiUrl: groupedRules.RiskScoreApiUrl || [],
    };
  };

  useEffect(() => {
    if (
      decisionData &&
      Array.isArray(decisionData) &&
      decisionData.length > 0
    ) {
      const normalizedRules = normalizeDecisionData(decisionData);

      setRulesData((prev) => {
        const merged: IRuleState = { ...prev };

        (Object.keys(normalizedRules) as IRuleKey[]).forEach((key) => {
          const newValue = normalizedRules[key];
          if (Array.isArray(newValue) && newValue.length > 0) {
            merged[key] = newValue;
          }
        });

        return merged;
      });
    }
  }, [decisionData]);

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
  const creditBureausConsultReq = decisionWithoutConditions(
    ENameRules.CREDIT_BUREAUS_CONSULTATION_REQUIRED,
    formValues.creditBureausConsultReq ?? "",
    initialGeneralData.creditBureausConsultReq,
    ETransactionOperation.PARTIAL_UPDATE,
    creditBureausConsultReqData,
  );
  const inquiryValidityPeriod = decisionWithoutConditions(
    ENameRules.INQUIRY_VALIDITY_PERIOD,
    formValues.inquiryValidityPeriod ?? "",
    initialGeneralData.inquiryValidityPeriod,
    ETransactionOperation.PARTIAL_UPDATE,
    inquiryValidityPeriodData,
  );
  const lineCreditPayrollAdvance = decisionWithoutConditions(
    ENameRules.LINE_CREDIT_PAYROLL_ADVANCE,
    formValues.lineCreditPayrollAdvance ?? "",
    initialGeneralData.lineCreditPayrollAdvance,
    ETransactionOperation.PARTIAL_UPDATE,
    lineCreditPayrollAdvanceData,
  );
  const lineCreditPayrollSpecialAdvance = decisionWithoutConditions(
    ENameRules.LINE_CREDIT_PAYROLL_SPECIAL_ADVANCE,
    formValues.lineCreditPayrollSpecialAdvance ?? "",
    initialGeneralData.lineCreditPayrollSpecialAdvance,
    ETransactionOperation.PARTIAL_UPDATE,
    lineCreditPayrollSpecialAdvanceData,
  );
  const maximumNotifDocSize = decisionWithoutConditions(
    ENameRules.MAXIMUM_NOTIFICATION_DOCUMENT_SIZE,
    formValues.maximumNotifDocSize ?? "",
    initialGeneralData.maximumNotifDocSize,
    ETransactionOperation.PARTIAL_UPDATE,
    maximumNotifDocSizeData,
  );

  const prevRefsMap = {
    ReciprocityFactorForCreditLimit: prevContributionsRef,
    RiskScoreFactorForCreditLimit: prevIncomesRef,
    CreditRiskScoringModel: prevScoreModelsRef,
    MinimumSubsistenceReservePercentage: prevMinimumIncomeRef,
    BasicNotificationFormat: prevBasicNotificFormatRef,
    BasicNotificationRecipient: prevBasicNotificationRecRef,
    MinimumCreditBureauRiskScore: prevMinCredBureauRiskScoreRef,
    NotificationChannel: prevNotifChannelRef,
    RiskScoreApiUrl: prevRiskScoreApiUrlRef,
  };

  const rulesDecisions = useMemo(() => {
    const insertValues: IRules[] = [];
    const deleteValues: IRules[] = [];

    Object.entries(prevRefsMap).forEach(([key, prevRef]) => {
      const rules = rulesData[key as keyof IRuleState];

      const newInsert = getNewInsertDecisions(
        prevRef,
        rules,
        dateDecisions?.date,
      );
      const newDelete = getNewDeletedDecisions(
        prevRef,
        rules,
        dateDecisions?.date,
      );

      if (newInsert) insertValues.push(...(newInsert as IRules[]));
      if (newDelete) deleteValues.push(...(newDelete as IRules[]));
    });

    return { insertValues, deleteValues };
  }, [rulesData, dateDecisions?.date]);

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
            decisionId: getDecisionIdMethods(methodsData, method.value),
            effectiveFrom: String(formatDate(new Date())),
            transactionOperation: method.transactionOperation,
            value: method.value,
          })),
        };
      }
    }

    const allGeneralDecisions = [
      methods,
      additionalDebtors,
      realGuarantees,
      creditBureausConsultReq,
      inquiryValidityPeriod,
      lineCreditPayrollAdvance,
      lineCreditPayrollSpecialAdvance,
      maximumNotifDocSize,
    ];

    const validGeneralDecisions = allGeneralDecisions.filter(
      (decision) => decision !== undefined,
    ) as IRules[];

    setGeneralDecisions(validGeneralDecisions ?? []);
  }, [formValues]);

  const disabledButton = useMemo(() => {
    const { insertValues, deleteValues } = rulesDecisions;
    return (
      insertValues.length > 0 ||
      deleteValues.length > 0 ||
      generalDecisions.length > 0
    );
  }, [rulesDecisions, generalDecisions]);

  useEffect(() => {
    const { insertValues, deleteValues } = rulesDecisions;

    setNewDecisions(
      [...insertValues, ...deleteValues, ...generalDecisions].flatMap(
        (item) => item as IRules,
      ),
    );
  }, [rulesDecisions, generalDecisions]);

  return {
    showRequestProcessModal,
    isCurrentFormValid,
    dateDecisions,
    newDecisions,
    showReciprocity,
    showFactor,
    rulesData,
    disabledButton,
    setShowReciprocity,
    setShowFactor,
    setDateDecisions,
    normalizeEvaluateRuleData,
    setIsCurrentFormValid,
    setShowRequestProcessModal,
  };
};

export { useNewDecisions };
