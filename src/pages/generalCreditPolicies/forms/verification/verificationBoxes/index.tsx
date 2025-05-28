import { stepKeysPolicies } from "@enum/stepsKeysPolicies";
import { IVerificationBoxes } from "@ptypes/generalCredPolicies/forms/IVerificationBoxes";
import { RenderDecisionsGenVerification } from "../decisionsGenVerification";
import { RenderContributionsVerification } from "../contributionsPortfVerification";
import { RenderIncomeVerification } from "../incomePortfVerification";

const VerificationBoxes = (props: IVerificationBoxes) => {
  const { updatedData, stepKey, isMobile } = props;

  const showContributions =
    stepKey === stepKeysPolicies.CONTRIBUTIONS_PORTFOLIO &&
    updatedData.contributionsPortfolio.values.length > 0;

  const showIncome =
    stepKey === stepKeysPolicies.INCOME_PORTFOLIO &&
    updatedData.incomePortfolio.values.length > 0;

  const showScoreModels =
    stepKey === stepKeysPolicies.SCORE_MODELS &&
    updatedData.scoreModels.values.length > 0;

  return (
    <>
      {stepKey === stepKeysPolicies.DECISIONS_GENERAL && (
        <RenderDecisionsGenVerification
          values={updatedData.decisionsGeneral.values}
          isMobile={isMobile}
        />
      )}

      {showContributions && (
        <RenderContributionsVerification
          values={updatedData.contributionsPortfolio.values}
          isMobile={isMobile}
        />
      )}

      {showIncome && (
        <RenderIncomeVerification
          values={updatedData.incomePortfolio.values}
          isMobile={isMobile}
        />
      )}
      {showScoreModels && (
        <RenderIncomeVerification
          values={updatedData.scoreModels.values}
          isMobile={isMobile}
        />
      )}
    </>
  );
};

export { VerificationBoxes };
