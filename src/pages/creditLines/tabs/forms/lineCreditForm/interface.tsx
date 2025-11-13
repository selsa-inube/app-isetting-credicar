import { MdOutlineInfo } from "react-icons/md";
import { SkeletonLine, Stack } from "@inubekit/inubekit";
import { DragAndDropBoxes } from "@isettingkit/business-rules";
import { SubmitRequestModal } from "@pages/creditLines/tabs/submitRequestModal";
import { InformationBox } from "@pages/creditLines/tabs/creditLinesTab/InformationBox";
import { InfoConfigurationModal } from "@pages/creditLines/tabs/infoConfigurationModal";
import { StyledFloatButtonsContainer } from "@pages/creditLines/tabs/buttonsConfiguration/styles";
import { ButtonsConfiguration } from "@pages/creditLines/tabs/buttonsConfiguration";
import { ECreditLines } from "@enum/creditLines";
import { EComponentAppearance } from "@enum/appearances";
import { titleOptionConfigLine } from "@utils/titleOptionConfigLine";
import { tokens } from "@design/tokens";
import { creditLineLabels } from "@config/creditLines/configuration/creditLineLabels";
import { IClientsSupportLineFormUI } from "@ptypes/creditLines/forms/IClientsSupportLineFormUI";
import { LineInformation } from "../lineInformation";

const LineCreditFormFormUI = (props: IClientsSupportLineFormUI) => {
  const {
    optionsExcluded,
    optionsIncluded,
    showInfo,
    showInfoModal,
    updateData,
    loading,
    navigation,
    lineNameDecision,
    message,
    showSendModal,
    loadingData,
    language,
    title,
    description,
    optionCrumb,
    optionDetails,
    optionIcon,
    editOption,
    submitModalData,
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
          lineType={titleOptionConfigLine(ECreditLines.CREDIT_LINE_RULE) || ""}
          updateData={updateData}
          loading={loading}
          withoutDecisions={true}
          onToggleInfoModal={onToggleInfoModal}
          onOpenModal={onOpenModal}
          title={title}
          description={description}
          optionCrumb={optionCrumb}
          withIcon={!optionIcon}
          withBackModal={!optionDetails}
        />

        <Stack direction="column" gap={tokens.spacing.s200}>
          {showInfo && (
            <Stack>
              <InformationBox
                icon={<MdOutlineInfo />}
                appearanceIcon={EComponentAppearance.PRIMARY}
                description={creditLineLabels.infoText}
                boxPadding={tokens.spacing.s250}
                boxColor={EComponentAppearance.HELP}
                sizeIcon="20px"
                sizeDescription="large"
              />
            </Stack>
          )}
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
                locked={optionDetails}
              />
            </Stack>
          )}
        </Stack>
        {showInfoModal && (
          <InfoConfigurationModal
            title={titleOptionConfigLine(ECreditLines.CREDIT_LINE_RULE) || ""}
            description={message}
            onClick={onToggleInfoModal}
            onCloseModal={onToggleInfoModal}
          />
        )}

        {showSendModal && (
          <SubmitRequestModal
            title={submitModalData.title}
            unconfiguredRules={submitModalData.unconfiguredRules}
            description={submitModalData.description}
            onClick={submitModalData.onClick}
            onCloseModal={submitModalData.onCloseModal}
            loading={submitModalData.loading}
            language={language}
            appearanceItemIcon={submitModalData.appearanceItemIcon}
            itemIcon={submitModalData.itemIcon}
            editOption={editOption}
          />
        )}
      </Stack>
      <StyledFloatButtonsContainer>
        <ButtonsConfiguration
          navigation={navigation}
          withSendButton={!optionDetails}
        />
      </StyledFloatButtonsContainer>
    </>
  );
};

export { LineCreditFormFormUI };
