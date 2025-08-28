import { Breadcrumbs, Stack, Tabs } from "@inubekit/inubekit";

import { GeneralInformationForm } from "@pages/moneyDestination/tabs/forms/generalInformationDestination";
import { Title } from "@design/data/title";
import { tokens } from "@design/tokens";
import { DecisionModal } from "@design/modals/decisionModal";
import { DecisionsForm } from "@design/forms/decisions";
import { RequestProcess } from "@design/feedback/RequestProcess";
import { RequestStatusModal } from "@design/modals/requestStatusModal";
import { EComponentAppearance } from "@enum/appearances";
import { revertModalDisplayData } from "@utils/revertModalDisplayData";
import { crumbsEditDestination } from "@config/moneyDestination/editDestination/navigation";
import { textValuesBusinessRules } from "@config/moneyDestination/moneyDestinationTab/businessRules";
import { attentionModal, deleteModal } from "@config/decisions/messages";
import { decisionTemplateConfig } from "@config/decisions/decisionTemplateDestination";
import { requestProcessMessage } from "@config/moneyDestination/moneyDestinationTab/generics/requestProcessMessage";
import { requestStatusMessage } from "@config/moneyDestination/moneyDestinationTab/generics/requestStatusMessage";
import { editDestinationLabels } from "@config/moneyDestination/editDestination/editDestinationLabels";
import { portalId } from "@config/portalId";
import { IEditDestinationUI } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IEditDestinationUI";

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
    showRequestStatus,
    showRequestProcessModal,
    smallScreen,
    showGeneralInformation,
    showDecisionsForm,
    modalData,
    showDecision,
    onToggleEditedModal,
    onOpenModal,
    onTabChange,
    onButtonClick,
    onReset,
    setCreditLineDecisions,
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
          <Breadcrumbs crumbs={crumbsEditDestination} />
          <Title
            title={editDestinationLabels.title}
            description={editDestinationLabels.description}
            sizeTitle="large"
            onClick={onOpenModal}
          />
        </Stack>
        <Stack gap={tokens.spacing.s300} direction="column">
          <Tabs
            tabs={editDestinationTabsConfig}
            selectedTab={isSelected}
            onChange={onTabChange}
          />
          <Stack direction="column">
            {showGeneralInformation && (
              <GeneralInformationForm
                ref={generalInformationRef}
                initialValues={initialGeneralInformationValues}
                onFormValid={setIsCurrentFormValid}
                onButtonClick={onToggleEditedModal}
                editDataOption
                onReset={onReset}
                initialGeneralInfData={initialGeneralInfData}
              />
            )}
            {showDecisionsForm && (
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
                setShowAttentionModal={() => void 0}
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
      {showDecision && (
        <DecisionModal
          portalId={portalId}
          title={modalData.title}
          description={modalData.description}
          actionText={modalData.actionText}
          withCancelButton={modalData.withCancelButton}
          onCloseModal={modalData.onCloseModal}
          onClick={modalData.onClick}
          loading={modalData.loading}
        />
      )}
      {showRequestProcessModal && (
        <RequestProcess
          portalId={portalId}
          saveData={saveMoneyDestination}
          descriptionRequestProcess={requestProcessMessage}
          descriptionRequestStatus={requestStatusMessage}
          requestProcessSteps={requestSteps}
          appearance={EComponentAppearance.SUCCESS}
          onCloseRequestStatus={onCloseRequestStatus}
          onCloseProcess={onCloseProcess}
        />
      )}
      {showRequestStatus && (
        <RequestStatusModal
          portalId={portalId}
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
          appearance={EComponentAppearance.PRIMARY}
        />
      )}
    </Stack>
  );
};

export { EditDestinationUI };
