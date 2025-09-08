import { Breadcrumbs, Stack } from "@inubekit/inubekit";
import { InfoConfigurationModal } from "@pages/creditLines/tabs/creditLinesTab/infoConfigurationModal";
import { Title } from "@design/data/title";
import { tokens } from "@design/tokens";
import { DecisionModal } from "@design/modals/decisionModal";
import { crumbsConfiguration } from "@config/creditLines/configuration/navigation";
import { portalId } from "@config/portalId";
import { configurationLabels } from "@config/creditLines/configurationLabels";
import { IConfigurationLinesUI } from "@ptypes/creditLines/IConfigurationLinesUI";
import { LoadingForm } from "../../forms/loadingForm";
import { LineInformation } from "./lineInformation";

const ConfigurationLinesUI = (props: IConfigurationLinesUI) => {
  const {
    loading,
    data,
    updateData,
    withDecisions,
    withoutDecisions,
    showModal,
    modalData,
    showInfoModal,
    onToggleInfoModal,
    onOpenModal,
  } = props;
  return (
    <Stack
      direction="column"
      width="-webkit-fill-available"
      padding={`${tokens.spacing.s400} ${tokens.spacing.s800}`}
    >
      <Stack gap={tokens.spacing.s600} direction="column">
        <Stack gap={tokens.spacing.s300} direction="column">
          <Breadcrumbs crumbs={crumbsConfiguration} />
          <Title
            title={configurationLabels.title}
            description={configurationLabels.description}
            sizeTitle="large"
            onClick={onOpenModal}
          />
        </Stack>

        <Stack gap={tokens.spacing.s300} direction="column" width="100%">
          {loading ? (
            <LoadingForm
              withDecisions={withDecisions}
              withoutDecisions={withoutDecisions}
            />
          ) : (
            <>
              <LineInformation
                lineName={data.lineName}
                LineType={data.lineType}
                updateData={updateData}
                onToggleInfoModal={onToggleInfoModal}
              />
            </>
          )}
        </Stack>
      </Stack>
      {showModal && (
        <DecisionModal
          portalId={portalId}
          title={modalData.title}
          actionText={modalData.actionText}
          description={modalData.description}
          subtitle={modalData.subtitle}
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
          title={data.LineType}
          description={data.descriptionInfo}
          onClick={onToggleInfoModal}
          onCloseModal={onToggleInfoModal}
        />
      )}
    </Stack>
  );
};

export { ConfigurationLinesUI };
