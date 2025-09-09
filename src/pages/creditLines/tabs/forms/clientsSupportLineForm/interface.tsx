import { MdArrowBack, MdArrowForward, MdOutlineInfo } from "react-icons/md";
import { Icon, Stack } from "@inubekit/inubekit";
import { InformationBox } from "@pages/creditLines/tabs/creditLinesTab/InformationBox";
import { EComponentAppearance } from "@enum/appearances";
import { tokens } from "@design/tokens";
import { clientsSupportLineLabels } from "@config/creditLines/configuration/clientsSupportLineLabels";
import { IClientsSupportLineFormUI } from "@ptypes/creditLines/forms/IClientsSupportLineFormUI";
import { ClientContentBox } from "./clientContentBox";
import { StyledContainerIcon } from "./styles";

const ClientsSupportLineFormUI = (props: IClientsSupportLineFormUI) => {
  const {
    optionsExcluded,
    optionsIncluded,
    selectedConditionId,
    setSelectedConditionId,
    onClickIncluded,
    onClickExcluded,
  } = props;

  return (
    <Stack direction="column" gap={tokens.spacing.s400}>
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
  );
};

export { ClientsSupportLineFormUI };
