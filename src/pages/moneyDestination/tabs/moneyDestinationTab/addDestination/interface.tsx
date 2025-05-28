import {
  Assisted,
  Breadcrumbs,
  Stack,
  useMediaQuery,
} from "@inubekit/inubekit";

import { Title } from "@design/data/title";
import { tokens } from "@design/tokens";
import { GeneralInformationForm } from "@design/forms/generalInformationDestination";
import { DecisionsForm } from "@design/forms/decisions";
import { revertModalDisplayData } from "@utils/revertModalDisplayData";
import { crumbsAddDestination } from "@config/moneyDestination/addDestination/breadcrumbs";
import { textValuesBusinessRules } from "@config/moneyDestination/moneyDestinationTab/businessRules";
import { attentionModal, deleteModal } from "@config/decisions/messages";
import { decisionTemplateConfig } from "@config/decisions/decisionTemplateDestination";
import { VerificationForm } from "@design/forms/verificationDestination";
import { controlsAssisted } from "@config/controlsAssisted";
import { lineCreditLabels } from "@config/moneyDestination/addDestination/assisted/lineCreditLabels";
import { IAddDestinationUI } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IAddDestinationUI";
import { locationConfig } from "@config/moneyDestination/addDestination/location";

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
  } = props;

  const smallScreen = useMediaQuery("(max-width: 990px)");

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
            title={locationConfig.title}
            description={locationConfig.description}
            sizeTitle="large"
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
            {currentStep === 1 && (
              <GeneralInformationForm
                ref={generalInformationRef}
                initialValues={initialGeneralInformationValues}
                onFormValid={setIsCurrentFormValid}
                onButtonClick={onNextStep}
              />
            )}
            {currentStep === 2 && (
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
            {currentStep === 3 && (
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
              />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export { AddDestinationUI };
