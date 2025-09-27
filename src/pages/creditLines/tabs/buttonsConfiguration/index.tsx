import { MdOutlineSend } from "react-icons/md";
import { BackAndNextButton, SendButton } from "@isettingkit/business-rules";
import { Stack } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { buttonsConfigurationlabels } from "@config/creditLines/configuration/ButtonsConfigurationlabels";
import { IButtonsConfiguration } from "@ptypes/context/IButtonsConfiguration";

const ButtonsConfiguration = (props: IButtonsConfiguration) => {
  const { navigation } = props;

  return (
    <Stack
      gap={tokens.spacing.s200}
      justifyContent="flex-end"
      padding="0 3.3rem 0 0"
    >
      <BackAndNextButton
        cursorHover
        disabledBack={navigation.disabledBack}
        disabledNext={navigation.disabledNext}
        handleBack={navigation.handleBack}
        handleNext={navigation.handleNext}
        loading={navigation.loadingBackAndNext}
        textValues={buttonsConfigurationlabels}
      />
      <SendButton
        cursorHover
        disabled={navigation.disabledSend}
        iconBefore={<MdOutlineSend />}
        loading={navigation.loadingSend}
        onClick={navigation.handleClickSend}
      >
        {buttonsConfigurationlabels.send}
      </SendButton>
    </Stack>
  );
};

export { ButtonsConfiguration };
