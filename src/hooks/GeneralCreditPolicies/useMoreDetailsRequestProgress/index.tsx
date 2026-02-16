import { useContext, useMemo, useState } from "react";

import { IRuleDecision } from "@isettingkit/input";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { ECreditLines } from "@enum/creditLines";
import { ENameRules } from "@enum/nameRules";
import { EGeneralPolicies } from "@enum/generalPolicies";
import { ETransactionOperation } from "@enum/transactionOperation";
import { ERulesOfDecisions } from "@enum/rulesOfDecisions";
import { EBooleanText } from "@enum/booleanText";
import { getConditionsTraduction } from "@utils/getConditionsTraduction";
import { getDecisionsByRule } from "@utils/getDecisionsByRule";
import { formatDetailsDecisions } from "@utils/formatDetailsDecisions";
import { optionsMethods } from "@config/generalCreditPolicies/editGeneralPolicies/optionsMethods";
import { optionsCreditBureaus } from "@config/generalCreditPolicies/editGeneralPolicies/optionsCreditBureaus";
import { IUseMoreDetailsRequest } from "@ptypes/generalCredPolicies/IUseMoreDetailsRequest";
import { IEntry } from "@ptypes/design/table/IEntry";
import { useMultipleEnumRules } from "../useMultipleEnumRules";

const useMoreDetailsRequestProgress = (props: IUseMoreDetailsRequest) => {
  const { data } = props;
  const { appData } = useContext(AuthAndPortalData);
  const [showMoreDetailsModal, setShowMoreDetailsModal] = useState(false);
  let additionalDebtors;
  let realGuarantees;
  let inquiryValidityPeriod;
  let maximumNotifDocSize;

  const onToggleMoreDetailsModal = () => {
    setShowMoreDetailsModal(!showMoreDetailsModal);
  };

  const methodsMap: Record<string, string> = {
    [ERulesOfDecisions.CALCULATION_BY_PAYMENT_CAPACITY]:
      optionsMethods.CalculationByPaymentCapacity,
    [ERulesOfDecisions.RISK_FACTOR]: optionsMethods.RiskFactor,
    [ERulesOfDecisions.RECIPROCITY_OF_CONTRIBUTIONS]:
      optionsMethods.ReciprocityOfContributions,
  };

  const creditBureausMap: Record<string, string> = {
    [ERulesOfDecisions.DATACREDITO_EXPERIAN]:
      optionsCreditBureaus.datacreditoExperian,
    [ERulesOfDecisions.TRANSUNION]: optionsCreditBureaus.transunion,
  };

  const methodsArray: string[] = [];
  const methodsRemoved: string[] = [];
  const methodsAdded: string[] = [];

  const creditBureausArray: string[] = [];
  const creditBureausRemoved: string[] = [];
  const creditBureausAdded: string[] = [];

  const lineCreditPayrollAdvance: string[] = [];
  const linePayrollAdvanceadded: string[] = [];
  const linePayrollAdvanceRemoved: string[] = [];

  const lineCreditPayrollSpecialAdvance: string[] = [];
  const linePayrollSpecialAdvanceadded: string[] = [];
  const linePayrollSpecialAdvanceRemoved: string[] = [];

  data.configurationRequestData.rules.forEach((rule: IEntry) => {
    if (rule === null) return;
    rule.decisionsByRule?.forEach((decision: IRuleDecision) => {
      if (rule.ruleName === ENameRules.ADDITIONAL_DEBTORS) {
        additionalDebtors = decision.value;
      }

      if (rule.ruleName === ENameRules.REAL_GUARANTEES) {
        realGuarantees = decision.value;
      }

      if (
        rule.ruleName === ENameRules.METHODS &&
        methodsMap[decision.value as string]
      ) {
        const methodValue = methodsMap[decision.value as string];

        if (decision.transactionOperation === ETransactionOperation.DELETE) {
          methodsRemoved.push(methodValue);
        } else if (
          decision.transactionOperation === ETransactionOperation.INSERT
        ) {
          methodsAdded.push(methodValue);
        } else {
          methodsArray.push(methodValue);
        }
      }

      if (
        rule.ruleName === ENameRules.CREDIT_BUREAUS_CONSULTATION_REQUIRED &&
        creditBureausMap[decision.value as string]
      ) {
        const creditValue = creditBureausMap[decision.value as string];

        if (decision.transactionOperation === ETransactionOperation.DELETE) {
          creditBureausRemoved.push(creditValue);
        } else if (
          decision.transactionOperation === ETransactionOperation.INSERT
        ) {
          creditBureausAdded.push(creditValue);
        } else {
          creditBureausArray.push(creditValue);
        }
      }

      if (rule.ruleName === ENameRules.INQUIRY_VALIDITY_PERIOD) {
        inquiryValidityPeriod = decision.value;
      }

      if (rule.ruleName === ENameRules.MAXIMUM_NOTIFICATION_DOCUMENT_SIZE) {
        maximumNotifDocSize = decision.value;
      }
      if (rule.ruleName === ENameRules.LINE_CREDIT_PAYROLL_ADVANCE) {
        if (decision.transactionOperation === ETransactionOperation.DELETE) {
          linePayrollAdvanceRemoved.push(decision.value as string);
        } else if (
          decision.transactionOperation === ETransactionOperation.INSERT
        ) {
          linePayrollAdvanceadded.push(decision.value as string);
        } else {
          lineCreditPayrollAdvance.push(decision.value as string);
        }
      }

      if (rule.ruleName === ENameRules.LINE_CREDIT_PAYROLL_SPECIAL_ADVANCE) {
        if (decision.transactionOperation === ETransactionOperation.DELETE) {
          linePayrollSpecialAdvanceRemoved.push(decision.value as string);
        } else if (
          decision.transactionOperation === ETransactionOperation.INSERT
        ) {
          linePayrollSpecialAdvanceadded.push(decision.value as string);
        } else {
          lineCreditPayrollSpecialAdvance.push(decision.value as string);
        }
      }
    });
  });

  const valueBoolean = (value: string) =>
    value === EBooleanText.Y || value === EBooleanText.YES
      ? EBooleanText.YES
      : EBooleanText.NO;

  const moreDetailsData = {
    id: data.id,
    methods: methodsArray.join(", "),
    methodsAdded: methodsAdded.join(", "),
    methodsRemoved: methodsRemoved.join(", "),
    additionalDebtors: valueBoolean(additionalDebtors ?? EBooleanText.NO),
    guarantees: valueBoolean(realGuarantees ?? EBooleanText.NO),
    creditBureaus: creditBureausArray.join(", "),
    creditBureausAdded: creditBureausAdded.join(", "),
    creditBureausRemoved: creditBureausRemoved.join(", "),
    inquiryValidityPeriod: inquiryValidityPeriod,
    lineCreditPayrollAdvance: lineCreditPayrollAdvance.join(", "),
    linePayrollAdvanceRemoved: linePayrollAdvanceRemoved.join(", "),
    linePayrollAdvanceAdded: linePayrollAdvanceadded.join(", "),
    lineCreditPayrollSpecialAdvance: lineCreditPayrollSpecialAdvance.join(", "),
    linePayrollSpecialAdvanceRemoved:
      linePayrollSpecialAdvanceRemoved.join(", "),
    linePayrollSpecialAdvanceAdded: linePayrollSpecialAdvanceadded.join(", "),
    maximumNotifDocSize: maximumNotifDocSize,
  };

  const { rulesDataMap } = useMultipleEnumRules({
    ruleNames: [
      ENameRules.CONTRIBUTIONS_PORTFOLIO,
      ENameRules.INCOME_PORTFOLIO,
      ENameRules.MINIMUM_INCOME_PERCENTAGE,
      ENameRules.SCORE_MODELS,
      ENameRules.BASIC_NOTIFICATION_FORMAT,
      ENameRules.BASIC_NOTIFICATION_RECIPIENT,
      ENameRules.MINIMUM_CREDIT_BUREAU_RISKSCORE,
      ENameRules.NOTIFICATION_CHANNEL,
      ENameRules.RISKSCORE_API_URL,
    ],
    ruleCatalog: ECreditLines.RULE_CATALOG,
    catalogAction: ECreditLines.CATALOG_ACTION,
    businessUnits: appData.businessUnit.publicCode,
    token: appData.token,
  });

  const conditionsMap = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const map: Record<string, any> = {};

    Object.keys(rulesDataMap).forEach((ruleName) => {
      const ruleData = rulesDataMap[ruleName];
      if (ruleData) {
        const { conditionTraduction } = getConditionsTraduction(
          ruleData,
          appData.language,
        );
        map[ruleName] = conditionTraduction;
      }
    });

    return map;
  }, [rulesDataMap, appData.language]);

  const generateDecisions = (
    ruleName: string,
    filter?: (condition: IEntry) => boolean,
  ) => {
    return getDecisionsByRule(
      formatDetailsDecisions(data, conditionsMap[ruleName]),
      ruleName,
      filter,
    );
  };

  const decisions = {
    reciprocity: generateDecisions(ENameRules.CONTRIBUTIONS_PORTFOLIO),
    incomePortfolio: generateDecisions(ENameRules.INCOME_PORTFOLIO),
    scoreModels: generateDecisions(
      ENameRules.SCORE_MODELS,
      (condition) =>
        condition.conditionName !== EGeneralPolicies.CONDITION_BUSINESS_UNIT,
    ),
    minimum: generateDecisions(ENameRules.MINIMUM_INCOME_PERCENTAGE),
    basicNotifFormat: generateDecisions(ENameRules.BASIC_NOTIFICATION_FORMAT),
    basicNotifRecipient: generateDecisions(
      ENameRules.BASIC_NOTIFICATION_RECIPIENT,
    ),
    minCredBureauRiskScore: generateDecisions(
      ENameRules.MINIMUM_CREDIT_BUREAU_RISKSCORE,
    ),
    notifChannel: generateDecisions(ENameRules.NOTIFICATION_CHANNEL),
    riskScoreApiUrl: generateDecisions(ENameRules.RISKSCORE_API_URL),
  };

  const isMoreDetails = data.useCaseName === EGeneralPolicies.USE_CASE_EDIT;

  return {
    showMoreDetailsModal,
    moreDetailsData,
    decisions,
    isMoreDetails,
    onToggleMoreDetailsModal,
  };
};

export { useMoreDetailsRequestProgress };
