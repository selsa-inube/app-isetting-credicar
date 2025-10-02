import { MdOutlineInfo } from "react-icons/md";
import { SkeletonLine, Stack } from "@inubekit/inubekit";
import { DragAndDropBoxes } from "@isettingkit/business-rules";
import { SubmitRequestModal } from "@pages/creditLines/tabs/submitRequestModal";
import { InformationBox } from "@pages/creditLines/tabs/creditLinesTab/InformationBox";
import { InfoConfigurationModal } from "@pages/creditLines/tabs/infoConfigurationModal";
import { StyledFloatButtonsContainer } from "@pages/creditLines/tabs/buttonsConfiguration/styles";
import { ButtonsConfiguration } from "@pages/creditLines/tabs/buttonsConfiguration";
import { EComponentAppearance } from "@enum/appearances";
import { tokens } from "@design/tokens";
import { clientsSupportLineLabels } from "@config/creditLines/configuration/clientsSupportLineLabels";
import { submitRequestLabels } from "@config/creditLines/submitRequestLabels";
import { options } from "@config/creditLines/configuration/mainOptions";
import { IClientsSupportLineFormUI } from "@ptypes/creditLines/forms/IClientsSupportLineFormUI";
import { LineInformation } from "../lineInformation";

const ClientsSupportLineFormUI = (props: IClientsSupportLineFormUI) => {
  const {
    optionsExcluded,
    optionsIncluded,
    showInfoModal,
    updateData,
    loading,
    navigation,
    lineNameDecision,
    message,
    showUnconfiguredModal,
    unconfiguredRules,
    loadingData,
    onUnconfiguredModal,
    onToggleUnconfiguredRules,
    onToggleInfoModal,
    onOpenModal,
    onMove,
  } = props;

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
          lineType={options.clientsSupported.links.clientsSupported.label}
          updateData={updateData}
          loading={loading}
          withoutDecisions={true}
          onToggleInfoModal={onToggleInfoModal}
          onOpenModal={onOpenModal}
        />

        <Stack direction="column" gap={tokens.spacing.s200}>
          <Stack>
            <InformationBox
              icon={<MdOutlineInfo />}
              appearanceIcon={EComponentAppearance.PRIMARY}
              description={clientsSupportLineLabels.infoText}
              boxPadding={tokens.spacing.s250}
              boxColor={EComponentAppearance.HELP}
              sizeIcon="20px"
              sizeDescription="large"
            />
          </Stack>
          {loadingData ? (
            <Stack
              width="100%"
              gap={tokens.spacing.s500}
              height="100%"
              alignItems="flex-start"
            >
              <SkeletonLine width="100%" height="250px" animated />
              <SkeletonLine width="100%" height="250px" animated />
            </Stack>
          ) : (
            <Stack
              width="100%"
              gap={tokens.spacing.s300}
              height="100%"
              alignItems="flex-start"
            >
              <DragAndDropBoxes
                left={optionsExcluded}
                right={optionsIncluded}
                onMove={onMove}
              />
            </Stack>
          )}
        </Stack>
        {showInfoModal && (
          <InfoConfigurationModal
            title={options.clientsSupported.links.clientsSupported.label}
            description={message}
            onClick={onToggleInfoModal}
            onCloseModal={onToggleInfoModal}
          />
        )}

        {showUnconfiguredModal && (
          <SubmitRequestModal
            title={submitRequestLabels.title}
            unconfiguredRules={unconfiguredRules}
            description={submitRequestLabels.description}
            onClick={onUnconfiguredModal}
            onCloseModal={onToggleUnconfiguredRules}
            loading={loading}
          />
        )}
      </Stack>
      <StyledFloatButtonsContainer>
        <ButtonsConfiguration navigation={navigation} />
      </StyledFloatButtonsContainer>
    </>
  );
};

export { ClientsSupportLineFormUI };
