import { Route, Routes } from "react-router-dom";

import { CreditLines } from "@pages/creditLines";
import { ConfigurationLines } from "@pages/creditLines/tabs/configurationLines";
import { ClientsSupportLineForm } from "@pages/creditLines/tabs/forms/clientsSupportLineForm";
import { NameAndDescriptionForm } from "@pages/creditLines/tabs/forms/nameAndDescriptionForm";
import { DecisionTemplateScreen } from "@pages/creditLines/tabs/forms/DecisionTemplateScreen";

const CreditLinesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CreditLines />} />
      <Route path="edit-credit-lines" element={<ConfigurationLines />}>
        <Route index element={<NameAndDescriptionForm />} />
        <Route path="clients-supported" element={<ClientsSupportLineForm />} />
        <Route
          path="line-Names-Descriptions"
          element={<NameAndDescriptionForm />}
        />
        <Route
          path="loan-term"
          element={<DecisionTemplateScreen templateKey="LoanTerm" />}
        />
        <Route
          path="amortization-methods"
          element={<DecisionTemplateScreen templateKey="RepaymentStructure" />}
        />
        <Route
          path="rate-increase"
          element={
            <DecisionTemplateScreen templateKey="GeometricGradientRepaymentRate" />
          }
        />
        <Route
          path="increment-value"
          element={
            <DecisionTemplateScreen templateKey="ArithmeticGradientRepaymentValue" />
          }
        />
        <Route
          path="disbursement-methods"
          element={
            <DecisionTemplateScreen templateKey="ModeOfDisbursementType" />
          }
        />
        <Route
          path="suggested-payment-channel"
          element={
            <DecisionTemplateScreen templateKey="SuggestedPaymentChannelType" />
          }
        />
        <Route
          path="percentage-requested-amount"
          element={
            <DecisionTemplateScreen templateKey="PercentagePayableViaExtraInstallments" />
          }
        />
        <Route
          path="grace-period"
          element={<DecisionTemplateScreen templateKey="GracePeriod" />}
        />
        <Route
          path="payment-channel-extraInstallments"
          element={
            <DecisionTemplateScreen templateKey="PaymentChannelTypeForExtraInstallments" />
          }
        />
        <Route
          path="adjustment-interest-payment-type"
          element={
            <DecisionTemplateScreen templateKey="AdjustmentInterestPaymentType" />
          }
        />
        <Route
          path="line-credit"
          element={<DecisionTemplateScreen templateKey="LineOfCredit" />}
        />
        <Route
          path="channels-credit-by-Line"
          element={
            <DecisionTemplateScreen templateKey="CreditPlacementChannelsByLine" />
          }
        />
        <Route
          path="loan-amount-limit"
          element={<DecisionTemplateScreen templateKey="LoanAmountLimit" />}
        />
        <Route
          path="maximum-percentage-extraordinary"
          element={
            <DecisionTemplateScreen templateKey="MaximumPremiumPercentageForExtraordinaryInstallmentsCommitments" />
          }
        />
        <Route
          path="percentage-available-monthly-payment"
          element={
            <DecisionTemplateScreen templateKey="PercentageOfMonthlyCapacityForLimit" />
          }
        />
        <Route
          path="lines-not-subtracted-analysis"
          element={
            <DecisionTemplateScreen templateKey="IsExcludedFromLimitAnalysisByPaymentCapacity" />
          }
        />
        <Route
          path="interest-rate-type"
          element={<DecisionTemplateScreen templateKey="InterestRateType" />}
        />
        <Route
          path="interest-rate-fixed-points"
          element={
            <DecisionTemplateScreen templateKey="InterestRateFixedPoints" />
          }
        />
        <Route
          path="reference-rate-fixed-points"
          element={
            <DecisionTemplateScreen templateKey="ReferenceRateForFixedPoints" />
          }
        />
        <Route
          path="credit-risk-premium"
          element={<DecisionTemplateScreen templateKey="CreditRiskPremium" />}
        />
        <Route
          path="fixed-interest-rate"
          element={<DecisionTemplateScreen templateKey="FixedInterestRate" />}
        />
        <Route
          path="monthly-remuneration-rate-other-expenses"
          element={
            <DecisionTemplateScreen templateKey="ChargeMonthlyRateForAdditionalLoanCosts" />
          }
        />
        <Route
          path="approval-board-positions"
          element={
            <DecisionTemplateScreen templateKey="ApprovalBoardPositions" />
          }
        />
        <Route
          path="indicator-automatic-manual-approval"
          element={
            <DecisionTemplateScreen templateKey="IndicatorForAutomaticManualApproval" />
          }
        />
        <Route
          path="positions-authorized-approve"
          element={
            <DecisionTemplateScreen templateKey="PositionsAuthorizedToApproveOnBehalfOfApprover" />
          }
        />
        <Route
          path="has-atomatic-collection"
          element={
            <DecisionTemplateScreen templateKey="HasAtomaticCollection" />
          }
        />
        <Route
          path="exclusive-credit-lines"
          element={
            <DecisionTemplateScreen templateKey="ExclusiveCreditLines" />
          }
        />
        <Route
          path="positions-authorized-extemporaneous"
          element={
            <DecisionTemplateScreen templateKey="PositionsAuthorizedForExtemporaneousSystemValidationRequirementsApproval" />
          }
        />
        <Route
          path="omittable-human-tasks"
          element={<DecisionTemplateScreen templateKey="OmittableHumanTasks" />}
        />
        <Route
          path="automatic-collection-exclusive-lines"
          element={
            <DecisionTemplateScreen templateKey="AutomaticCollectionForExclusiveCreditLines" />
          }
        />
        <Route
          path="estimated-days-loan-disbursement"
          element={
            <DecisionTemplateScreen templateKey="EstimatedDaysForLoanDisbursementProcess" />
          }
        />
        <Route
          path="allows-collect-other-products"
          element={
            <DecisionTemplateScreen templateKey="ConsolidationOfOtherCreditProductsAllowed" />
          }
        />
        <Route
          path="financial-obligations-update-required"
          element={
            <DecisionTemplateScreen templateKey="FinancialObligationsUpdateRequired" />
          }
        />
        <Route
          path="guarantee-requirements"
          element={
            <DecisionTemplateScreen templateKey="GuaranteeRequirements" />
          }
        />
        <Route
          path="additional-borrowers-allowed"
          element={
            <DecisionTemplateScreen templateKey="AdditionalBorrowersAllowed" />
          }
        />
        <Route
          path="bond-calculation-factor-amount"
          element={
            <DecisionTemplateScreen templateKey="BondCalculationFactorByAmount" />
          }
        />
        <Route
          path="requirement"
          element={<DecisionTemplateScreen templateKey="Requirement" />}
        />
      </Route>
    </Routes>
  );
};

export { CreditLinesRoutes };
