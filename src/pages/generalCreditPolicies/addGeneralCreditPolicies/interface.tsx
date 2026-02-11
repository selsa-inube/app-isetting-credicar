import { Assisted, Breadcrumbs, Stack } from "@inubekit/inubekit";
import { Title } from "@design/data/title";
import { tokens } from "@design/tokens";
import { NewDecisionForm } from "@design/forms/NewDecisionForm";
import { DecisionModal } from "@design/modals/decisionModal";
import { stepKeysPolicies } from "@enum/stepsKeysPolicies";
import { EUseCase } from "@enum/useCase";
import { ENameRules } from "@enum/nameRules";
import { getNamePolicieStep } from "@utils/getNamePolicieStep";
import { addLabels } from "@config/generalCreditPolicies/assisted/addLabels";
import { crumbsAddGenCredPolicies } from "@config/generalCreditPolicies/assisted/navigation";
import { controlsAssisted } from "@config/controlsAssisted";
import { decisionTemplateGenPolicies } from "@config/decisions/decisionTemplateGenPolicies";
import { decisionsLabels } from "@config/generalCreditPolicies/assisted/decisionsLabels";
import { portalId } from "@config/portalId";
import { IAddGenCreditPoliciesUI } from "@ptypes/generalCredPolicies/IAddGenCreditPoliciesUI";
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
    showModal,
    showRequestProcessModal,
    requestSteps,
    saveGeneralPolicies,
    loading,
    showPendingReqModal,
    dateVerification,
    modalData,
    showDecision,
    disabledButton,
    rulesData,
    setDecisionData,
    onOpenModal,
    setDateVerification,
    onCloseRequestStatus,
    onClosePendingReqModal,
    onFinishForm,
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
            {currentStep === stepKeysPolicies.DECISIONS_GENERAL && (
              <DecisionsGeneralForm
                ref={formReferences.decisionsGeneral}
                initialValues={initialValues.decisionsGeneral.values}
                handleNextStep={onNextStep}
                handleFormValidChange={handleFormValidChange}
              />
            )}
            {currentStep === stepKeysPolicies.CONTRIBUTIONS_PORTFOLIO && (
              <NewDecisionForm
                ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
                labelBusinessRules={ENameRules.CONTRIBUTIONS_PORTFOLIO}
                nameRule="Número de veces los aportes"
                customMessageEmptyDecisions={decisionsLabels(
                  getNamePolicieStep(
                    stepKeysPolicies.CONTRIBUTIONS_PORTFOLIO,
                  ) ?? "",
                )}
                initialDecisions={rulesData.ReciprocityFactorForCreditLimit}
                editionMode={"classic"}
                option={EUseCase.ADD}
                loading={false}
                onPreviousStep={onPreviousStep}
                disabledButton={disabledButton}
                decisionTemplateConfig={decisionTemplateGenPolicies}
                setDecisionData={setDecisionData}
                onSave={onNextStep}
              />
            )}
            {currentStep === stepKeysPolicies.INCOME_PORTFOLIO && (
              <NewDecisionForm
                ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
                labelBusinessRules={ENameRules.INCOME_PORTFOLIO}
                nameRule="Número de veces los ingresos"
                customMessageEmptyDecisions={decisionsLabels(
                  getNamePolicieStep(stepKeysPolicies.INCOME_PORTFOLIO) ?? "",
                )}
                initialDecisions={rulesData.RiskScoreFactorForCreditLimit}
                editionMode={"classic"}
                option={EUseCase.ADD}
                loading={false}
                onPreviousStep={onPreviousStep}
                disabledButton={disabledButton}
                decisionTemplateConfig={decisionTemplateGenPolicies}
                setDecisionData={setDecisionData}
                onSave={onNextStep}
              />
            )}
            {currentStep === stepKeysPolicies.SCORE_MODELS && (
              <NewDecisionForm
                ruleCatalog={ENameRules.RULE_CATALOG_IRISK}
                labelBusinessRules={ENameRules.SCORE_MODELS}
                customMessageEmptyDecisions={decisionsLabels(
                  getNamePolicieStep(stepKeysPolicies.SCORE_MODELS) ?? "",
                )}
                initialDecisions={rulesData.CreditRiskScoringModel}
                editionMode={"classic"}
                option={EUseCase.ADD}
                loading={false}
                onPreviousStep={onPreviousStep}
                disabledButton={disabledButton}
                decisionTemplateConfig={decisionTemplateGenPolicies}
                setDecisionData={setDecisionData}
                onSave={onNextStep}
              />
            )}
            {currentStep === stepKeysPolicies.MINIMUM_INCOME_PERCENTAGE && (
              <NewDecisionForm
                ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
                labelBusinessRules={ENameRules.MINIMUM_INCOME_PERCENTAGE}
                customMessageEmptyDecisions={decisionsLabels(
                  getNamePolicieStep(
                    stepKeysPolicies.MINIMUM_INCOME_PERCENTAGE,
                  ) ?? "",
                )}
                initialDecisions={rulesData.MinimumSubsistenceReservePercentage}
                editionMode={"classic"}
                option={EUseCase.ADD}
                loading={false}
                onPreviousStep={onPreviousStep}
                disabledButton={disabledButton}
                decisionTemplateConfig={decisionTemplateGenPolicies}
                setDecisionData={setDecisionData}
                onSave={onNextStep}
              />
            )}

            {currentStep === stepKeysPolicies.BASIC_NOTIFICATION_FORMAT && (
              <NewDecisionForm
                ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
                labelBusinessRules={ENameRules.BASIC_NOTIFICATION_FORMAT}
                customMessageEmptyDecisions={decisionsLabels(
                  getNamePolicieStep(
                    stepKeysPolicies.BASIC_NOTIFICATION_FORMAT,
                  ) ?? "",
                )}
                initialDecisions={rulesData.BasicNotificationFormat}
                editionMode={"classic"}
                option={EUseCase.ADD}
                loading={false}
                onPreviousStep={onPreviousStep}
                disabledButton={disabledButton}
                decisionTemplateConfig={decisionTemplateGenPolicies}
                setDecisionData={setDecisionData}
                onSave={onNextStep}
              />
            )}

            {currentStep === stepKeysPolicies.BASIC_NOTIFICATION_RECIPIENT && (
              <NewDecisionForm
                ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
                labelBusinessRules={ENameRules.BASIC_NOTIFICATION_RECIPIENT}
                customMessageEmptyDecisions={decisionsLabels(
                  getNamePolicieStep(
                    stepKeysPolicies.BASIC_NOTIFICATION_RECIPIENT,
                  ) ?? "",
                )}
                initialDecisions={rulesData.BasicNotificationRecipient}
                editionMode={"classic"}
                option={EUseCase.ADD}
                loading={false}
                onPreviousStep={onPreviousStep}
                disabledButton={disabledButton}
                decisionTemplateConfig={decisionTemplateGenPolicies}
                setDecisionData={setDecisionData}
                onSave={onNextStep}
              />
            )}
            {currentStep ===
              stepKeysPolicies.MINIMUM_CREDIT_BUREAU_RISKSCORE && (
              <NewDecisionForm
                ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
                labelBusinessRules={ENameRules.MINIMUM_CREDIT_BUREAU_RISKSCORE}
                customMessageEmptyDecisions={decisionsLabels(
                  getNamePolicieStep(
                    stepKeysPolicies.MINIMUM_CREDIT_BUREAU_RISKSCORE,
                  ) ?? "",
                )}
                initialDecisions={rulesData.MinimumCreditBureauRiskScore}
                editionMode={"classic"}
                option={EUseCase.ADD}
                loading={false}
                onPreviousStep={onPreviousStep}
                disabledButton={disabledButton}
                decisionTemplateConfig={decisionTemplateGenPolicies}
                setDecisionData={setDecisionData}
                onSave={onNextStep}
              />
            )}
            {currentStep === stepKeysPolicies.NOTIFICATION_CHANNEL && (
              <NewDecisionForm
                ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
                labelBusinessRules={ENameRules.NOTIFICATION_CHANNEL}
                customMessageEmptyDecisions={decisionsLabels(
                  getNamePolicieStep(stepKeysPolicies.NOTIFICATION_CHANNEL) ??
                    "",
                )}
                initialDecisions={rulesData.NotificationChannel}
                editionMode={"classic"}
                option={EUseCase.ADD}
                loading={false}
                onPreviousStep={onPreviousStep}
                disabledButton={disabledButton}
                decisionTemplateConfig={decisionTemplateGenPolicies}
                setDecisionData={setDecisionData}
                onSave={onNextStep}
              />
            )}
            {currentStep === stepKeysPolicies.RISKSCORE_API_URL && (
              <NewDecisionForm
                ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
                labelBusinessRules={ENameRules.RISKSCORE_API_URL}
                customMessageEmptyDecisions={decisionsLabels(
                  getNamePolicieStep(stepKeysPolicies.RISKSCORE_API_URL) ?? "",
                )}
                initialDecisions={rulesData.RiskScoreApiUrl}
                editionMode={"classic"}
                option={EUseCase.ADD}
                loading={false}
                onPreviousStep={onPreviousStep}
                disabledButton={disabledButton}
                decisionTemplateConfig={decisionTemplateGenPolicies}
                setDecisionData={setDecisionData}
                onSave={onNextStep}
              />
            )}
            {currentStep === stepKeysPolicies.VERIFICATION && (
              <VerificationForm
                updatedData={{
                  decisionsGeneral: {
                    isValid: formValid,
                    values: initialValues.decisionsGeneral.values,
                  },

                  contributionsPortfolio: {
                    isValid: formValid,
                    values: rulesData.ReciprocityFactorForCreditLimit,
                  },
                  incomePortfolio: {
                    isValid: formValid,
                    values: rulesData.RiskScoreFactorForCreditLimit,
                  },
                  scoreModels: {
                    isValid: formValid,
                    values: rulesData.CreditRiskScoringModel,
                  },
                  minimumIncomePercentage: {
                    isValid: formValid,
                    values: rulesData.MinimumSubsistenceReservePercentage,
                  },

                  basicNotificationFormat: {
                    isValid: formValid,
                    values: rulesData.BasicNotificationFormat,
                  },
                  basicNotificationRecipient: {
                    isValid: formValid,
                    values: rulesData.BasicNotificationRecipient,
                  },
                  minimumCreditBureauRiskScore: {
                    isValid: formValid,
                    values: rulesData.MinimumCreditBureauRiskScore,
                  },
                  notificationChannel: {
                    isValid: formValid,
                    values: rulesData.NotificationChannel,
                  },
                  riskScoreApiUrl: {
                    isValid: formValid,
                    values: rulesData.RiskScoreApiUrl,
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
      {showDecision && (
        <DecisionModal
          portalId={portalId}
          title={modalData.title}
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

export { AddGenCreditPoliciesUI };
