import { Assisted, Breadcrumbs, Stack } from "@inubekit/inubekit";
import { Title } from "@design/data/title";
import { tokens } from "@design/tokens";
import { IAddGenCreditPoliciesUI } from "@ptypes/generalCredPolicies/IAddGenCreditPoliciesUI";
import { addLabels } from "@config/generalCreditPolicies/assisted/addLabels";
import { crumbsAddGenCredPolicies } from "@config/generalCreditPolicies/assisted/navigation";
import { controlsAssisted } from "@config/controlsAssisted";
import { DecisionsForm } from "@design/forms/decisions";
import { deleteModal } from "@config/decisions/messages";
import { decisionContributionsPortfConfig } from "@config/decisions/decisionTempContributionsPortfolio";
import { revertModalDisplayData } from "@utils/revertModalDisplayData";
import { decisionIncomePortfolioConfig } from "@config/decisions/decisionTempIncomePortfolio";
import { textValuesBusinessRules } from "@config/generalCreditPolicies/assisted/businessRules";
import { contributionsPortfLabels } from "@config/generalCreditPolicies/assisted/contributionsPortfLabels";
import { incomePortfLabels } from "@config/generalCreditPolicies/assisted/incomePortfLabels";
import { ENameRules } from "@enum/nameRules";
import { decisionScoreModelsConfig } from "@config/decisions/decisionTempScoreModels";
import { scoreModelsLabels } from "@config/generalCreditPolicies/assisted/scoreModelsLabels";
import { DecisionModal } from "@design/modals/decisionModal";
import { goBackModal } from "@config/goBackModal";
import { portalId } from "@config/portalId";
import { DecisionsGeneralForm } from "../forms/decisionsGeneral";
import { VerificationForm } from "../forms/verification";

const AddGenCreditPoliciesUI = (props: IAddGenCreditPoliciesUI) => {
  const {
    currentStep,
    formReferences,
    formValid,
    initialValues,
    smallScreen,
    steps,
    contributionsPortfolio,
    incomePortfolio,
    scoreModels,
    showModal,
    showRequestProcessModal,
    requestSteps,
    saveGeneralPolicies,
    loading,
    showPendingReqModal,
    dateVerification,
    showGoBackModal,
    onOpenModal,
    onCloseGoBackModal,
    onGoBack,
    setDateVerification,
    onCloseRequestStatus,
    onClosePendingReqModal,
    onFinishForm,
    setScoreModels,
    setIncomePortfolio,
    setContributionsPortfolio,
    setCurrentStep,
    handleFormValidChange,
    onNextStep,
    onPreviousStep,
    onToggleModal,
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
          <Breadcrumbs crumbs={crumbsAddGenCredPolicies} />
          <Title
            title={addLabels.title}
            description={addLabels.description}
            sizeTitle="large"
            navigatePage="/"
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
            disableNext={formValid}
            controls={controlsAssisted}
            showCurrentStepNumber={false}
            size={smallScreen ? "small" : "large"}
          />
          <Stack direction="column">
            {currentStep === 1 && (
              <DecisionsGeneralForm
                ref={formReferences.decisionsGeneral}
                initialValues={initialValues.decisionsGeneral.values}
                handleNextStep={onNextStep}
                handleFormValidChange={handleFormValidChange}
              />
            )}
            {currentStep === 2 && (
              <DecisionsForm
                deleteModal={deleteModal}
                textValuesBusinessRules={textValuesBusinessRules}
                decisionTemplateConfig={decisionContributionsPortfConfig}
                onButtonClick={onNextStep}
                onPreviousStep={onPreviousStep}
                initialValues={contributionsPortfolio}
                setDecisions={setContributionsPortfolio}
                revertModalDisplayData={revertModalDisplayData}
                labelBusinessRules={ENameRules.CONTRIBUTIONS_PORTFOLIO}
                nameRule=""
                titleContentAddCard={
                  contributionsPortfLabels.titleContentAddCard
                }
                messageEmptyDecisions={
                  contributionsPortfLabels.messageEmptyDecisions as unknown as string
                }
              />
            )}
            {currentStep === 3 && (
              <DecisionsForm
                deleteModal={deleteModal}
                textValuesBusinessRules={textValuesBusinessRules}
                decisionTemplateConfig={decisionIncomePortfolioConfig}
                onButtonClick={onNextStep}
                onPreviousStep={onPreviousStep}
                initialValues={incomePortfolio}
                setDecisions={setIncomePortfolio}
                revertModalDisplayData={revertModalDisplayData}
                labelBusinessRules={ENameRules.INCOME_PORTFOLIO}
                nameRule=""
                titleContentAddCard={incomePortfLabels.titleContentAddCard}
                messageEmptyDecisions={
                  incomePortfLabels.messageEmptyDecisions as unknown as string
                }
              />
            )}
            {currentStep === 4 && (
              <DecisionsForm
                deleteModal={deleteModal}
                textValuesBusinessRules={textValuesBusinessRules}
                decisionTemplateConfig={decisionScoreModelsConfig}
                onButtonClick={onNextStep}
                onPreviousStep={onPreviousStep}
                initialValues={scoreModels}
                setDecisions={setScoreModels}
                revertModalDisplayData={revertModalDisplayData}
                labelBusinessRules={ENameRules.SCORE_MODELS}
                nameRule=""
                ruleCatalog={ENameRules.RULE_CATALOG_IRISK}
                titleContentAddCard={scoreModelsLabels.titleContentAddCard}
                messageEmptyDecisions={
                  scoreModelsLabels.messageEmptyDecisions as unknown as string
                }
              />
            )}
            {currentStep === 5 && (
              <VerificationForm
                updatedData={{
                  decisionsGeneral: {
                    isValid: formValid,
                    values: initialValues.decisionsGeneral.values,
                  },

                  contributionsPortfolio: {
                    isValid: formValid,
                    values: contributionsPortfolio,
                  },
                  incomePortfolio: {
                    isValid: formValid,
                    values: incomePortfolio,
                  },
                  scoreModels: {
                    isValid: formValid,
                    values: scoreModels,
                  },
                }}
                requestSteps={requestSteps}
                onPreviousStep={onPreviousStep}
                handleStepChange={(stepId) => setCurrentStep(stepId)}
                showModal={showModal}
                showRequestProcessModal={showRequestProcessModal}
                onToggleModal={onToggleModal}
                onFinishForm={onFinishForm}
                saveGeneralPolicies={saveGeneralPolicies}
                loading={loading}
                onCloseRequestStatus={onCloseRequestStatus}
                showPendingReqModal={showPendingReqModal}
                onClosePendingReqModal={onClosePendingReqModal}
                date={dateVerification}
                setDateVerification={setDateVerification}
                onCloseProcess={onCloseProcess}
              />
            )}
          </Stack>
        </Stack>
      </Stack>
      {showGoBackModal && (
        <DecisionModal
          portalId={portalId}
          title={goBackModal.title}
          description={goBackModal.description}
          actionText={goBackModal.actionText}
          onCloseModal={onCloseGoBackModal}
          onClick={onGoBack}
        />
      )}
    </Stack>
  );
};

export { AddGenCreditPoliciesUI };
