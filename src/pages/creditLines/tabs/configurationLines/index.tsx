import {
  DropdownMenuContainer,
  IDropdownMenuGroup,
} from "@isettingkit/business-rules";
import { Outlet, useLocation } from "react-router-dom";
import { Grid, Stack } from "@inubekit/inubekit";
import { useConfigurationInitial } from "@hooks/creditLine/configurationLines/useConfigurationInitial";
import { BoxContainer } from "@design/layout/boxContainer";
import { DecisionModal } from "@design/modals/decisionModal";
import { EComponentAppearance } from "@enum/appearances";
import { groups } from "@config/creditLines/configuration/mainOptions";
import { portalId } from "@config/portalId";

const ConfigurationLines = () => {
  const location = useLocation();
  const { data } = location.state ?? {};

  const { showDecision, modalData } = useConfigurationInitial({ data });

  return (
    <Stack direction="column" width="-webkit-fill-available">
      <Grid templateColumns="auto 1fr" alignContent="unset" height="95vh">
        <BoxContainer
          direction="column"
          width="334px"
          height="calc(100vh - 50px)"
          borderColor={EComponentAppearance.GRAY}
          boxSizing="border-box"
          overflowY="auto"
        >
          <Stack direction="column" height="100%">
            <DropdownMenuContainer
              groups={groups as unknown as IDropdownMenuGroup[]}
              defaultOpenId="lineNamesAndDescriptions"
            />
          </Stack>
        </BoxContainer>
        <Stack direction="column">
          <Outlet />
        </Stack>
      </Grid>
      {showDecision && (
        <DecisionModal
          portalId={portalId}
          title={modalData.title}
          actionText={modalData.actionText}
          description={modalData.description}
          onCloseModal={modalData.onCloseModal}
          onClick={modalData.onClick}
          withCancelButton={modalData.withCancelButton}
          withIcon={modalData.withIcon}
          icon={modalData.icon}
          appearance={modalData.appearance}
          appearanceButton={modalData.appearanceButton}
        />
      )}
    </Stack>
  );
};
export { ConfigurationLines };
