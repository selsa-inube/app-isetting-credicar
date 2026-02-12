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
import { IUseMoreDetailsRequest } from "@ptypes/generalCredPolicies/IUseMoreDetailsRequest";
import { IEntry } from "@ptypes/design/table/IEntry";
import { useMultipleEnumRules } from "../useMultipleEnumRules";

const useMoreDetailsRequestProgress = (props: IUseMoreDetailsRequest) => {
  const { data } = props;
  const { appData } = useContext(AuthAndPortalData);
  const [showMoreDetailsModal, setShowMoreDetailsModal] = useState(false);
  let additionalDebtors;
  let realGuarantees;
  let creditBureausConsultReq;
  let inquiryValidityPeriod;
  let lineCreditPayrollAdvance;
  let lineCreditPayrollSpecialAdvance;
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

  const methodsArray: string[] = [];
  const methodsRemoved: string[] = [];
  const methodsAdded: string[] = [];

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
    });
  });

  const valueBoolean = (value: string) =>
    value === EBooleanText.Y || value === EBooleanText.YES
      ? EBooleanText.YES
      : EBooleanText.NO;

  const methods = methodsArray.join(", ");
  const methodsAddedJoin = methodsAdded.join(", ");
  const methodsRemovedJoin = methodsRemoved.join(", ");

  const moreDetailsData = {
    id: data.id,
    methods: methods,
    methodsAdded: methodsAddedJoin,
    methodsRemoved: methodsRemovedJoin,
    additionalDebtors: valueBoolean(additionalDebtors ?? EBooleanText.NO),
    guarantees: valueBoolean(realGuarantees ?? EBooleanText.NO),
    creditBureausConsultReq: valueBoolean(
      creditBureausConsultReq ?? EBooleanText.NO,
    ),
    inquiryValidityPeriod: valueBoolean(
      inquiryValidityPeriod ?? EBooleanText.NO,
    ),
    lineCreditPayrollAdvance: valueBoolean(
      lineCreditPayrollAdvance ?? EBooleanText.NO,
    ),
    lineCreditPayrollSpecialAdvance: valueBoolean(
      lineCreditPayrollSpecialAdvance ?? EBooleanText.NO,
    ),
    maximumNotifDocSize: valueBoolean(maximumNotifDocSize ?? EBooleanText.NO),
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
