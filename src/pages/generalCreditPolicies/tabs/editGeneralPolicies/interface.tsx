import { Stack, Tabs } from "@inubekit/inubekit";

import { DecisionsGeneralForm } from "@pages/generalCreditPolicies/forms/decisionsGeneral";
import { tokens } from "@design/tokens";
import { RequestProcess } from "@design/feedback/RequestProcess";
import { DecisionModal } from "@design/modals/decisionModal";
import { BoxContainer } from "@design/layout/boxContainer";
import { RequestStatusModal } from "@design/modals/requestStatusModal";
import { NewDecisionForm } from "@design/forms/NewDecisionForm";
import { EUseCase } from "@enum/useCase";
import { EEditionMode } from "@enum/editionMode";
import { EComponentAppearance } from "@enum/appearances";
import { ENameRules } from "@enum/nameRules";
import { decisionLabels } from "@config/generalCreditPolicies/editGeneralPolicies/decisionLabels";
import { decisionsLabels } from "@config/generalCreditPolicies/assisted/decisionsLabels";
import { requestProcessMessage } from "@config/generalCreditPolicies/generic/requestProcessMessage";
import { decisionTemplateGenPolicies } from "@config/decisions/decisionTemplateGenPolicies";
import { requestStatusMessage } from "@config/generalCreditPolicies/generic/requestStatusMessage";
import { portalId } from "@config/portalId";
import { IEditGeneralPoliciesUI } from "@ptypes/generalCredPolicies/IEditGeneralPoliciesUI";

const EditGeneralPoliciesUI = (props: IEditGeneralPoliciesUI) => {
  const {
    isSelected,
    decisionsGeneralReference,
    saveGeneralPolicies,
    requestSteps,
    loading,
    isRequestStatusModal,
    showRequestProcessModal,
    smallScreen,
    formValues,
    filteredTabsConfig,
    initialDecisionsData,
    showDecisionsGeneral,
    showIncomePort,
    showScoreModels,
    showMinimumIncome,
    modalData,
    showDecision,
    rulesData,
    showBasicNotificFormat,
    showBasicNotifRecipient,
    showMinCreditBureauRiskScore,
    showNotificationChannel,
    showRiskScoreApiUrl,
    showContributions,
    disabledButton,
    setEditDecision,
    handleToggleDateModal,
    setShowFactor,
    setShowReciprocity,
    onToggleDateModal,
    onTabChange,
    onReset,
    setIsCurrentFormValid,
    onCloseRequestStatus,
    onClosePendingReqModal,
    onCloseProcess,
    setDecisionData,
  } = props;

  return (
    <BoxContainer
      direction="column"
      width="auto"
      height="auto"
      backgroundColor={EComponentAppearance.LIGHT}
      boxSizing="border-box"
      borderColor={EComponentAppearance.DARK}
      borderRadius={tokens.spacing.s100}
      padding={
        smallScreen
          ? `${tokens.spacing.s200}`
          : `${tokens.spacing.s300} ${tokens.spacing.s800}`
      }
    >
      <Stack gap={tokens.spacing.s300} direction="column" height="auto">
        <Tabs
          tabs={filteredTabsConfig}
          selectedTab={isSelected}
          onChange={onTabChange}
          scroll={filteredTabsConfig.length > 2}
        />
        <Stack direction="column">
          {showDecisionsGeneral && (
            <DecisionsGeneralForm
              ref={decisionsGeneralReference}
              initialValues={formValues}
              handleNextStep={onToggleDateModal}
              onReset={onReset}
              onFormValid={setIsCurrentFormValid}
              editDataOption
              initialValuesEdit={initialDecisionsData}
              setShowReciprocity={setShowReciprocity}
              setShowFactor={setShowFactor}
            />
          )}
          {showContributions && (
            <NewDecisionForm
              ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
              labelBusinessRules={ENameRules.CONTRIBUTIONS_PORTFOLIO}
              nameRule={decisionLabels.contributionsPortfolio}
              customMessageEmptyDecisions={decisionsLabels(
                decisionLabels.contributionsPortfolio,
              )}
              initialDecisions={rulesData.ReciprocityFactorForCreditLimit}
              editionMode={EEditionMode.VERSIONED}
              option={EUseCase.EDIT}
              loading={false}
              onPreviousStep={onReset}
              disabledButton={disabledButton}
              decisionTemplateConfig={decisionTemplateGenPolicies}
              setDecisionData={setDecisionData}
              onSave={handleToggleDateModal}
              setEditDecision={setEditDecision}
            />
          )}
          {showIncomePort && (
            <NewDecisionForm
              ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
              labelBusinessRules={ENameRules.INCOME_PORTFOLIO}
              nameRule={decisionLabels.incomePortfolio}
              customMessageEmptyDecisions={decisionsLabels(
                decisionLabels.incomePortfolio,
              )}
              initialDecisions={rulesData.RiskScoreFactorForCreditLimit}
              editionMode={EEditionMode.VERSIONED}
              option={EUseCase.EDIT}
              loading={false}
              onPreviousStep={onReset}
              disabledButton={disabledButton}
              decisionTemplateConfig={decisionTemplateGenPolicies}
              setDecisionData={setDecisionData}
              onSave={handleToggleDateModal}
              setEditDecision={setEditDecision}
            />
          )}
          {showScoreModels && (
            <NewDecisionForm
              ruleCatalog={ENameRules.RULE_CATALOG_IRISK}
              labelBusinessRules={ENameRules.SCORE_MODELS}
              nameRule={decisionLabels.scoreModels}
              customMessageEmptyDecisions={decisionsLabels(
                decisionLabels.scoreModels,
              )}
              initialDecisions={rulesData.CreditRiskScoringModel}
              editionMode={EEditionMode.VERSIONED}
              option={EUseCase.EDIT}
              loading={false}
              onPreviousStep={onReset}
              disabledButton={disabledButton}
              decisionTemplateConfig={decisionTemplateGenPolicies}
              setDecisionData={setDecisionData}
              onSave={handleToggleDateModal}
              setEditDecision={setEditDecision}
            />
          )}
          {showMinimumIncome && (
            <NewDecisionForm
              ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
              labelBusinessRules={ENameRules.MINIMUM_INCOME_PERCENTAGE}
              customMessageEmptyDecisions={decisionsLabels(
                decisionLabels.minimumIncomePercentage,
              )}
              initialDecisions={rulesData.MinimumSubsistenceReservePercentage}
              editionMode={EEditionMode.VERSIONED}
              option={EUseCase.EDIT}
              loading={false}
              onPreviousStep={onReset}
              disabledButton={disabledButton}
              decisionTemplateConfig={decisionTemplateGenPolicies}
              setDecisionData={setDecisionData}
              onSave={handleToggleDateModal}
              setEditDecision={setEditDecision}
            />
          )}
          {showBasicNotificFormat && (
            <NewDecisionForm
              ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
              labelBusinessRules={ENameRules.BASIC_NOTIFICATION_FORMAT}
              customMessageEmptyDecisions={decisionsLabels(
                decisionLabels.basicNotificationFormat,
              )}
              initialDecisions={rulesData.BasicNotificationFormat}
              editionMode={EEditionMode.VERSIONED}
              option={EUseCase.EDIT}
              loading={false}
              onPreviousStep={onReset}
              disabledButton={disabledButton}
              decisionTemplateConfig={decisionTemplateGenPolicies}
              setDecisionData={setDecisionData}
              onSave={handleToggleDateModal}
              setEditDecision={setEditDecision}
            />
          )}
          {showBasicNotifRecipient && (
            <NewDecisionForm
              ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
              labelBusinessRules={ENameRules.BASIC_NOTIFICATION_RECIPIENT}
              customMessageEmptyDecisions={decisionsLabels(
                decisionLabels.basicNotificationRecipient,
              )}
              initialDecisions={rulesData.BasicNotificationRecipient}
              editionMode={EEditionMode.VERSIONED}
              option={EUseCase.EDIT}
              loading={false}
              onPreviousStep={onReset}
              disabledButton={disabledButton}
              decisionTemplateConfig={decisionTemplateGenPolicies}
              setDecisionData={setDecisionData}
              onSave={handleToggleDateModal}
              setEditDecision={setEditDecision}
            />
          )}

          {showMinCreditBureauRiskScore && (
            <NewDecisionForm
              ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
              labelBusinessRules={ENameRules.MINIMUM_CREDIT_BUREAU_RISKSCORE}
              customMessageEmptyDecisions={decisionsLabels(
                decisionLabels.minimumCreditBureauRiskscore,
              )}
              initialDecisions={rulesData.MinimumCreditBureauRiskScore}
              editionMode={EEditionMode.VERSIONED}
              option={EUseCase.EDIT}
              loading={false}
              onPreviousStep={onReset}
              disabledButton={disabledButton}
              decisionTemplateConfig={decisionTemplateGenPolicies}
              setDecisionData={setDecisionData}
              onSave={handleToggleDateModal}
              setEditDecision={setEditDecision}
            />
          )}
          {showNotificationChannel && (
            <NewDecisionForm
              ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
              labelBusinessRules={ENameRules.NOTIFICATION_CHANNEL}
              customMessageEmptyDecisions={decisionsLabels(
                decisionLabels.notificationChannel,
              )}
              initialDecisions={rulesData.NotificationChannel}
              editionMode={EEditionMode.VERSIONED}
              option={EUseCase.EDIT}
              loading={false}
              onPreviousStep={onReset}
              disabledButton={disabledButton}
              decisionTemplateConfig={decisionTemplateGenPolicies}
              setDecisionData={setDecisionData}
              onSave={handleToggleDateModal}
              setEditDecision={setEditDecision}
            />
          )}
          {showRiskScoreApiUrl && (
            <NewDecisionForm
              ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
              labelBusinessRules={ENameRules.RISKSCORE_API_URL}
              customMessageEmptyDecisions={decisionsLabels(
                decisionLabels.riskscoreApiUrl,
              )}
              initialDecisions={rulesData.RiskScoreApiUrl}
              editionMode={EEditionMode.VERSIONED}
              option={EUseCase.EDIT}
              loading={false}
              onPreviousStep={onReset}
              disabledButton={disabledButton}
              decisionTemplateConfig={decisionTemplateGenPolicies}
              setDecisionData={setDecisionData}
              onSave={handleToggleDateModal}
              setEditDecision={setEditDecision}
            />
          )}
        </Stack>
      </Stack>
      {showDecision && (
        <DecisionModal
          portalId={portalId}
          title={modalData.title}
          actionText={modalData.actionText}
          description={modalData.description}
          subtitle={modalData.subtitle}
          onCloseModal={modalData.onCloseModal}
          onClick={modalData.onClick}
          withCancelButton={modalData.withCancelButton}
          loading={loading}
          withIcon={modalData.withIcon}
          icon={modalData.icon}
          appearance={modalData.appearance}
          appearanceButton={modalData.appearanceButton}
        />
      )}

      {showRequestProcessModal && (
        <RequestProcess
          portalId={portalId}
          saveData={saveGeneralPolicies}
          descriptionRequestProcess={requestProcessMessage}
          descriptionRequestStatus={requestStatusMessage}
          requestProcessSteps={requestSteps}
          appearance={EComponentAppearance.SUCCESS}
          onCloseRequestStatus={onCloseRequestStatus}
          onCloseProcess={onCloseProcess}
        />
      )}
      {isRequestStatusModal && (
        <RequestStatusModal
          portalId={portalId}
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
    </BoxContainer>
  );
};

export { EditGeneralPoliciesUI };
