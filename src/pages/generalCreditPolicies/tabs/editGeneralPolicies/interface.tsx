import { Stack, Tabs } from "@inubekit/inubekit";

import { DecisionsGeneralForm } from "@pages/generalCreditPolicies/forms/decisionsGeneral";
import { tokens } from "@design/tokens";
import { RequestProcess } from "@design/feedback/RequestProcess";
import { DecisionModal } from "@design/modals/decisionModal";
import { BoxContainer } from "@design/layout/boxContainer";
import { RequestStatusModal } from "@design/modals/requestStatusModal";
import { NewDecisionForm } from "@design/forms/NewDecisionForm";
import { EUseCase } from "@enum/useCase";
import { EComponentAppearance } from "@enum/appearances";
import { ENameRules } from "@enum/nameRules";
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
              nameRule="Número de veces los ingresos"
              customMessageEmptyDecisions={""}
              initialDecisions={rulesData.ReciprocityFactorForCreditLimit}
              editionMode={"classic"}
              option={EUseCase.EDIT}
              loading={false}
              onPreviousStep={onReset}
              disabledButton={disabledButton}
              onToggleDateModal={onToggleDateModal}
              decisionTemplateConfig={decisionTemplateGenPolicies}
              setDecisionData={setDecisionData}
              onSave={handleToggleDateModal}
            />
          )}
          {showIncomePort && (
            <NewDecisionForm
              ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
              labelBusinessRules={ENameRules.INCOME_PORTFOLIO}
              nameRule="Número de veces los ingresos"
              customMessageEmptyDecisions={""}
              initialDecisions={rulesData.RiskScoreFactorForCreditLimit}
              editionMode={"classic"}
              option={EUseCase.EDIT}
              loading={false}
              onPreviousStep={onReset}
              disabledButton={disabledButton}
              onToggleDateModal={onToggleDateModal}
              decisionTemplateConfig={decisionTemplateGenPolicies}
              setDecisionData={setDecisionData}
              onSave={handleToggleDateModal}
            />
          )}
          {showScoreModels && (
            <NewDecisionForm
              ruleCatalog={ENameRules.RULE_CATALOG_IRISK}
              labelBusinessRules={ENameRules.SCORE_MODELS}
              nameRule="Modelo de score"
              customMessageEmptyDecisions={""}
              initialDecisions={rulesData.CreditRiskScoringModel}
              editionMode={"classic"}
              option={EUseCase.EDIT}
              loading={false}
              onPreviousStep={onReset}
              disabledButton={disabledButton}
              onToggleDateModal={onToggleDateModal}
              decisionTemplateConfig={decisionTemplateGenPolicies}
              setDecisionData={setDecisionData}
              onSave={handleToggleDateModal}
            />
          )}
          {showMinimumIncome && (
            <NewDecisionForm
              ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
              labelBusinessRules={ENameRules.MINIMUM_INCOME_PERCENTAGE}
              customMessageEmptyDecisions={""}
              initialDecisions={rulesData.MinimumSubsistenceReservePercentage}
              editionMode={"classic"}
              option={EUseCase.EDIT}
              loading={false}
              onPreviousStep={onReset}
              disabledButton={disabledButton}
              onToggleDateModal={onToggleDateModal}
              decisionTemplateConfig={decisionTemplateGenPolicies}
              setDecisionData={setDecisionData}
              onSave={handleToggleDateModal}
            />
          )}
          {showBasicNotificFormat && (
            <NewDecisionForm
              ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
              labelBusinessRules={ENameRules.BASIC_NOTIFICATION_FORMAT}
              customMessageEmptyDecisions={""}
              initialDecisions={rulesData.BasicNotificationFormat}
              editionMode={"classic"}
              option={EUseCase.EDIT}
              loading={false}
              onPreviousStep={onReset}
              disabledButton={disabledButton}
              onToggleDateModal={onToggleDateModal}
              decisionTemplateConfig={decisionTemplateGenPolicies}
              setDecisionData={setDecisionData}
              onSave={handleToggleDateModal}
            />
          )}
          {showBasicNotifRecipient && (
            <NewDecisionForm
              ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
              labelBusinessRules={ENameRules.BASIC_NOTIFICATION_RECIPIENT}
              customMessageEmptyDecisions={""}
              initialDecisions={rulesData.BasicNotificationRecipient}
              editionMode={"classic"}
              option={EUseCase.EDIT}
              loading={false}
              onPreviousStep={onReset}
              disabledButton={disabledButton}
              onToggleDateModal={onToggleDateModal}
              decisionTemplateConfig={decisionTemplateGenPolicies}
              setDecisionData={setDecisionData}
              onSave={handleToggleDateModal}
            />
          )}

          {showMinCreditBureauRiskScore && (
            <NewDecisionForm
              ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
              labelBusinessRules={ENameRules.MINIMUM_CREDIT_BUREAU_RISKSCORE}
              customMessageEmptyDecisions={""}
              initialDecisions={rulesData.MinimumCreditBureauRiskScore}
              editionMode={"classic"}
              option={EUseCase.EDIT}
              loading={false}
              onPreviousStep={onReset}
              disabledButton={disabledButton}
              onToggleDateModal={onToggleDateModal}
              decisionTemplateConfig={decisionTemplateGenPolicies}
              setDecisionData={setDecisionData}
              onSave={handleToggleDateModal}
            />
          )}
          {showNotificationChannel && (
            <NewDecisionForm
              ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
              labelBusinessRules={ENameRules.NOTIFICATION_CHANNEL}
              customMessageEmptyDecisions={""}
              initialDecisions={rulesData.NotificationChannel}
              editionMode={"classic"}
              option={EUseCase.EDIT}
              loading={false}
              onPreviousStep={onReset}
              disabledButton={disabledButton}
              onToggleDateModal={onToggleDateModal}
              decisionTemplateConfig={decisionTemplateGenPolicies}
              setDecisionData={setDecisionData}
              onSave={handleToggleDateModal}
            />
          )}
          {showRiskScoreApiUrl && (
            <NewDecisionForm
              ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
              labelBusinessRules={ENameRules.RISKSCORE_API_URL}
              customMessageEmptyDecisions={""}
              initialDecisions={rulesData.RiskScoreApiUrl}
              editionMode={"classic"}
              option={EUseCase.EDIT}
              loading={false}
              onPreviousStep={onReset}
              disabledButton={disabledButton}
              onToggleDateModal={onToggleDateModal}
              decisionTemplateConfig={decisionTemplateGenPolicies}
              setDecisionData={setDecisionData}
              onSave={handleToggleDateModal}
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
