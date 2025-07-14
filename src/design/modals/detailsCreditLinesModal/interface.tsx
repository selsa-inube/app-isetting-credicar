import { MdClear } from "react-icons/md";
import { createPortal } from "react-dom";
import {
  Stack,
  Text,
  Icon,
  Divider,
  useMediaQuery,
  Blanket,
  Button,
  Tabs,
} from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { mediaQueryMobile } from "@config/environment";
import { EComponentAppearance } from "@enum/appearances";
import { detailLabels } from "@config/creditLines/details/detailLabels";
import { StyledContainerButton, StyledModal } from "./styles";
import { GeneralDataTab } from "./generalDataTab";
import { IDetailsCreditLinesModalUI } from "@ptypes/design/IDetailsCreditLinesModalUI";

const DetailsCreditLinesModalUI = (props: IDetailsCreditLinesModalUI) => {
  const {
    isSelected,
    onTabChange,
    detailsTabsConfig,
    data,
    portalId,
    onCloseModal,
  } = props;

  const isMobile = useMediaQuery(mediaQueryMobile);

  const node = document.getElementById(portalId);

  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack direction="column" gap={tokens.spacing.s200}>
          <Stack alignItems="center" justifyContent="space-between">
            <Text
              type="headline"
              size="small"
              appearance={EComponentAppearance.DARK}
            >
              {detailLabels.title}
            </Text>
            <StyledContainerButton>
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
                {detailLabels.close}
              </Button>
            </StyledContainerButton>
          </Stack>
          <Divider />
        </Stack>
        <Stack gap={tokens.spacing.s300} direction="column">
          <Tabs
            tabs={Object.values(detailsTabsConfig)}
            selectedTab={isSelected}
            onChange={onTabChange}
            scroll
          />

          {isSelected === detailsTabsConfig.generalData.id && (
            <GeneralDataTab data={data} />
          )}
        </Stack>

        <Stack gap={tokens.spacing.s250} justifyContent="flex-end">
          <Button
            spacing="wide"
            appearance={EComponentAppearance.PRIMARY}
            variant="filled"
            onClick={onCloseModal}
          >
            {detailLabels.close}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
};

export { DetailsCreditLinesModalUI };
