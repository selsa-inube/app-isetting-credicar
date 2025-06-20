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
import { ComponentAppearance } from "@enum/appearances";
import { IEntry } from "@ptypes/design/table/IEntry";
import { StyledContainerButton, StyledModal } from "./styles";
import { IDetailsTabsConfig } from "./types";
import { GeneralDataTab } from "./generalDataTab";

interface IDetailsCreditLinesModalUI {
  data: IEntry;
  detailsTabsConfig: IDetailsTabsConfig;
  isSelected: string;
  portalId: string;
  smallScreenTab: boolean;
  onCloseModal: () => void;
  onTabChange: (id: string) => void;
}

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
            <Text type="headline" size="small" appearance="dark">
              Detalles
            </Text>
            <StyledContainerButton>
              <Button
                spacing="compact"
                appearance={ComponentAppearance.DARK}
                variant="none"
                onClick={onCloseModal}
                iconAfter={
                  <Icon
                    appearance={ComponentAppearance.DARK}
                    icon={<MdClear />}
                  />
                }
              >
                Cerrar
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
            appearance={ComponentAppearance.PRIMARY}
            variant="filled"
            onClick={onCloseModal}
          >
            Cerrar
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
};

export { DetailsCreditLinesModalUI };
export type { IDetailsCreditLinesModalUI };
