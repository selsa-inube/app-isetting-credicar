import {
  DropdownMenuContainer,
  IDropdownMenuGroup,
} from "@isettingkit/business-rules";
import { Outlet } from "react-router-dom";
import { Grid, Stack } from "@inubekit/inubekit";
import { BoxContainer } from "@design/layout/boxContainer";
import { EComponentAppearance } from "@enum/appearances";
import { groups } from "@config/creditLines/configuration/mainOptions";

const ConfigurationLines = () => {
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
    </Stack>
  );
};
export { ConfigurationLines };
