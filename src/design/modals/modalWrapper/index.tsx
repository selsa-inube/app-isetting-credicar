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
    appearanceButton = EComponentAppearance.PRIMARY,
    borderRadius = tokens.spacing.s100,
    children,
    dashed = false,
    disabledActionButton = false,
    height = "auto",
    iconBeforeButton,
    isMobile = false,
    labelActionButton,
    labelCloseButton,
    labelCloseModal,
    loading = false,
    maxHeight,
    minHeight,
    padding = tokens.spacing.s300,
    portalId,
    sizeTitle = "small",
    subtitle,
    title,
    typeTitle = "headline",
    variantCancel = "filled",
    weightTitle = "normal",
    width = "auto",
    withCancelButton,
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
        borderRadius={borderRadius}
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
              type={typeTitle}
              size={sizeTitle}
              appearance={EComponentAppearance.DARK}
              weight={weightTitle}
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
          {subtitle && (
            <Text size="medium" appearance={EComponentAppearance.GRAY}>
              {subtitle}
            </Text>
          )}
          <Divider dashed={dashed} />
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
              appearance={EComponentAppearance.GRAY}
              variant={variantCancel}
              onClick={onCloseModal}
            >
              {labelCloseButton}
            </Button>
          )}

          <Button
            spacing="wide"
            appearance={appearanceButton}
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
