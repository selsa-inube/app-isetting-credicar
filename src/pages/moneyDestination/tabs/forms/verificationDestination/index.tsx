import { MdOutlineArrowBack } from "react-icons/md";
import { Button, Stack, useMediaQuery } from "@inubekit/inubekit";

import { ComponentAppearance } from "@enum/appearances";
import { Accordion } from "@design/data/accordions";
import { tokens } from "@design/tokens";
import { addDestinationStepsConfig } from "@config/moneyDestination/addDestination/assisted";
import { finishModal } from "@config/moneyDestination/moneyDestinationTab/form/verificationForm";
import { IFormsUpdateData } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IFormsUpdateData";
import { DecisionModal } from "@design/modals/decisionModal";

import { requestProcessMessage } from "@config/moneyDestination/moneyDestinationTab/generics/requestProcessMessage";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { requestStatusMessage } from "@config/moneyDestination/moneyDestinationTab/generics/requestStatusMessage";
import { RequestProcess } from "@design/feedback/RequestProcess";
import { RequestStatusModal } from "@design/modals/requestStatusModal";
import { verificationLabels } from "@config/moneyDestination/moneyDestinationTab/form/verificationLabels";
import { IRequestSteps } from "@ptypes/design/IRequestSteps";
import { VerificationBoxes } from "./verificationBoxes";

interface IVerificationForm {
  requestSteps: IRequestSteps[];
  showModal: boolean;
  showRequestProcessModal: boolean;
  updatedData: IFormsUpdateData;
  saveMoneyDestination: ISaveDataResponse;
  loading: boolean;
  showPendingReqModal: boolean;
  handleStepChange: (stepId: number) => void;
  onFinishForm: () => void;
  onPreviousStep: () => void;
  onToggleModal: () => void;
  onCloseRequestStatus: () => void;
  onCloseProcess: () => void;
  onClosePendingReqModal: () => void;
}

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

  const isTablet = useMediaQuery("(max-width: 1224px)");

  const showRequestProcess = showRequestProcessModal && saveMoneyDestination;

  const ShowRequestStatus =
    showPendingReqModal && saveMoneyDestination.requestNumber;

  return (
    <Stack direction="column" gap={tokens.spacing.s300}>
      {addDestinationStepsConfig("")
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
                appearance={ComponentAppearance.DARK}
                variant="none"
              >
                {verificationLabels.returnStep}
              </Button>
            </Stack>
          </Accordion>
        ))}
      <Stack justifyContent="flex-end" gap={tokens.spacing.s250}>
        <Button onClick={onPreviousStep} appearance={ComponentAppearance.GRAY}>
          {verificationLabels.previus}
        </Button>

        <Button
          onClick={onToggleModal}
          appearance={ComponentAppearance.PRIMARY}
        >
          {verificationLabels.finish}
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
      {showRequestProcess && (
        <RequestProcess
          portalId="portal"
          saveData={saveMoneyDestination}
          descriptionRequestProcess={requestProcessMessage}
          descriptionRequestStatus={requestStatusMessage}
          requestProcessSteps={requestSteps}
          appearance={ComponentAppearance.SUCCESS}
          onCloseRequestStatus={onCloseRequestStatus}
          onCloseProcess={onCloseProcess}
        />
      )}
      {ShowRequestStatus && (
        <RequestStatusModal
          portalId="portal"
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
          appearance={ComponentAppearance.PRIMARY}
        />
      )}
    </Stack>
  );
};

export { VerificationForm };
