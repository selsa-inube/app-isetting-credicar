import { MdClear, MdOutlineInfo } from "react-icons/md";
import { createPortal } from "react-dom";
import { Blanket, Button, Icon, Stack, Text } from "@inubekit/inubekit";

import { EComponentAppearance } from "@enum/appearances";
import { tokens } from "@design/tokens";
import { BoxContainer } from "@design/layout/boxContainer";
import { infoConfigurationLabels } from "@config/creditLines/creditLinesTab/generic/infoConfigurationLabels";
import { portalId } from "@config/portalId";
import { ISubmitRequestModal } from "@ptypes/creditLines/ISubmitRequestModal";
import { InformationBox } from "../creditLinesTab/InformationBox";

const SubmitRequestModal = (props: ISubmitRequestModal) => {
  const {
    title,
    unconfiguredRules,
    description,
    loading,
    onClick,
    onCloseModal,
  } = props;

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
        minHeight="332px"
        maxHeight="600px"
        direction="column"
        backgroundColor={EComponentAppearance.LIGHT}
        borderRadius={tokens.spacing.s100}
        borderColor={EComponentAppearance.DARK}
        padding={tokens.spacing.s300}
        boxSizing="border-box"
      >
        <Stack direction="column" gap={tokens.spacing.s200}>
          <Stack justifyContent="space-between">
            <Text type="title" size="medium" weight="bold">
              {title}
            </Text>

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

          <BoxContainer
            width="100%"
            height="360px"
            direction="column"
            backgroundColor={EComponentAppearance.LIGHT}
            boxSizing="border-box"
            gap={tokens.spacing.s100}
            overflowY="auto"
          >
            {unconfiguredRules.map((rule, index) => (
              <InformationBox
                key={index}
                icon={<MdOutlineInfo />}
                appearanceIcon={EComponentAppearance.DANGER}
                description={rule}
                boxPadding={tokens.spacing.s100}
                boxColor={EComponentAppearance.DANGER}
                sizeIcon="16px"
                sizeDescription="medium"
                ellipsisText
                heigthBox="auto"
              />
            ))}
          </BoxContainer>

          <Stack justifyContent="flex-end" gap={tokens.spacing.s100}>
            <Button
              onClick={onCloseModal}
              variant="filled"
              spacing="compact"
              appearance={EComponentAppearance.GRAY}
            >
              {infoConfigurationLabels.close}
            </Button>
            <Button
              onClick={onClick}
              variant="filled"
              spacing="compact"
              loading={loading}
              appearance={EComponentAppearance.PRIMARY}
            >
              {infoConfigurationLabels.send}
            </Button>
          </Stack>
        </Stack>
      </BoxContainer>
    </Blanket>,
    node,
  );
};

export { SubmitRequestModal };
