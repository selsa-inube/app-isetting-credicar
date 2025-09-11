import { MdArrowBack, MdArrowForward, MdOutlineInfo } from "react-icons/md";
import { Icon, Stack } from "@inubekit/inubekit";
import { InformationBox } from "@pages/creditLines/tabs/creditLinesTab/InformationBox";
import { InfoConfigurationModal } from "@pages/creditLines/tabs/infoConfigurationModal";
import { EComponentAppearance } from "@enum/appearances";
import { tokens } from "@design/tokens";
import { clientsSupportLineLabels } from "@config/creditLines/configuration/clientsSupportLineLabels";
import { options } from "@config/creditLines/configuration/mainOptions";
import { IClientsSupportLineFormUI } from "@ptypes/creditLines/forms/IClientsSupportLineFormUI";
import { ClientContentBox } from "./clientContentBox";
import { StyledContainerIcon } from "./styles";
import { LineInformation } from "../lineInformation";

const ClientsSupportLineFormUI = (props: IClientsSupportLineFormUI) => {
  const {
    optionsExcluded,
    optionsIncluded,
    selectedConditionId,
    showInfoModal,
    updateData,
    loading,
    onToggleInfoModal,
    onOpenModal,
    setSelectedConditionId,
    onClickIncluded,
    onClickExcluded,
  } = props;

  return (
    <Stack
      direction="column"
      gap={tokens.spacing.s300}
      padding={`${tokens.spacing.s350} ${tokens.spacing.s700}`}
      width="-webkit-fill-available"
    >
      <LineInformation
        lineName={"linea "}
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
        <Stack
          width="100%"
          gap={tokens.spacing.s300}
          height="100%"
          alignItems="flex-start"
        >
          <Stack width="100%" height="auto">
            <ClientContentBox
              options={optionsExcluded}
              title={clientsSupportLineLabels.titleDoesNotApply}
              emptyMessage={clientsSupportLineLabels.withoutExcluding}
              selectedConditionId={selectedConditionId}
              setSelectedConditionId={setSelectedConditionId}
            />
          </Stack>
          <StyledContainerIcon>
            <Icon
              appearance={EComponentAppearance.GRAY}
              icon={<MdArrowBack />}
              cursorHover
              variant="outlined"
              onClick={onClickExcluded}
              size="30px"
            />
            <Icon
              appearance={EComponentAppearance.GRAY}
              icon={<MdArrowForward />}
              cursorHover
              variant="outlined"
              onClick={onClickIncluded}
              size="30px"
            />
          </StyledContainerIcon>
          <Stack width="100%" height="auto">
            <ClientContentBox
              options={optionsIncluded}
              title={clientsSupportLineLabels.titleCustomerProfiles}
              emptyMessage={clientsSupportLineLabels.withoutIncluding}
              selectedConditionId={selectedConditionId}
              setSelectedConditionId={setSelectedConditionId}
            />
          </Stack>
        </Stack>
      </Stack>
      {showInfoModal && (
        <InfoConfigurationModal
          title={options.clientsSupported.links.clientsSupported.label}
          description={
            options.clientsSupported.links.clientsSupported.description
          }
          onClick={onToggleInfoModal}
          onCloseModal={onToggleInfoModal}
        />
      )}
    </Stack>
  );
};

export { ClientsSupportLineFormUI };
