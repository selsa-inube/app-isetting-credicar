import { Fieldset, Icon, Stack, Text } from "@inubekit/inubekit";
import { EComponentAppearance } from "@enum/appearances";
import { tokens } from "@design/tokens";
import { newBusinessRulesLabels } from "@config/creditLines/configuration/newBusinessRulesLabels";
import { IAlertMessage } from "@ptypes/creditLines/IAlertMessage";

const AlertMessage = (props: IAlertMessage) => {
  const { mesaggeEmpty, icon, message, iconAppearance } = props;

  return (
    <Fieldset legend={newBusinessRulesLabels.decisionsTitle}>
      <Stack
        alignItems="center"
        direction="column"
        gap={tokens.spacing.s200}
        justifyContent="center"
        width="100%"
      >
        <Icon appearance={iconAppearance} icon={icon} size="40px" />
        <Text
          appearance={EComponentAppearance.DARK}
          size="medium"
          type="title"
          weight="bold"
        >
          {mesaggeEmpty}
        </Text>
        <Text as="span" appearance={EComponentAppearance.GRAY} size="medium">
          {message}
        </Text>
      </Stack>
    </Fieldset>
  );
};

export { AlertMessage };
