import { IRuleDecision } from "@isettingkit/input";
import { Stack } from "@inubekit/inubekit";
import { useConfigurationLines } from "@hooks/creditLine/configurationLines/useConfigurationLines";
import { SubmitRequestModal } from "@pages/creditLines/tabs/submitRequestModal";
import { BusinessRulesNewHandler } from "@pages/creditLines/tabs/BusinessRulesNewHandler";
import { InfoConfigurationModal } from "@pages/creditLines/tabs/infoConfigurationModal";
import { RequestModal } from "@pages/creditLines/tabs/requestModal";
import { StyledFloatButtonsContainer } from "@pages/creditLines/tabs/buttonsConfiguration/styles";
import { ButtonsConfiguration } from "@pages/creditLines/tabs/buttonsConfiguration";
import { DecisionModal } from "@design/modals/decisionModal";
import { tokens } from "@design/tokens";
import { commonTextValues } from "@config/creditLines/decisionTemplates/commonTextValues";
import { portalId } from "@config/portalId";
import { submitRequestLabels } from "@config/creditLines/submitRequestLabels";
import { decisionTemplateConfig } from "@config/decisions/decisionTemplateGeneric";
import { infoRulesMessage } from "@config/creditLines/configuration/infoRulesMessage";
import { IDecisionTemplateScreen } from "@ptypes/decisions/IDecisionTemplateScreen";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { LineInformation } from "../lineInformation";

const DecisionTemplateScreen = (props: IDecisionTemplateScreen) => {
  const { templateKey } = props;

  const {
    showInfoModal,
    loading,
    modalData,
    showDecision,
    ruleData,
    lineNameDecision,
    lineTypeDecision,
    initialDecisions,
    language,
    nav,
    loadingModify,
    saveCreditLines,
    requestSteps,
    showRequestProcessModal,
    showRequestStatusModal,
    showUnconfiguredModal,
    unconfiguredRules,
    handleToggleUnconfiguredRulesModal,
    handleUnconfiguredRules,
    handleClosePendingModal,
    handleCloseRequestStatus,
    handleCloseProcess,
    setDecisionData,
    handleToggleInfoModal,
    handleOpenModal,
  } = useConfigurationLines({ templateKey });

  const ruleLabel = `${ruleData.ruleName}`;
  const information = infoRulesMessage(lineTypeDecision);

  const message = String(
    information[ruleLabel as keyof typeof information] || information.Default,
  );

  return (
    <>
      <Stack
        direction="column"
        gap={tokens.spacing.s300}
        padding={`${tokens.spacing.s350} ${tokens.spacing.s700}`}
        width="-webkit-fill-available"
        height="100%"
      >
        <LineInformation
          lineName={lineNameDecision}
          lineType={lineTypeDecision}
          updateData={loadingModify}
          loading={loading}
          withDecisions={true}
          onToggleInfoModal={handleToggleInfoModal}
          onOpenModal={handleOpenModal}
        />

        <BusinessRulesNewHandler
          controls
          decisionTemplate={
            (decisionTemplateConfig(ruleData) as unknown as IRuleDecision) ??
            ({} as IRuleDecision)
          }
          initialDecisions={initialDecisions}
          language={language as "es" | "en"}
          loading={false}
          textValues={commonTextValues}
          setDecisionData={setDecisionData}
        />
        {showDecision && (
          <DecisionModal
            portalId={portalId}
            title={modalData.title}
            actionText={modalData.actionText}
            description={modalData.description}
            onCloseModal={modalData.onCloseModal}
            onClick={modalData.onClick}
            withCancelButton={modalData.withCancelButton}
            withIcon={modalData.withIcon}
            icon={modalData.icon}
            appearance={modalData.appearance}
            appearanceButton={modalData.appearanceButton}
          />
        )}
        {showInfoModal && (
          <InfoConfigurationModal
            title={lineTypeDecision}
            description={message}
            onClick={handleToggleInfoModal}
            onCloseModal={handleToggleInfoModal}
          />
        )}
        {showUnconfiguredModal && (
          <SubmitRequestModal
            title={submitRequestLabels.title}
            unconfiguredRules={unconfiguredRules}
            description={submitRequestLabels.description}
            onClick={handleUnconfiguredRules}
            onCloseModal={handleToggleUnconfiguredRulesModal}
            loading={loading}
          />
        )}

        <RequestModal
          showRequestProcessModal={showRequestProcessModal}
          showRequestStatusModal={showRequestStatusModal}
          saveData={saveCreditLines as ISaveDataResponse}
          requestSteps={requestSteps}
          onCloseRequestStatus={handleCloseRequestStatus}
          onCloseProcess={handleCloseProcess}
          onClosePendingModal={handleClosePendingModal}
        />
      </Stack>
      <StyledFloatButtonsContainer>
        <ButtonsConfiguration navigation={nav} />
      </StyledFloatButtonsContainer>
    </>
  );
};

export { DecisionTemplateScreen };
