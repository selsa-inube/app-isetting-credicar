import { useMediaQuery } from "@inubekit/inubekit";
import { IUseVerificationForm } from "@ptypes/hooks/IUseVerificationForm";

const useVerificationForm = (props: IUseVerificationForm) => {
  const {
    showRequestProcessModal,
    saveGeneralPolicies,
    showPendingReqModal,
    updatedData,
    addGenCredPoliciesSteps,
  } = props;
  const isTablet = useMediaQuery("(max-width: 1224px)");

  const isMobile = useMediaQuery("(max-width: 990px)");

  const canShowRequestProcess = showRequestProcessModal && saveGeneralPolicies;

  const canShowPendingRequest =
    showPendingReqModal && saveGeneralPolicies.requestNumber;

  const contributionsPortf = updatedData.contributionsPortfolio.values;
  const incomePortfolio = updatedData.incomePortfolio.values;
  const scoreModels = updatedData.scoreModels.values;

  const steps = addGenCredPoliciesSteps.filter((step) => {
    if (step.name.toLowerCase() === "verificación") return false;

    if (contributionsPortf.length === 0 && step.id === 2) return false;

    if (incomePortfolio.length === 0 && step.id === 3) return false;

    if (scoreModels.length === 0 && step.id === 4) return false;

    return true;
  });

  return {
    steps,
    isTablet,
    isMobile,
    canShowRequestProcess,
    canShowPendingRequest,
  };
};

export { useVerificationForm };
