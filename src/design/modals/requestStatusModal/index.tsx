import { MdCheckCircle, MdClear } from "react-icons/md";
import { createPortal } from "react-dom";
import {
  Blanket,
  Button,
  Divider,
  Icon,
  Stack,
  Text,
  useMediaQuery,
} from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import { IRequestStatusModal } from "@ptypes/design/IRequestStatusModal";
import { closeLabels } from "@config/closeLabels";
import { StyledModal } from "./styles";
import { StyledModalContainer } from "../modalWrapper/styles";

const RequestStatusModal = (props: IRequestStatusModal) => {
  const {
    portalId,
    actionText,
    title,
    appearance,
    description,
    loading,
    requestNumber,
    changeZIndex = false,
    onClick,
    onCloseModal,
  } = props;

  const isMobile = useMediaQuery("(max-width: 768px)");

  const node = document.getElementById(portalId);

  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  return createPortal(
    <StyledModalContainer $changeZIndex={changeZIndex}>
      <Blanket>
        <StyledModal $smallScreen={isMobile}>
          <Stack direction="column" gap={tokens.spacing.s200}>
            <Stack alignItems="center" justifyContent="space-between">
              <Text
                type="headline"
                size="small"
                weight="bold"
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
                {closeLabels.title}
              </Button>
            </Stack>
            <Divider />
          </Stack>

          <Stack alignItems="center" justifyContent="center">
            <Icon
              icon={<MdCheckCircle />}
              appearance={EComponentAppearance.SUCCESS}
              size="68px"
            />
          </Stack>

          <Stack direction="column" gap={tokens.spacing.s200}>
            <Stack justifyContent="center">
              <Text
                textAlign="center"
                appearance={EComponentAppearance.DARK}
                size="large"
                weight="bold"
              >
                {`Solicitud # ${requestNumber}`}
              </Text>
            </Stack>

            <Text appearance={EComponentAppearance.GRAY} size="medium">
              {description}
            </Text>
          </Stack>

          <Stack width="100%" justifyContent="flex-end">
            <Button
              spacing="wide"
              appearance={appearance}
              variant="filled"
              loading={loading}
              onClick={onClick}
              fullwidth={isMobile ? true : false}
            >
              {actionText}
            </Button>
          </Stack>
        </StyledModal>
      </Blanket>
    </StyledModalContainer>,
    node,
  );
};

export { RequestStatusModal };
export type { IRequestStatusModal };
