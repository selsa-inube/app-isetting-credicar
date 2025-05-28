import { MdOutlineArrowBack } from "react-icons/md";
import { Button, Stack } from "@inubekit/inubekit";

import { ComponentAppearance } from "@enum/appearances";
import { Accordion } from "@design/data/accordions";
import { tokens } from "@design/tokens";
import { RequestProcess } from "@design/feedback/RequestProcess";
import { RequestStatusModal } from "@design/modals/requestStatusModal";
import { IVerificationForm } from "@ptypes/generalCredPolicies/forms/IVerificationForm";
import { addGenCredPoliciesSteps } from "@config/generalCreditPolicies/assisted/steps";
import { verificationFormLabels } from "@config/generalCreditPolicies/assisted/verificationFormLabels";
import { requestStatusMessage } from "@config/generalCreditPolicies/generic/requestStatusMessage";
import { requestProcessMessage } from "@config/generalCreditPolicies/generic/requestProcessMessage";
import { useVerificationForm } from "@hooks/GeneralCreditPolicies/useVerificationForm";
import { IDateVerification } from "@ptypes/generalCredPolicies/forms/IDateVerification";
import { VerificationBoxes } from "./verificationBoxes";
import { DateGeneralPolicies } from "../../dateGeneralPolicies";

const VerificationForm = (props: IVerificationForm) => {
  const {
    requestSteps,
    showModal,
    showRequestProcessModal,
    updatedData,
    saveGeneralPolicies,
    loading,
    showPendingReqModal,
    date,
    setDateVerification,
    handleStepChange,
    onFinishForm,
    onPreviousStep,
    onToggleModal,
    onCloseRequestStatus,
    onClosePendingReqModal,
  } = props;

  const {
    steps,
    isTablet,
    isMobile,
    canShowRequestProcess,
    canShowPendingRequest,
  } = useVerificationForm({
    showRequestProcessModal,
    saveGeneralPolicies,
    showPendingReqModal,
    updatedData,
    addGenCredPoliciesSteps,
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
              updatedData={updatedData}
              stepKey={Number(step.id)}
              isMobile={isMobile}
            />

            <Button
              iconBefore={<MdOutlineArrowBack />}
              onClick={() => handleStepChange(step.number)}
              appearance={ComponentAppearance.DARK}
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
          appearance={ComponentAppearance.GRAY}
        >
          {verificationFormLabels.previous}
        </Button>

        <Button
          fullwidth={isMobile}
          onClick={onToggleModal}
          appearance={ComponentAppearance.PRIMARY}
        >
          {verificationFormLabels.finally}
        </Button>
      </Stack>

      {showModal && (
        <DateGeneralPolicies
          onCloseModal={onToggleModal}
          onFinishForm={onFinishForm}
          loading={loading}
          initialValues={date ?? ({} as IDateVerification)}
          setDateVerification={setDateVerification}
        />
      )}
      {canShowRequestProcess && (
        <RequestProcess
          portalId="portal"
          saveData={saveGeneralPolicies}
          descriptionRequestProcess={requestProcessMessage}
          descriptionRequestStatus={requestStatusMessage}
          requestProcessSteps={requestSteps}
          appearance={ComponentAppearance.SUCCESS}
          onCloseRequestStatus={onCloseRequestStatus}
        />
      )}
      {canShowPendingRequest && (
        <RequestStatusModal
          portalId="portal"
          title={requestStatusMessage(saveGeneralPolicies.staffName).title}
          description={
            requestStatusMessage(saveGeneralPolicies.staffName).description
          }
          requestNumber={saveGeneralPolicies.requestNumber}
          onClick={onClosePendingReqModal}
          onCloseModal={onClosePendingReqModal}
          loading={false}
          actionText={
            requestStatusMessage(saveGeneralPolicies.staffName).actionText
          }
          appearance={ComponentAppearance.PRIMARY}
        />
      )}
    </Stack>
  );
};

export { VerificationForm };
