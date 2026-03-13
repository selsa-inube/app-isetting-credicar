import React from "react";
import { DropdownMenuContainer } from "@isettingkit/business-rules";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { Grid, Stack } from "@inubekit/inubekit";
import { useConfigurationInitial } from "@hooks/creditLine/configurationLines/useConfigurationInitial";
import { useDataCreditLine } from "@hooks/creditLine/configurationLines/useDataCreditLine";
import { EComponentAppearance } from "@enum/appearances";
import { BoxContainer } from "@design/layout/boxContainer";
import { LoadingPage } from "@design/feedback/loadingPage";
import { DecisionModal } from "@design/modals/decisionModal";
import { portalId } from "@config/portalId";
import { IBeforeNavigate } from "@ptypes/creditLines/IBeforeNavigate";
import { StyledDropdownMenuContainer } from "./styles";

const ConfigurationLines = () => {
  const { id, option: optionRequest, optionUseCase } = useParams();
  const location = useLocation();
  const { data: creditLineData, option: optionConfig } = location.state ?? {};

  const { data, loading: loadingCreditData } = useDataCreditLine({
    creditLineData,
    id,
    optionRequest,
  });

  const option = optionUseCase ?? optionConfig;

  const {
    showDecision,
    modalData,
    loadingAllRules,
    groups,
    optionsAllRules,
    loadingGroupRules,
  } = useConfigurationInitial({
    data,
    option,
    loadingCreditData,
    optionRequest,
  });

  const [beforeDropdownNavigate, setBeforeDropdownNavigate] = React.useState<
    IBeforeNavigate | undefined
  >(undefined);

  return (
    <Stack direction="column" width="-webkit-fill-available" height="100%">
      {(loadingCreditData || loadingGroupRules || loadingAllRules) &&
      optionsAllRules.length === 0 ? (
        <LoadingPage />
      ) : (
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
                  groups={groups ?? []}
                  onBeforeNavigate={beforeDropdownNavigate}
                />
              </StyledDropdownMenuContainer>
            </Stack>
          </BoxContainer>

          <Stack direction="column">
            <Outlet context={{ setBeforeDropdownNavigate }} />
          </Stack>
        </Grid>
      )}
      {showDecision && (
        <DecisionModal
          portalId={portalId}
          title={modalData.title}
          actionText={modalData.actionText}
          description={modalData.description}
          onCloseModal={modalData.onCloseModal}
          moreDetails={modalData.moreDetails}
          onClick={modalData.onClick}
          withCancelButton={modalData.withCancelButton}
          withIcon={modalData.withIcon}
          icon={modalData.icon}
          appearance={modalData.appearance}
          appearanceButton={modalData.appearanceButton}
          changeZIndex
        />
      )}
    </Stack>
  );
};

export { ConfigurationLines };
