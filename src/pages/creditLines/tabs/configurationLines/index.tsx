import {
  DropdownMenuContainer,
  IDropdownMenuGroup,
} from "@isettingkit/business-rules";
import { Outlet, useLocation } from "react-router-dom";
import { Grid, Stack } from "@inubekit/inubekit";
import { useConfigurationInitial } from "@hooks/creditLine/configurationLines/useConfigurationInitial";
import { EComponentAppearance } from "@enum/appearances";
import { BoxContainer } from "@design/layout/boxContainer";
import { DecisionModal } from "@design/modals/decisionModal";
import { portalId } from "@config/portalId";
import { groups } from "@config/creditLines/configuration/mainOptions";
import { StyledDropdownMenuContainer } from "./styles";

const ConfigurationLines = () => {
  const location = useLocation();
  const { data } = location.state ?? {};

  const { showDecision, modalData } = useConfigurationInitial({ data });

  return (
    <Stack direction="column" width="-webkit-fill-available" height="100%">
      <Grid alignContent="unset" templateColumns="auto 1fr">
        <BoxContainer
          borderColor={EComponentAppearance.GRAY}
          boxSizing="border-box"
          direction="column"
          height="calc(100vh - 50px)"
          overflowY="auto"
          width="334px"
        >
          <Stack direction="column" height="100%">
            <StyledDropdownMenuContainer>
              <DropdownMenuContainer
                defaultOpenId="lineNamesAndDescriptions"
                groups={groups as unknown as IDropdownMenuGroup[]}
              />
            </StyledDropdownMenuContainer>
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
