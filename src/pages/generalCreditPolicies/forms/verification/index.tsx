import { MdOutlineArrowBack } from "react-icons/md";
import { Button, Stack } from "@inubekit/inubekit";

import { DateGeneralPolicies } from "@pages/generalCreditPolicies/dateGeneralPolicies";
import { EComponentAppearance } from "@enum/appearances";
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
    optionsGenDecision,
    setDateVerification,
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
              optionsGenDecision={optionsGenDecision}
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
        <Button onClick={onPreviousStep} appearance={EComponentAppearance.GRAY}>
          {verificationFormLabels.previous}
        </Button>

        <Button
          onClick={onToggleModal}
          appearance={EComponentAppearance.PRIMARY}
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
          appearance={EComponentAppearance.SUCCESS}
          onCloseRequestStatus={onCloseRequestStatus}
          onCloseProcess={onCloseProcess}
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
          appearance={EComponentAppearance.PRIMARY}
        />
      )}
    </Stack>
  );
};

export { VerificationForm };
