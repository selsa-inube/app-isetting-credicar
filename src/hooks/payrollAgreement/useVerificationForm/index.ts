import { useMediaQuery } from "@inubekit/inubekit";
import { addPayrollAgreementSteps } from "@config/payrollAgreement/payrollAgreementTab/assisted/steps";
import { verificationFormLabels } from "@config/payrollAgreement/payrollAgreementTab/assisted/verificationFormLabels";
import { mediaQueryMobile, mediaQueryTablet } from "@config/environment";
import { IUseVerification } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IUseVerification";

const useVerification = (props: IUseVerification) => {
  const {
    updatedData,
    showRequestProcessModal,
    savePayrollAgreement,
    typeRegularPayroll,
    showPendingRequestModal,
  } = props;

  const isTablet = useMediaQuery(mediaQueryTablet);

  const isMobile = useMediaQuery(mediaQueryMobile);

  const canShowRequestProcess = showRequestProcessModal && savePayrollAgreement;

  const canShowPendingRequest =
    showPendingRequestModal &&
    savePayrollAgreement &&
    savePayrollAgreement.requestNumber.length > 0;

  const steps = addPayrollAgreementSteps.filter((step) => {
    if (step.name.toLowerCase() === verificationFormLabels.verification)
      return false;
    if (
      Number(step.id) === 4 &&
      (!updatedData.extraordinaryCycles.values ||
        updatedData.extraordinaryCycles.values.length === 0)
    ) {
      return false;
    }
    if (typeRegularPayroll) return true;
    return Number(step.id) !== 3;
  });

  return {
    steps,
    isTablet,
    isMobile,
    canShowRequestProcess,
    canShowPendingRequest,
  };
};

export { useVerification };
