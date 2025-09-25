const initialConstructionData = {
  abbreviatedName: "",
  alias: "",
  descriptionUse: "",
  lineOfCreditId: "",
  rules: [
    { ruleName: "loanTerm", decisionsByRule: [] },
    { ruleName: "repaymentStructure", decisionsByRule: [] },
    { ruleName: "geometricGradientRepaymentRate", decisionsByRule: [] },
    { ruleName: "arithmeticGradientRepaymentValue", decisionsByRule: [] },
    { ruleName: "modeOfDisbursementType", decisionsByRule: [] },
    { ruleName: "suggestedPaymentChannelType", decisionsByRule: [] },
    {
      ruleName: "percentagePayableViaExtraInstallments",
      decisionsByRule: [],
    },
    {
      ruleName: "paymentChannelTypeForExtraInstallments",
      decisionsByRule: [],
    },
    { ruleName: "adjustmentInterestPaymentType", decisionsByRule: [] },
    { ruleName: "lineOfCredit", decisionsByRule: [] },
    { ruleName: "channelsCreditByLine", decisionsByRule: [] },
    { ruleName: "loanAmountLimit", decisionsByRule: [] },
    {
      ruleName:
        "maximumPremiumPercentageForExtraordinaryInstallmentsCommitments",
      decisionsByRule: [],
    },
    {
      ruleName: "percentageOfMonthlyCapacityForLimit",
      decisionsByRule: [],
    },
    {
      ruleName: "isExcludedFromLimitAnalysisByPaymentCapacity",
      decisionsByRule: [],
    },
    { ruleName: "interestRateType", decisionsByRule: [] },
    { ruleName: "interestRateFixedPoints", decisionsByRule: [] },
    { ruleName: "referenceRateForFixedPoints", decisionsByRule: [] },
    { ruleName: "creditRiskPremium", decisionsByRule: [] },
    { ruleName: "fixedInterestRate", decisionsByRule: [] },
    {
      ruleName: "chargeMonthlyRateForAdditionalLoanCosts",
      decisionsByRule: [],
    },
    { ruleName: "approvalBoardPositions", decisionsByRule: [] },
    {
      ruleName: "indicatorForAutomaticManualApproval",
      decisionsByRule: [],
    },
    {
      ruleName: "positionsAuthorizedToApproveOnBehalfOfApprover",
      decisionsByRule: [],
    },
    { ruleName: "hasAtomaticCollection", decisionsByRule: [] },
    { ruleName: "exclusiveCreditLines", decisionsByRule: [] },
    {
      ruleName:
        "positionsAuthorizedForExtemporaneousSystemValidationRequirementsApproval",
      decisionsByRule: [],
    },
    { ruleName: "omittableHumanTasks", decisionsByRule: [] },
    {
      ruleName: "automaticCollectionForExclusiveCreditLines",
      decisionsByRule: [],
    },
    {
      ruleName: "estimatedDaysForLoanDisbursementProcess",
      decisionsByRule: [],
    },
    {
      ruleName: "consolidationOfOtherCreditProductsAllowed",
      decisionsByRule: [],
    },
    { ruleName: "financialObligationsUpdateRequired", decisionsByRule: [] },
    { ruleName: "guaranteeRequirements", decisionsByRule: [] },
    { ruleName: "additionalBorrowersAllowed", decisionsByRule: [] },
    { ruleName: "bondCalculationFactorByAmount", decisionsByRule: [] },
    { ruleName: "requirement", decisionsByRule: [] },
  ],
};

export { initialConstructionData };
