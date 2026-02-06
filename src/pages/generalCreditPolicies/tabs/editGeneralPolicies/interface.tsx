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
// import { revertModalDisplayData } from "@utils/revertModalDisplayData";
// import { contributionsPortfLabels } from "@config/generalCreditPolicies/assisted/contributionsPortfLabels";
// import { minimumIncomeLabels } from "@config/generalCreditPolicies/assisted/minimumIncomeLabels";
// import { scoreModelsLabels } from "@config/generalCreditPolicies/assisted/scoreModelsLabels";
// import { decisionContributionsPortfConfig } from "@config/decisions/decisionTempContributionsPortfolio";
// import { incomePortfLabels } from "@config/generalCreditPolicies/assisted/incomePortfLabels";
// import { decisionIncomePortfolioConfig } from "@config/decisions/decisionTempIncomePortfolio";
// import { decisionScoreModelsConfig } from "@config/decisions/decisionTempScoreModels";
// import { textValuesBusinessRules } from "@config/generalCreditPolicies/assisted/businessRules";
// import { deleteModal } from "@config/decisions/messages";

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
    contributionsPortfolio,
    formValues,
    incomePortfolio,
    scoreModels,
    minimumIncomePercentage,
    filteredTabsConfig,
    initialDecisionsData,
    showDecisionsGeneral,
    showIncomePort,
    showScoreModels,
    showMinimumIncome,
    modalData,
    showDecision,
    setShowFactor,
    setShowReciprocity,
    onToggleDateModal,
    onTabChange,
    onReset,
    setIsCurrentFormValid,
    onCloseRequestStatus,
    onClosePendingReqModal,
    onCloseProcess,
    // showContributions,
    // normalizedContributions,
    // normalizedIncome,
    // normalizedScoreModels,
    // normalizedMinimumIncome,
    // heightContPageContribut,
    // heightContPageIncome,
    // heightContPageScoreModels,
    // heightContPageMinimum,
    // setIncomePortfolio,
    // setScoreModels,
    // setMinimumIncomePercentage,
    // setContributionsPortfolio,
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
          {showIncomePort && (
            <NewDecisionForm
              ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
              labelBusinessRules={ENameRules.CONTRIBUTIONS_PORTFOLIO}
              nameRule="Número de veces los ingresos"
              customMessageEmptyDecisions={""}
              initialDecisions={contributionsPortfolio}
              editionMode={"classic"}
              option={EUseCase.EDIT}
              loading={false}
              onPreviousStep={onReset}
              disabledButton={contributionsPortfolio.length === 0}
              onToggleDateModal={onToggleDateModal}
              decisionTemplateConfig={decisionTemplateGenPolicies}
            />
          )}

          {showIncomePort && (
            <NewDecisionForm
              ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
              labelBusinessRules={ENameRules.INCOME_PORTFOLIO}
              nameRule="Número de veces los ingresos"
              customMessageEmptyDecisions={""}
              initialDecisions={incomePortfolio}
              editionMode={"classic"}
              option={EUseCase.EDIT}
              loading={false}
              onPreviousStep={onReset}
              disabledButton={incomePortfolio.length === 0}
              onToggleDateModal={onToggleDateModal}
              decisionTemplateConfig={decisionTemplateGenPolicies}
            />
          )}
          {showScoreModels && (
            <NewDecisionForm
              ruleCatalog={ENameRules.RULE_CATALOG_IRISK}
              labelBusinessRules={ENameRules.SCORE_MODELS}
              nameRule="Modelo de score"
              customMessageEmptyDecisions={""}
              initialDecisions={scoreModels}
              editionMode={"classic"}
              option={EUseCase.EDIT}
              loading={false}
              onPreviousStep={onReset}
              disabledButton={scoreModels.length === 0}
              onToggleDateModal={onToggleDateModal}
              decisionTemplateConfig={decisionTemplateGenPolicies}
            />
          )}
          {showMinimumIncome && (
            <NewDecisionForm
              ruleCatalog={ENameRules.RULE_CATALOG_CREDIBOARD}
              labelBusinessRules={ENameRules.MINIMUM_INCOME_PERCENTAGE}
              customMessageEmptyDecisions={""}
              initialDecisions={minimumIncomePercentage}
              editionMode={"classic"}
              option={EUseCase.EDIT}
              loading={false}
              onPreviousStep={onReset}
              disabledButton={minimumIncomePercentage.length === 0}
              onToggleDateModal={onToggleDateModal}
              decisionTemplateConfig={decisionTemplateGenPolicies}
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
