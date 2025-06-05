import { inube, Stack, Tabs } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { DecisionsForm } from "@design/forms/decisions";
import { revertModalDisplayData } from "@utils/revertModalDisplayData";
import { deleteModal } from "@config/decisions/messages";
import { RequestProcess } from "@design/feedback/RequestProcess";
import { ComponentAppearance } from "@enum/appearances";
import { RequestStatusModal } from "@design/modals/requestStatusModal";
import { BoxContainer } from "@design/layout/boxContainer";
import { nameRules } from "@config/generalCreditPolicies/assisted/nameRules";
import { contributionsPortfLabels } from "@config/generalCreditPolicies/assisted/contributionsPortfLabels";
import { decisionContributionsPortfConfig } from "@config/decisions/decisionTempContributionsPortfolio";
import { IEditGeneralPoliciesUI } from "@ptypes/generalCredPolicies/IEditGeneralPoliciesUI";
import { incomePortfLabels } from "@config/generalCreditPolicies/assisted/incomePortfLabels";
import { decisionIncomePortfolioConfig } from "@config/decisions/decisionTempIncomePortfolio";
import { decisionScoreModelsConfig } from "@config/decisions/decisionTempScoreModels";
import { scoreModelsLabels } from "@config/generalCreditPolicies/assisted/scoreModelsLabels";
import { DecisionModal } from "@design/modals/decisionModal";
import { goBackModal } from "@config/goBackModal";
import { textValuesBusinessRules } from "@config/generalCreditPolicies/assisted/businessRules";
import { requestProcessMessage } from "@config/generalCreditPolicies/generic/requestProcessMessage";
import { requestStatusMessage } from "@config/generalCreditPolicies/generic/requestStatusMessage";
import { DecisionsGeneralForm } from "../../forms/decisionsGeneral";
import { DateGeneralPolicies } from "../../dateGeneralPolicies";

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
    tabletScreen,
    contributionsPortfolio,
    formValues,
    incomePortfolio,
    scoreModels,
    filteredTabsConfig,
    initialDecisionsData,
    showDecisionsGeneral,
    showIncomePort,
    showContributions,
    showScoreModels,
    showGoBackModal,
    showDateModal,
    date,
    normalizedContributions,
    normalizedIncome,
    normalizedScoreModels,
    theme,
    heightContPageContribut,
    heightContPageIncome,
    heightContPageScoreModels,
    setShowFactor,
    setShowReciprocity,
    setDateDecisions,
    onFinishForm,
    onToggleDateModal,
    onGoBack,
    onCloseGoBackModal,
    setIncomePortfolio,
    setScoreModels,
    setContributionsPortfolio,
    onTabChange,
    onReset,
    setIsCurrentFormValid,
    onCloseRequestStatus,
    onClosePendingReqModal,
  } = props;

  return (
    <BoxContainer
      direction="column"
      width="auto"
      height="auto"
      backgroundColor={theme.palette.neutral.N0 ?? inube.palette.neutral.N0}
      boxSizing="border-box"
      borderColor={theme.palette.neutral.N40 ?? inube.palette.neutral.N40}
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
          scroll={tabletScreen}
        />
        <Stack direction="column">
          {showDecisionsGeneral && (
            <DecisionsGeneralForm
              ref={decisionsGeneralReference}
              initialValues={formValues}
              handleNextStep={onToggleDateModal}
              onReset={onReset}
              loading={loading}
              onFormValid={setIsCurrentFormValid}
              editDataOption
              initialValuesEdit={initialDecisionsData}
              setShowReciprocity={setShowReciprocity}
              setShowFactor={setShowFactor}
            />
          )}
          {showContributions && (
            <DecisionsForm
              deleteModal={deleteModal}
              textValuesBusinessRules={textValuesBusinessRules}
              decisionTemplateConfig={decisionContributionsPortfConfig}
              onButtonClick={onToggleDateModal}
              onPreviousStep={onReset}
              initialValues={contributionsPortfolio}
              setDecisions={setContributionsPortfolio}
              revertModalDisplayData={revertModalDisplayData}
              labelBusinessRules={nameRules.contributionsPortfolio}
              nameRule=""
              titleContentAddCard={contributionsPortfLabels.titleContentAddCard}
              messageEmptyDecisions={
                contributionsPortfLabels.messageEmptyDecisions as unknown as string
              }
              disabledButton={contributionsPortfolio.length === 0}
              editDataOption
              normalizeEvaluateRuleData={normalizedContributions}
              heightContentPage={heightContPageContribut}
              bottomAddButton="80px"
            />
          )}
          {showIncomePort && (
            <DecisionsForm
              deleteModal={deleteModal}
              textValuesBusinessRules={textValuesBusinessRules}
              decisionTemplateConfig={decisionIncomePortfolioConfig}
              onButtonClick={onToggleDateModal}
              onPreviousStep={onReset}
              initialValues={incomePortfolio}
              setDecisions={setIncomePortfolio}
              revertModalDisplayData={revertModalDisplayData}
              labelBusinessRules={nameRules.incomePortfolio}
              nameRule=""
              titleContentAddCard={incomePortfLabels.titleContentAddCard}
              messageEmptyDecisions={
                incomePortfLabels.messageEmptyDecisions as unknown as string
              }
              disabledButton={incomePortfolio.length === 0}
              editDataOption
              normalizeEvaluateRuleData={normalizedIncome}
              heightContentPage={heightContPageIncome}
              bottomAddButton="80px"
            />
          )}
          {showScoreModels && (
            <DecisionsForm
              deleteModal={deleteModal}
              textValuesBusinessRules={textValuesBusinessRules}
              decisionTemplateConfig={decisionScoreModelsConfig}
              onButtonClick={onToggleDateModal}
              onPreviousStep={onReset}
              initialValues={scoreModels}
              setDecisions={setScoreModels}
              revertModalDisplayData={revertModalDisplayData}
              labelBusinessRules={nameRules.scoreModels}
              nameRule=""
              titleContentAddCard={scoreModelsLabels.titleContentAddCard}
              messageEmptyDecisions={
                scoreModelsLabels.messageEmptyDecisions as unknown as string
              }
              disabledButton={scoreModels.length === 0}
              editDataOption
              normalizeEvaluateRuleData={normalizedScoreModels}
              heightContentPage={heightContPageScoreModels}
              bottomAddButton="80px"
            />
          )}
        </Stack>
      </Stack>
      {showGoBackModal && (
        <DecisionModal
          portalId="portal"
          title={goBackModal.title}
          description={goBackModal.description}
          actionText={goBackModal.actionText}
          onCloseModal={onCloseGoBackModal}
          onClick={onGoBack}
        />
      )}

      {showDateModal && (
        <DateGeneralPolicies
          onCloseModal={onToggleDateModal}
          onFinishForm={onFinishForm}
          loading={loading}
          initialValues={date}
          setDateVerification={setDateDecisions}
        />
      )}

      {showRequestProcessModal && (
        <RequestProcess
          portalId="portal"
          saveData={saveGeneralPolicies}
          descriptionRequestProcess={requestProcessMessage}
          descriptionRequestStatus={requestStatusMessage}
          requestProcessSteps={requestSteps}
          appearance={ComponentAppearance.SUCCESS}
          onCloseRequestStatus={onCloseRequestStatus}
        />
      )}
      {isRequestStatusModal && (
        <RequestStatusModal
          portalId="portal"
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
          appearance={ComponentAppearance.PRIMARY}
        />
      )}
    </BoxContainer>
  );
};

export { EditGeneralPoliciesUI };
