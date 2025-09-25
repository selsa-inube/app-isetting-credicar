import { Stack } from "@inubekit/inubekit";
import { useConfigurationLines } from "@hooks/creditLine/configurationLines/useConfigurationLines";
import { BusinessRulesNewHandler } from "@pages/creditLines/tabs/BusinessRulesNewHandler";
import { InfoConfigurationModal } from "@pages/creditLines/tabs/infoConfigurationModal";
import { DecisionModal } from "@design/modals/decisionModal";
import { tokens } from "@design/tokens";
import { options } from "@config/creditLines/configuration/mainOptions";
import { decisionTemplates } from "@config/creditLines/decisionTemplates/registry";
import { commonTextValues } from "@config/creditLines/decisionTemplates/commonTextValues";
import { portalId } from "@config/portalId";
import { IDecisionTemplateScreen } from "@ptypes/decisions/IDecisionTemplateScreen";
import { LineInformation } from "../lineInformation";

const DecisionTemplateScreen = (props: IDecisionTemplateScreen) => {
  const { templateKey } = props;
  const decisionTemplate = decisionTemplates[templateKey];

  const {
    showInfoModal,
    loading,
    modalData,
    showDecision,
    // formValues,
    lineNameDecision,
    lineTypeDecision,
    initialDecisions,
    language,
    isUpdated,
    handleToggleInfoModal,
    handleOpenModal,
  } = useConfigurationLines({ templateKey });

  return (
    <Stack
      direction="column"
      gap={tokens.spacing.s300}
      padding={`${tokens.spacing.s350} ${tokens.spacing.s700}`}
      width="-webkit-fill-available"
    >
      <LineInformation
        lineName={lineNameDecision}
        lineType={lineTypeDecision}
        updateData={isUpdated}
        loading={loading}
        withDecisions={true}
        onToggleInfoModal={handleToggleInfoModal}
        onOpenModal={handleOpenModal}
      />

      <BusinessRulesNewHandler
        controls
        decisionTemplate={decisionTemplate}
        initialDecisions={initialDecisions}
        language={language as "es" | "en"}
        loading={false}
        textValues={commonTextValues}
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
          title={options.lineNames.links.namesAndDescriptions.label}
          description={options.lineNames.links.namesAndDescriptions.description}
          onClick={handleToggleInfoModal}
          onCloseModal={handleToggleInfoModal}
        />
      )}
    </Stack>
  );
};

export { DecisionTemplateScreen };
