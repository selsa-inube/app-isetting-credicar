import { MdClear } from "react-icons/md";
import { createPortal } from "react-dom";
import {
  Stack,
  Text,
  Icon,
  Divider,
  useMediaQuery,
  Blanket,
  Tabs,
  Button,
} from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { mediaQueryMobile } from "@config/environment";
import { EComponentAppearance } from "@enum/appearances";
import { detailsModalLabels } from "@config/moneyDestination/moneyDestinationTab/generics/detailsModalLabels";
import { IDetailsDestinationModalUI } from "@ptypes/moneyDestination/tabs/IDetailsDestinationModalUI";
import { StyledContainerButton, StyledModal } from "./styles";
import { GeneralDataTab } from "./tabs/GeneralDataTab";

const DetailsDestinationModalUI = (props: IDetailsDestinationModalUI) => {
  const {
    isSelected,
    smallScreenTab,
    showGeneraldata,
    data,
    filteredTabs,
    portalId,
    onCloseModal,
    onTabChange,
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
              {detailsModalLabels.title}
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
                {detailsModalLabels.close}
              </Button>
            </StyledContainerButton>
          </Stack>
          <Divider />
        </Stack>
        <Stack gap={tokens.spacing.s150} direction="column" height="100%">
          <Tabs
            tabs={filteredTabs}
            selectedTab={isSelected}
            onChange={onTabChange}
            scroll={smallScreenTab ? true : false}
          />
          {showGeneraldata && <GeneralDataTab data={data} />}

          <Divider />
        </Stack>
        <Stack gap={tokens.spacing.s250} justifyContent="flex-end">
          <Button
            spacing="wide"
            appearance={EComponentAppearance.PRIMARY}
            variant="filled"
            onClick={onCloseModal}
          >
            {detailsModalLabels.close}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
};

export { DetailsDestinationModalUI };
