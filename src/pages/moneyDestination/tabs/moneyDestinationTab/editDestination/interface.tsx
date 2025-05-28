import { Breadcrumbs, Stack, Tabs } from "@inubekit/inubekit";

import { Title } from "@design/data/title";
import { tokens } from "@design/tokens";
import { GeneralInformationForm } from "@design/forms/generalInformationDestination";
import { DecisionsForm } from "@design/forms/decisions";
import { revertModalDisplayData } from "@utils/revertModalDisplayData";
import { crumbsEditDestination } from "@config/moneyDestination/editDestination/navigation";
import { textValuesBusinessRules } from "@config/moneyDestination/moneyDestinationTab/businessRules";
import { attentionModal, deleteModal } from "@config/decisions/messages";
import { decisionTemplateConfig } from "@config/decisions/decisionTemplateDestination";
import { RequestProcess } from "@design/feedback/RequestProcess";
import { ComponentAppearance } from "@enum/appearances";
import { requestProcessMessage } from "@config/moneyDestination/moneyDestinationTab/generics/requestProcessMessage";
import { requestStatusMessage } from "@config/moneyDestination/moneyDestinationTab/generics/requestStatusMessage";
import { RequestStatusModal } from "@design/modals/requestStatusModal";
import { IEditDestinationUI } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IEditDestinationUI";
import { editDestinationLabels } from "@config/moneyDestination/editDestination/editDestinationLabels";

const EditDestinationUI = (props: IEditDestinationUI) => {
  const {
    creditLineDecisions,
    normalizeEvaluateRuleData,
    editDestinationTabsConfig,
    generalInformationRef,
    initialGeneralInformationValues,
    initialGeneralInfData,
    isSelected,
    saveMoneyDestination,
    requestSteps,
    loading,
    showPendingReqModal,
    showRequestProcessModal,
    smallScreen,
    onTabChange,
    onButtonClick,
    onReset,
    setCreditLineDecisions,
    setIsCurrentFormValid,
    onCloseRequestStatus,
    onClosePendingReqModal,
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
          <Breadcrumbs crumbs={crumbsEditDestination} />
          <Title
            title={editDestinationLabels.title}
            description={editDestinationLabels.description}
            sizeTitle="large"
          />
        </Stack>
        <Stack gap={tokens.spacing.s300} direction="column">
          <Tabs
            tabs={Object.values(editDestinationTabsConfig)}
            selectedTab={isSelected}
            onChange={onTabChange}
          />
          <Stack direction="column">
            {isSelected === editDestinationTabsConfig.generalInformation.id && (
              <GeneralInformationForm
                ref={generalInformationRef}
                initialValues={initialGeneralInformationValues}
                onFormValid={setIsCurrentFormValid}
                onButtonClick={onButtonClick}
                editDataOption
                loading={loading}
                initialGeneralInfData={initialGeneralInfData}
              />
            )}
            {isSelected === editDestinationTabsConfig.creditLine.id && (
              <DecisionsForm
                attentionModal={attentionModal}
                deleteModal={deleteModal}
                textValuesBusinessRules={textValuesBusinessRules}
                decisionTemplateConfig={decisionTemplateConfig}
                onButtonClick={onButtonClick}
                onPreviousStep={onReset}
                initialValues={creditLineDecisions}
                setDecisions={setCreditLineDecisions}
                revertModalDisplayData={revertModalDisplayData}
                labelBusinessRules="LineOfCredit"
                nameRule={initialGeneralInformationValues.nameDestination}
                editDataOption
                showAttentionModal={false}
                setShowAttentionModal={() => console.log()}
                titleContentAddCard={editDestinationLabels.addLineCredit}
                messageEmptyDecisions={
                  editDestinationLabels.messageEmptyDecisions
                }
                normalizeEvaluateRuleData={normalizeEvaluateRuleData ?? []}
              />
            )}
          </Stack>
        </Stack>
      </Stack>
      {showRequestProcessModal && (
        <RequestProcess
          portalId="portal"
          saveData={saveMoneyDestination}
          descriptionRequestProcess={requestProcessMessage}
          descriptionRequestStatus={requestStatusMessage}
          requestProcessSteps={requestSteps}
          appearance={ComponentAppearance.SUCCESS}
          onCloseRequestStatus={onCloseRequestStatus}
        />
      )}
      {showPendingReqModal && saveMoneyDestination.requestNumber && (
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

export { EditDestinationUI };
