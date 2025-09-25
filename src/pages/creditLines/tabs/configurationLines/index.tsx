import { Outlet } from "react-router-dom";
import { Grid, Stack } from "@inubekit/inubekit";
import { BoxContainer } from "@design/layout/boxContainer";
import { EComponentAppearance } from "@enum/appearances";
import { groups } from "@config/creditLines/configuration/mainOptions";
import {
  StyledDropdownMenuContainer,
  StyledFloatButtonsContainer,
} from "./styles";
import { MdOutlineSend } from "react-icons/md";
import {
  BackAndNextButton,
  DropdownMenuContainer,
  IDropdownMenuGroup,
  SendButton,
} from "@isettingkit/business-rules";
import { useStepNavigation } from "@hooks/creditLine/useStepNavigation";

const ConfigurationLines = () => {
  const nav = useStepNavigation({
    groups: groups as unknown as IDropdownMenuGroup[],
  });

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

      <StyledFloatButtonsContainer>
        <Stack gap="16px" justifyContent="flex-end" padding="0 3.3rem 0 0">
          <BackAndNextButton
            cursorHover
            disabledBack={nav.disabledBack}
            disabledNext={nav.disabledNext}
            handleBack={nav.handleBack}
            handleNext={nav.handleNext}
            loading={false}
            textValues={{ back: "Atrás", next: "Siguiente" }}
          />
          <SendButton
            cursorHover
            disabled={false}
            iconBefore={<MdOutlineSend />}
            loading={false}
          >
            Enviar
          </SendButton>
        </Stack>
      </StyledFloatButtonsContainer>
    </Stack>
  );
};

export { ConfigurationLines };
