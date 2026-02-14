import { stepKeysPolicies } from "@enum/stepsKeysPolicies";
import { IVerificationBoxes } from "@ptypes/generalCredPolicies/forms/IVerificationBoxes";
import { RenderDecisionsGenVerification } from "../decisionsGenVerification";
import { RendersRuleVerification } from "../RendersRuleVerification";

const VerificationBoxes = (props: IVerificationBoxes) => {
  const { updatedData, stepKey, isMobile, optionsGenDecision } = props;

  const showContributions =
    stepKey === stepKeysPolicies.CONTRIBUTIONS_PORTFOLIO &&
    updatedData.contributionsPortfolio.values.length > 0;

  const showIncome =
    stepKey === stepKeysPolicies.INCOME_PORTFOLIO &&
    updatedData.incomePortfolio.values.length > 0;

  const showScoreModels =
    stepKey === stepKeysPolicies.SCORE_MODELS &&
    updatedData.scoreModels.values.length > 0;

  const showMinimumIncome =
    stepKey === stepKeysPolicies.MINIMUM_INCOME_PERCENTAGE &&
    updatedData.minimumIncomePercentage.values.length > 0;

  const showBasicNotifFormat =
    stepKey === stepKeysPolicies.BASIC_NOTIFICATION_FORMAT &&
    updatedData.basicNotificationFormat.values.length > 0;

  const showBasicNotifRecipient =
    stepKey === stepKeysPolicies.BASIC_NOTIFICATION_RECIPIENT &&
    updatedData.basicNotificationRecipient.values.length > 0;

  const showMinCredBureauRiskScore =
    stepKey === stepKeysPolicies.MINIMUM_CREDIT_BUREAU_RISKSCORE &&
    updatedData.minimumCreditBureauRiskScore.values.length > 0;

  const showNotificationChannel =
    stepKey === stepKeysPolicies.NOTIFICATION_CHANNEL &&
    updatedData.notificationChannel.values.length > 0;

  const showRiskScoreApiUrl =
    stepKey === stepKeysPolicies.RISKSCORE_API_URL &&
    updatedData.riskScoreApiUrl.values.length > 0;

  return (
    <>
      {stepKey === stepKeysPolicies.DECISIONS_GENERAL && (
        <RenderDecisionsGenVerification
          values={updatedData.decisionsGeneral.values}
          isMobile={isMobile}
          optionsGenDecision={optionsGenDecision}
        />
      )}

      {showContributions && (
        <RendersRuleVerification
          values={updatedData.contributionsPortfolio.values}
          isMobile={isMobile}
        />
      )}

      {showIncome && (
        <RendersRuleVerification
          values={updatedData.incomePortfolio.values}
          isMobile={isMobile}
        />
      )}
      {showScoreModels && (
        <RendersRuleVerification
          values={updatedData.scoreModels.values}
          isMobile={isMobile}
        />
      )}
      {showMinimumIncome && (
        <RendersRuleVerification
          values={updatedData.minimumIncomePercentage.values}
          isMobile={isMobile}
        />
      )}

      {showBasicNotifFormat && (
        <RendersRuleVerification
          values={updatedData.basicNotificationFormat.values}
          isMobile={isMobile}
        />
      )}
      {showBasicNotifRecipient && (
        <RendersRuleVerification
          values={updatedData.basicNotificationRecipient.values}
          isMobile={isMobile}
        />
      )}
      {showMinCredBureauRiskScore && (
        <RendersRuleVerification
          values={updatedData.minimumCreditBureauRiskScore.values}
          isMobile={isMobile}
        />
      )}
      {showNotificationChannel && (
        <RendersRuleVerification
          values={updatedData.notificationChannel.values}
          isMobile={isMobile}
        />
      )}
      {showRiskScoreApiUrl && (
        <RendersRuleVerification
          values={updatedData.riskScoreApiUrl.values}
          isMobile={isMobile}
        />
      )}
    </>
  );
};

export { VerificationBoxes };
