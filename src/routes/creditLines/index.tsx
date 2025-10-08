import { Route, Routes } from "react-router-dom";

import { CreditLines } from "@pages/creditLines";
import { ConfigurationLines } from "@pages/creditLines/tabs/configurationLines";
import { ClientsSupportLineForm } from "@pages/creditLines/tabs/forms/clientsSupportLineForm";
import { NameAndDescriptionForm } from "@pages/creditLines/tabs/forms/nameAndDescriptionForm";
import { DecisionTemplateScreen } from "@pages/creditLines/tabs/forms/DecisionTemplateScreen";
import { IRouteConfiguration } from "@ptypes/creditLines/IRouteConfiguration";

const DECISION_ROUTES: IRouteConfiguration[] = [
  { path: "loan-term", templateKey: "LoanTerm" },
  { path: "amortization-methods", templateKey: "RepaymentStructure" },
  { path: "rate-increase", templateKey: "GeometricGradientRepaymentRate" },
  { path: "increment-value", templateKey: "ArithmeticGradientRepaymentValue" },
  { path: "disbursement-methods", templateKey: "ModeOfDisbursementType" },
  {
    path: "suggested-payment-channel",
    templateKey: "SuggestedPaymentChannelType",
  },
  {
    path: "percentage-requested-amount",
    templateKey: "PercentagePayableViaExtraInstallments",
  },
  { path: "grace-period", templateKey: "GracePeriod" },
  {
    path: "payment-channel-extraInstallments",
    templateKey: "PaymentChannelTypeForExtraInstallments",
  },
  {
    path: "adjustment-interest-payment-type",
    templateKey: "AdjustmentInterestPaymentType",
  },
  { path: "line-credit", templateKey: "LineOfCredit" },
  {
    path: "channels-credit-by-Line",
    templateKey: "CreditPlacementChannelsByLine",
  },
  { path: "loan-amount-limit", templateKey: "LoanAmountLimit" },
  {
    path: "maximum-percentage-extraordinary",
    templateKey:
      "MaximumPremiumPercentageForExtraordinaryInstallmentsCommitments",
  },
  {
    path: "percentage-available-monthly-payment",
    templateKey: "PercentageOfMonthlyCapacityForLimit",
  },
  {
    path: "lines-not-subtracted-analysis",
    templateKey: "IsExcludedFromLimitAnalysisByPaymentCapacity",
  },
  { path: "interest-rate-type", templateKey: "InterestRateType" },
  {
    path: "interest-rate-fixed-points",
    templateKey: "InterestRateFixedPoints",
  },
  {
    path: "reference-rate-fixed-points",
    templateKey: "ReferenceRateForFixedPoints",
  },
  { path: "credit-risk-premium", templateKey: "CreditRiskPremium" },
  { path: "fixed-interest-rate", templateKey: "FixedInterestRate" },
  {
    path: "monthly-remuneration-rate-other-expenses",
    templateKey: "ChargeMonthlyRateForAdditionalLoanCosts",
  },
  { path: "approval-board-positions", templateKey: "ApprovalBoardPositions" },
  {
    path: "indicator-automatic-manual-approval",
    templateKey: "IndicatorForAutomaticManualApproval",
  },
  {
    path: "positions-authorized-approve",
    templateKey: "PositionsAuthorizedToApproveOnBehalfOfApprover",
  },
  { path: "has-atomatic-collection", templateKey: "HasAtomaticCollection" },
  { path: "exclusive-credit-lines", templateKey: "ExclusiveCreditLines" },
  {
    path: "positions-authorized-extemporaneous",
    templateKey:
      "PositionsAuthorizedForExtemporaneousSystemValidationRequirementsApproval",
  },
  { path: "omittable-human-tasks", templateKey: "OmittableHumanTasks" },
  {
    path: "automatic-collection-exclusive-lines",
    templateKey: "AutomaticCollectionForExclusiveCreditLines",
  },
  {
    path: "estimated-days-loan-disbursement",
    templateKey: "EstimatedDaysForLoanDisbursementProcess",
  },
  {
    path: "allows-collect-other-products",
    templateKey: "ConsolidationOfOtherCreditProductsAllowed",
  },
  {
    path: "financial-obligations-update-required",
    templateKey: "FinancialObligationsUpdateRequired",
  },
  { path: "guarantee-requirements", templateKey: "GuaranteeRequirements" },
  {
    path: "additional-borrowers-allowed",
    templateKey: "AdditionalBorrowersAllowed",
  },
  {
    path: "bond-calculation-factor-amount",
    templateKey: "BondCalculationFactorByAmount",
  },
  { path: "requirement", templateKey: "Requirement" },
];

const CreditLinesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CreditLines />} />
      <Route path="edit-credit-lines" element={<ConfigurationLines />}>
        <Route index element={<NameAndDescriptionForm />} />
        <Route
          path="clients-supported"
          element={
            <ClientsSupportLineForm templateKey="CreditLineByRiskProfile" />
          }
        />
        <Route
          path="line-Names-Descriptions"
          element={<NameAndDescriptionForm />}
        />
        {DECISION_ROUTES.map(({ path, templateKey }) => (
          <Route
            key={templateKey}
            path={path}
            element={
              <DecisionTemplateScreen
                key={templateKey}
                templateKey={templateKey}
              />
            }
          />
        ))}
      </Route>
    </Routes>
  );
};

export { CreditLinesRoutes };
