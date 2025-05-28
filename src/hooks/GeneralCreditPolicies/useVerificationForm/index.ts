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

  const { reciprocity, factor } = updatedData.decisionsGeneral.values;

  const steps = addGenCredPoliciesSteps.filter((step) => {
    if (step.name.toLowerCase() === "verificación") return false;

    if (reciprocity === false && step.id === 2) return false;

    if (factor === false && step.id === 3) return false;

    if (updatedData.scoreModels.values.length === 0 && step.id === 4)
      return false;

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
