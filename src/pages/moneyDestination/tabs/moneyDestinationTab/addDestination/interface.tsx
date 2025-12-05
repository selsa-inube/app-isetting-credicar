import { Assisted, Breadcrumbs, Stack } from "@inubekit/inubekit";

import { GeneralInformationForm } from "@pages/moneyDestination/tabs/forms/generalInformationDestination";
import { VerificationForm } from "@pages/moneyDestination/tabs/forms/verificationDestination";
import { Title } from "@design/data/title";
import { tokens } from "@design/tokens";
import { DecisionModal } from "@design/modals/decisionModal";
import { EStepsKeysMoneyDestination } from "@enum/stepsKeysMoneyDest";
import { crumbsAddDestination } from "@config/moneyDestination/addDestination/navigation";
import { controlsAssisted } from "@config/controlsAssisted";
import { addDestinatrionLabels } from "@config/moneyDestination/moneyDestinationTab/addDestinationLabels";
import { portalId } from "@config/portalId";
import { IAddDestinationUI } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IAddDestinationUI";

const AddDestinationUI = (props: IAddDestinationUI) => {
  const {
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
    smallScreen,
    modalData,
    showDecision,
    creditLineValues,
    showDecisionModal,
    setShowDecisionModal,
    setCreditLineValues,
    onOpenModal,
    onFinishForm,
    onNextStep,
    onPreviousStep,
    onToggleModal,
    setCurrentStep,
    setIsCurrentFormValid,
    onCloseRequestStatus,
    onClosePendingReqModal,
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
                creditLineValues={creditLineValues}
                setCreditLineValues={setCreditLineValues}
                showDecisionModal={showDecisionModal}
                setShowDecisionModal={setShowDecisionModal}
              />
            )}
            {currentStep === EStepsKeysMoneyDestination.VERIFICATION && (
              <VerificationForm
                updatedData={{
                  personalInformation: {
                    isValid: isCurrentFormValid,
                    values: initialGeneralInformationValues,
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
          moreDetails={modalData.moreDetails}
          description={modalData.description}
          actionText={modalData.actionText}
          onCloseModal={modalData.onCloseModal}
          onClick={modalData.onClick}
          withCancelButton={modalData.withCancelButton}
          withIcon={modalData.withIcon}
          icon={modalData.icon}
          appearance={modalData.appearance}
          appearanceButton={modalData.appearanceButton}
        />
      )}
    </Stack>
  );
};

export { AddDestinationUI };
