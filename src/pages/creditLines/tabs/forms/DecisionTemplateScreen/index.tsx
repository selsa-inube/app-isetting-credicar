import { useContext } from "react";
import { Stack } from "@inubekit/inubekit";
import { IRuleDecision } from "@isettingkit/input";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
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
    title,
    description,
    optionCrumb,
    optionDetails,
    useCaseConfiguration,
    handleToggleUnconfiguredRulesModal,
    handleUnconfiguredRules,
    handleClosePendingModal,
    handleCloseRequestStatus,
    handleCloseProcess,
    setDecisionData,
    handleToggleInfoModal,
    handleOpenModal,
  } = useConfigurationLines({ templateKey });

  const { appData } = useContext(AuthAndPortalData);

  const formId = `credit-lines/${templateKey}`;

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
        height="100%"
        padding={`${tokens.spacing.s350} ${tokens.spacing.s700}`}
        width="-webkit-fill-available"
      >
        <LineInformation
          lineName={lineNameDecision}
          lineType={lineTypeDecision}
          loading={loading}
          onOpenModal={handleOpenModal}
          onToggleInfoModal={handleToggleInfoModal}
          updateData={loadingModify}
          withDecisions
          title={title}
          description={description}
          optionCrumb={optionCrumb}
          withIcon={!optionDetails}
          withBackModal={!optionDetails}
        />

        <BusinessRulesNewHandler
          key={formId}
          controls
          customMessageEmptyDecisions={undefined}
          customTitleContentAddCard={undefined}
          decisionTemplate={
            (decisionTemplateConfig(
              ruleData,
              appData.language,
            ) as unknown as IRuleDecision) ?? ({} as IRuleDecision)
          }
          initialDecisions={initialDecisions}
          language={language as "es" | "en"}
          loading={loading}
          setDecisionData={setDecisionData}
          textValues={commonTextValues}
          formId={formId as unknown as never}
          option={useCaseConfiguration}
        />

        {showDecision && (
          <DecisionModal
            appearance={modalData.appearance}
            appearanceButton={modalData.appearanceButton}
            actionText={modalData.actionText}
            description={modalData.description}
            icon={modalData.icon}
            onClick={modalData.onClick}
            onCloseModal={modalData.onCloseModal}
            portalId={portalId}
            title={modalData.title}
            withCancelButton={modalData.withCancelButton}
            withIcon={modalData.withIcon}
          />
        )}

        {showInfoModal && (
          <InfoConfigurationModal
            description={message}
            onClick={handleToggleInfoModal}
            onCloseModal={handleToggleInfoModal}
            title={lineTypeDecision}
          />
        )}
        {showUnconfiguredModal && (
          <SubmitRequestModal
            title={submitRequestLabels.title}
            unconfiguredRules={unconfiguredRules}
            description={submitRequestLabels.description}
            onClick={handleUnconfiguredRules}
            onCloseModal={handleToggleUnconfiguredRulesModal}
            loading={loadingModify}
            language={language}
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
        <ButtonsConfiguration
          navigation={nav}
          withSendButton={!optionDetails}
        />
      </StyledFloatButtonsContainer>
    </>
  );
};

export { DecisionTemplateScreen };
