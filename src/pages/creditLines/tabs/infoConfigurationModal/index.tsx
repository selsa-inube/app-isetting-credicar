import { MdClear, MdInfo } from "react-icons/md";
import { createPortal } from "react-dom";
import { Blanket, Button, Icon, Stack, Text } from "@inubekit/inubekit";

import { EComponentAppearance } from "@enum/appearances";
import { tokens } from "@design/tokens";
import { BoxContainer } from "@design/layout/boxContainer";
import { infoConfigurationLabels } from "@config/creditLines/creditLinesTab/generic/infoConfigurationLabels";
import { portalId } from "@config/portalId";
import { IInfoConfigurationModal } from "@ptypes/creditLines/IInfoConfigurationModal";

const InfoConfigurationModal = (props: IInfoConfigurationModal) => {
  const { title, description, onClick, onCloseModal } = props;

  const node = document.getElementById(portalId);

  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  return createPortal(
    <Blanket>
      <BoxContainer
        width="500px"
        height="auto"
        direction="column"
        backgroundColor={EComponentAppearance.LIGHT}
        borderRadius={tokens.spacing.s100}
        borderColor={EComponentAppearance.DARK}
        padding={tokens.spacing.s300}
        boxSizing="border-box"
      >
        <Stack direction="column" gap={tokens.spacing.s300}>
          <Stack justifyContent="space-between">
            <Stack gap={tokens.spacing.s100}>
              <Icon
                icon={<MdInfo />}
                appearance={EComponentAppearance.HELP}
                size="20px"
              />
              <Text type="title" size="medium" weight="bold">
                {title}
              </Text>
            </Stack>
            <Button
              spacing="compact"
              appearance={EComponentAppearance.DARK}
              variant="none"
              onClick={onCloseModal}
              iconAfter={
                <Icon
                  appearance={EComponentAppearance.DARK}
                  icon={<MdClear />}
                />
              }
            >
              {infoConfigurationLabels.close}
            </Button>
          </Stack>

          <Text size="medium" appearance={EComponentAppearance.GRAY}>
            {description}
          </Text>

          <Stack justifyContent="flex-end">
            <Button
              onClick={onClick}
              variant="filled"
              spacing="compact"
              appearance={EComponentAppearance.HELP}
            >
              {infoConfigurationLabels.accept}
            </Button>
          </Stack>
        </Stack>
      </BoxContainer>
    </Blanket>,
    node,
  );
};

export { InfoConfigurationModal };
