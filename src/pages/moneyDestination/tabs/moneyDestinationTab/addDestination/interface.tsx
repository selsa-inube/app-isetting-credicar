import { Assisted, Breadcrumbs, Stack } from "@inubekit/inubekit";

import { GeneralInformationForm } from "@pages/moneyDestination/tabs/forms/generalInformationDestination";
import { VerificationForm } from "@pages/moneyDestination/tabs/forms/verificationDestination";
import { Title } from "@design/data/title";
import { tokens } from "@design/tokens";
import { DecisionModal } from "@design/modals/decisionModal";
import { DecisionsForm } from "@design/forms/decisions";
import { EStepsKeysMoneyDestination } from "@enum/stepsKeysMoneyDest";
import { revertModalDisplayData } from "@utils/revertModalDisplayData";
import { crumbsAddDestination } from "@config/moneyDestination/addDestination/navigation";
import { textValuesBusinessRules } from "@config/moneyDestination/moneyDestinationTab/businessRules";
import { attentionModal, deleteModal } from "@config/decisions/messages";
import { decisionTemplateConfig } from "@config/decisions/decisionTemplateDestination";
import { controlsAssisted } from "@config/controlsAssisted";
import { lineCreditLabels } from "@config/moneyDestination/addDestination/assisted/lineCreditLabels";
import { addDestinatrionLabels } from "@config/moneyDestination/moneyDestinationTab/addDestinationLabels";
import { portalId } from "@config/portalId";
import { IAddDestinationUI } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IAddDestinationUI";

const AddDestinationUI = (props: IAddDestinationUI) => {
  const {
    creditLineDecisions,
    currentStep,
    generalInformationRef,
    initialGeneralInformationValues,
    isCurrentFormValid,
    requestSteps,
    showModal,
    showRequestProcessModal,
    steps,
    loading,
    saveMoneyDestination,
    showPendingReqModal,
    showAttentionModal,
    smallScreen,
    modalData,
    showDecision,
    onOpenModal,
    onFinishForm,
    onNextStep,
    onPreviousStep,
    onToggleModal,
    setCreditLineDecisions,
    setCurrentStep,
    setIsCurrentFormValid,
    onCloseRequestStatus,
    onClosePendingReqModal,
    setShowAttentionModal,
    onCloseProcess,
  } = props;

  return (
    <Stack
      direction="column"
      width="-webkit-fill-available"
      padding={
        smallScreen
          ? `${tokens.spacing.s200}`
          : `${tokens.spacing.s300} ${tokens.spacing.s800}`
      }
    >
      <Stack gap={tokens.spacing.s300} direction="column">
        <Stack gap={tokens.spacing.s300} direction="column">
          <Breadcrumbs crumbs={crumbsAddDestination} />
          <Title
            title={addDestinatrionLabels.title}
            description={addDestinatrionLabels.description}
            sizeTitle="large"
            onClick={onOpenModal}
          />
        </Stack>
        <Stack gap={tokens.spacing.s300} direction="column">
          <Assisted
            step={steps[currentStep - 1]}
            totalSteps={steps.length}
            onBackClick={onPreviousStep}
            onNextClick={onNextStep}
            onSubmitClick={onToggleModal}
            disableNext={!isCurrentFormValid}
            controls={controlsAssisted}
            size={smallScreen ? "small" : "large"}
          />
          <Stack direction="column">
            {currentStep === EStepsKeysMoneyDestination.GENERAL_DATA && (
              <GeneralInformationForm
                ref={generalInformationRef}
                initialValues={initialGeneralInformationValues}
                onFormValid={setIsCurrentFormValid}
                onButtonClick={onNextStep}
              />
            )}
            {currentStep === EStepsKeysMoneyDestination.LINE_CREDIT && (
              <DecisionsForm
                attentionModal={attentionModal}
                deleteModal={deleteModal}
                textValuesBusinessRules={textValuesBusinessRules}
                decisionTemplateConfig={decisionTemplateConfig}
                onButtonClick={onNextStep}
                onPreviousStep={onPreviousStep}
                initialValues={creditLineDecisions}
                setDecisions={setCreditLineDecisions}
                revertModalDisplayData={revertModalDisplayData}
                labelBusinessRules="LineOfCredit"
                nameRule={initialGeneralInformationValues.nameDestination}
                showAttentionModal={showAttentionModal}
                setShowAttentionModal={setShowAttentionModal}
                titleContentAddCard={lineCreditLabels.titleContentAddCard}
                messageEmptyDecisions={
                  lineCreditLabels.messageEmptyDecisions as unknown as string
                }
              />
            )}
            {currentStep === EStepsKeysMoneyDestination.VERIFICATION && (
              <VerificationForm
                updatedData={{
                  personalInformation: {
                    isValid: isCurrentFormValid,
                    values: initialGeneralInformationValues,
                  },
                  creditline: {
                    isValid: true,
                    values: creditLineDecisions,
                  },
                }}
                requestSteps={requestSteps}
                onPreviousStep={onPreviousStep}
                handleStepChange={(stepId) => setCurrentStep(stepId)}
                showModal={showModal}
                showRequestProcessModal={showRequestProcessModal}
                onToggleModal={onToggleModal}
                onFinishForm={onFinishForm}
                saveMoneyDestination={saveMoneyDestination}
                loading={loading}
                onCloseRequestStatus={onCloseRequestStatus}
                showPendingReqModal={showPendingReqModal}
                onClosePendingReqModal={onClosePendingReqModal}
                onCloseProcess={onCloseProcess}
              />
            )}
          </Stack>
        </Stack>
      </Stack>
      {showDecision && (
        <DecisionModal
          portalId={portalId}
          title={modalData.title}
          description={modalData.description}
          actionText={modalData.actionText}
          onCloseModal={modalData.onCloseModal}
          onClick={modalData.onClick}
        />
      )}
    </Stack>
  );
};

export { AddDestinationUI };
