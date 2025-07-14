import { MdClear } from "react-icons/md";
import { createPortal } from "react-dom";
import {
  Blanket,
  Button,
  Divider,
  Grid,
  Icon,
  Stack,
  Text,
} from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import { BoxContainer } from "@design/layout/boxContainer";
import { IModalWrapper } from "@ptypes/design/IModalWrapper";

const ModalWrapper = (props: IModalWrapper) => {
  const {
    appearanceButton,
    children,
    height = "auto",
    iconBeforeButton,
    isMobile = false,
    labelActionButton,
    labelCloseButton,
    labelCloseModal,
    portalId,
    title,
    width = "auto",
    withCancelButton,
    loading = false,
    disabledActionButton = false,
    minHeight,
    maxHeight,
    padding = tokens.spacing.s300,
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
        width={width}
        height={height}
        direction="column"
        backgroundColor={EComponentAppearance.LIGHT}
        borderRadius={tokens.spacing.s100}
        borderColor={EComponentAppearance.DARK}
        padding={padding}
        gap={isMobile ? `${tokens.spacing.s150}` : `${tokens.spacing.s250}`}
        boxSizing="border-box"
        minHeight={minHeight}
        maxHeight={maxHeight}
      >
        <Stack direction="column" gap={tokens.spacing.s150}>
          <Grid templateColumns="1fr auto" templateRows="1fr">
            <Text
              type="headline"
              size="small"
              appearance={EComponentAppearance.DARK}
            >
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
              {labelCloseModal}
            </Button>
          </Grid>
          <Divider />
        </Stack>

        <Stack
          height="100%"
          width="100%"
          direction="column"
          gap={tokens.spacing.s200}
        >
          {children}
        </Stack>

        <Stack gap={tokens.spacing.s250} justifyContent="flex-end">
          {withCancelButton && (
            <Button
              spacing="wide"
              appearance={EComponentAppearance.LIGHT}
              variant="filled"
              onClick={onCloseModal}
            >
              {labelCloseButton}
            </Button>
          )}

          <Button
            spacing="wide"
            appearance={appearanceButton ?? EComponentAppearance.PRIMARY}
            variant="filled"
            onClick={onClick}
            loading={loading}
            iconBefore={iconBeforeButton ?? <></>}
            disabled={disabledActionButton}
          >
            {labelActionButton}
          </Button>
        </Stack>
      </BoxContainer>
    </Blanket>,
    node,
  );
};

export { ModalWrapper };
