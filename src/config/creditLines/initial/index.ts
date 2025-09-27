const initialConstructionData = {
  abbreviatedName: "",
  alias: "",
  descriptionUse: "",
  lineOfCreditId: "",
  rules: [
    { ruleName: "LoanTerm", decisionsByRule: [] },
    { ruleName: "RepaymentStructure", decisionsByRule: [] },
    { ruleName: "GeometricGradientRepaymentRate", decisionsByRule: [] },
    { ruleName: "ArithmeticGradientRepaymentValue", decisionsByRule: [] },
    { ruleName: "ModeOfDisbursementType", decisionsByRule: [] },
    { ruleName: "SuggestedPaymentChannelType", decisionsByRule: [] },
    {
      ruleName: "PercentagePayableViaExtraInstallments",
      decisionsByRule: [],
    },
    {
      ruleName: "PaymentChannelTypeForExtraInstallments",
      decisionsByRule: [],
    },
    { ruleName: "AdjustmentInterestPaymentType", decisionsByRule: [] },
    { ruleName: "LineOfCredit", decisionsByRule: [] },
    { ruleName: "ChannelsCreditByLine", decisionsByRule: [] },
    { ruleName: "LoanAmountLimit", decisionsByRule: [] },
    {
      ruleName:
        "MaximumPremiumPercentageForExtraordinaryInstallmentsCommitments",
      decisionsByRule: [],
    },
    {
      ruleName: "PercentageOfMonthlyCapacityForLimit",
      decisionsByRule: [],
    },
    {
      ruleName: "IsExcludedFromLimitAnalysisByPaymentCapacity",
      decisionsByRule: [],
    },
    { ruleName: "InterestRateType", decisionsByRule: [] },
    { ruleName: "InterestRateFixedPoints", decisionsByRule: [] },
    { ruleName: "ReferenceRateForFixedPoints", decisionsByRule: [] },
    { ruleName: "CreditRiskPremium", decisionsByRule: [] },
    { ruleName: "FixedInterestRate", decisionsByRule: [] },
    {
      ruleName: "ChargeMonthlyRateForAdditionalLoanCosts",
      decisionsByRule: [],
    },
    { ruleName: "ApprovalBoardPositions", decisionsByRule: [] },
    {
      ruleName: "IndicatorForAutomaticManualApproval",
      decisionsByRule: [],
    },
    {
      ruleName: "PositionsAuthorizedToApproveOnBehalfOfApprover",
      decisionsByRule: [],
    },
    { ruleName: "HasAtomaticCollection", decisionsByRule: [] },
    { ruleName: "ExclusiveCreditLines", decisionsByRule: [] },
    {
      ruleName:
        "PositionsAuthorizedForExtemporaneousSystemValidationRequirementsApproval",
      decisionsByRule: [],
    },
    { ruleName: "OmittableHumanTasks", decisionsByRule: [] },
    {
      ruleName: "AutomaticCollectionForExclusiveCreditLines",
      decisionsByRule: [],
    },
    {
      ruleName: "EstimatedDaysForLoanDisbursementProcess",
      decisionsByRule: [],
    },
    {
      ruleName: "ConsolidationOfOtherCreditProductsAllowed",
      decisionsByRule: [],
    },
    { ruleName: "FinancialObligationsUpdateRequired", decisionsByRule: [] },
    { ruleName: "GuaranteeRequirements", decisionsByRule: [] },
    { ruleName: "AdditionalBorrowersAllowed", decisionsByRule: [] },
    { ruleName: "BondCalculationFactorByAmount", decisionsByRule: [] },
    { ruleName: "Requirement", decisionsByRule: [] },
  ],
};

export { initialConstructionData };
