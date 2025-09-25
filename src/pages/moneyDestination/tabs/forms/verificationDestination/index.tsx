import { MdOutlineArrowBack } from "react-icons/md";
import { Button, Stack, useMediaQuery } from "@inubekit/inubekit";

import { EComponentAppearance } from "@enum/appearances";
import { Accordion } from "@design/data/accordions";
import { tokens } from "@design/tokens";
import { DecisionModal } from "@design/modals/decisionModal";
import { RequestProcess } from "@design/feedback/RequestProcess";
import { RequestStatusModal } from "@design/modals/requestStatusModal";
import { verificationLabels } from "@config/moneyDestination/moneyDestinationTab/form/verificationLabels";
import { finishModal } from "@config/moneyDestination/moneyDestinationTab/form/verificationForm";
import { addDestinationStepsConfig } from "@config/moneyDestination/addDestination/assisted";
import { requestProcessMessage } from "@config/moneyDestination/moneyDestinationTab/generics/requestProcessMessage";
import { requestStatusMessage } from "@config/moneyDestination/moneyDestinationTab/generics/requestStatusMessage";
import { portalId } from "@config/portalId";
import { mediaQueryTablet } from "@config/environment";
import { IVerificationForm } from "@ptypes/moneyDestination/IVerificationForm";
import { VerificationBoxes } from "./verificationBoxes";

const VerificationForm = (props: IVerificationForm) => {
  const {
    requestSteps,
    showModal,
    showRequestProcessModal,
    updatedData,
    saveMoneyDestination,
    loading,
    showPendingReqModal,
    handleStepChange,
    onFinishForm,
    onPreviousStep,
    onToggleModal,
    onCloseRequestStatus,
    onCloseProcess,
    onClosePendingReqModal,
  } = props;

  const isTablet = useMediaQuery(mediaQueryTablet);

  const showRequestProcess = showRequestProcessModal && saveMoneyDestination;

  const ShowRequestStatus =
    showPendingReqModal && saveMoneyDestination.requestNumber;

  return (
    <Stack direction="column" gap={tokens.spacing.s300}>
      {addDestinationStepsConfig
        .filter((step) => step.name.toLowerCase() !== "verificación")
        .map((step) => (
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
              />

              <Button
                iconBefore={<MdOutlineArrowBack />}
                onClick={() => handleStepChange(step.number)}
                appearance={EComponentAppearance.DARK}
                variant="none"
              >
                {verificationLabels.returnStep}
              </Button>
            </Stack>
          </Accordion>
        ))}
      <Stack justifyContent="flex-end" gap={tokens.spacing.s250}>
        <Button onClick={onPreviousStep} appearance={EComponentAppearance.GRAY}>
          {verificationLabels.previus}
        </Button>

        <Button
          onClick={onToggleModal}
          appearance={EComponentAppearance.PRIMARY}
        >
          {verificationLabels.finish}
        </Button>
      </Stack>

      {showModal && (
        <DecisionModal
          portalId={portalId}
          title={finishModal.title}
          description={finishModal.description}
          actionText={finishModal.actionText}
          onCloseModal={onToggleModal}
          onClick={onFinishForm}
          loading={loading}
        />
      )}
      {showRequestProcess && (
        <RequestProcess
          portalId={portalId}
          saveData={saveMoneyDestination}
          descriptionRequestProcess={requestProcessMessage}
          descriptionRequestStatus={requestStatusMessage}
          requestProcessSteps={requestSteps}
          appearance={EComponentAppearance.SUCCESS}
          onCloseRequestStatus={onCloseRequestStatus}
          onCloseProcess={onCloseProcess}
        />
      )}
      {ShowRequestStatus && (
        <RequestStatusModal
          portalId={portalId}
          title={requestStatusMessage(saveMoneyDestination.staffName).title}
          description={
            requestStatusMessage(saveMoneyDestination.staffName).description
          }
          requestNumber={saveMoneyDestination.requestNumber}
          onClick={onClosePendingReqModal}
          onCloseModal={onClosePendingReqModal}
          loading={false}
          actionText={
            requestStatusMessage(saveMoneyDestination.staffName).actionText
          }
          appearance={EComponentAppearance.PRIMARY}
        />
      )}
    </Stack>
  );
};

export { VerificationForm };
