import { MdOutlineArrowBack } from "react-icons/md";
import { Button, Stack } from "@inubekit/inubekit";

import { EComponentAppearance } from "@enum/appearances";
import { Accordion } from "@design/data/accordions";
import { tokens } from "@design/tokens";
import { DecisionModal } from "@design/modals/decisionModal";
import { RequestProcess } from "@design/feedback/RequestProcess";
import { RequestStatusModal } from "@design/modals/requestStatusModal";
import { requestProcessMessage } from "@config/payrollAgreement/payrollAgreementTab/generic/requestProcessMessage";
import { finishModal } from "@config/payrollAgreement/payrollAgreementTab/generic/finishModal";
import { requestStatusMessage } from "@config/payrollAgreement/payrollAgreementTab/generic/requestStatusMessage";
import { IVerificationForm } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IVerificationForm";
import { useVerification } from "@hooks/payrollAgreement/useVerificationForm";
import { verificationFormLabels } from "@config/payrollAgreement/payrollAgreementTab/assisted/verificationFormLabels";
import { portalId } from "@config/portalId";
import { VerificationBoxes } from "./verificationBoxes";

const VerificationForm = (props: IVerificationForm) => {
  const {
    requestSteps,
    showModal,
    showRequestProcessModal,
    updatedData,
    savePayrollAgreement,
    loading,
    typeRegularPayroll,
    showPendingReqModal,
    handleStepChange,
    onFinishForm,
    onPreviousStep,
    onToggleModal,
    onCloseRequestStatus,
    onClosePendingReqModal,
    onCloseProcess,
  } = props;

  const {
    steps,
    isTablet,
    isMobile,
    canShowRequestProcess,
    canShowPendingRequest,
  } = useVerification({
    updatedData,
    showRequestProcessModal,
    savePayrollAgreement,
    typeRegularPayroll,
    showPendingReqModal,
  });

  return (
    <Stack direction="column" gap={tokens.spacing.s300}>
      {steps.map((step) => (
        <Accordion title={step.name} key={`${step.id}-box`}>
          <Stack
            direction="column"
            width="100%"
            alignItems="flex-end"
            gap={isTablet ? tokens.spacing.s150 : tokens.spacing.s200}
          >
            <VerificationBoxes
              typeRegularPayroll={typeRegularPayroll}
              updatedData={updatedData}
              stepKey={Number(step.id)}
              isMobile={isMobile}
            />

            <Button
              iconBefore={<MdOutlineArrowBack />}
              onClick={() => handleStepChange(step.number)}
              appearance={EComponentAppearance.DARK}
              variant="none"
            >
              {verificationFormLabels.returnStep}
            </Button>
          </Stack>
        </Accordion>
      ))}
      <Stack justifyContent="flex-end" gap={tokens.spacing.s250}>
        <Button
          fullwidth={isMobile}
          onClick={onPreviousStep}
          appearance={EComponentAppearance.GRAY}
        >
          {verificationFormLabels.previous}
        </Button>

        <Button
          fullwidth={isMobile}
          onClick={onToggleModal}
          appearance={EComponentAppearance.PRIMARY}
        >
          {verificationFormLabels.finally}
        </Button>
      </Stack>

      {showModal && (
        <DecisionModal
          portalId="portal"
          title={finishModal.title}
          description={finishModal.description}
          actionText={finishModal.actionText}
          onCloseModal={onToggleModal}
          onClick={onFinishForm}
          loading={loading}
        />
      )}
      {canShowRequestProcess && (
        <RequestProcess
          portalId="portal"
          saveData={savePayrollAgreement}
          descriptionRequestProcess={requestProcessMessage}
          descriptionRequestStatus={requestStatusMessage}
          requestProcessSteps={requestSteps}
          appearance={EComponentAppearance.SUCCESS}
          onCloseRequestStatus={onCloseRequestStatus}
          onCloseProcess={onCloseProcess}
        />
      )}
      {canShowPendingRequest && (
        <RequestStatusModal
          portalId={portalId}
          title={requestStatusMessage(savePayrollAgreement.staffName).title}
          description={
            requestStatusMessage(savePayrollAgreement.staffName).description
          }
          requestNumber={savePayrollAgreement.requestNumber}
          onClick={onClosePendingReqModal}
          onCloseModal={onClosePendingReqModal}
          loading={false}
          actionText={
            requestStatusMessage(savePayrollAgreement.staffName).actionText
          }
          appearance={EComponentAppearance.PRIMARY}
        />
      )}
    </Stack>
  );
};

export { VerificationForm };
