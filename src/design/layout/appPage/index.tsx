import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { MdOutlineChevronRight } from "react-icons/md";
import { Icon, Grid, Header, Nav } from "@inubekit/inubekit";

import { BusinessUnitChange } from "@design/inputs/BusinessUnitChange";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { userMenu } from "@config/menuMainConfiguration";
import { actionsConfig } from "@config/mainActionLogout";
import { useAppPage } from "@hooks/design/useAppPage";
import {
  StyledAppPage,
  StyledCollapse,
  StyledCollapseIcon,
  StyledContainer,
  StyledContentImg,
  StyledHeaderContainer,
  StyledLogo,
  StyledMain,
} from "./styles";

const renderLogo = (imgUrl: string) => {
  return (
    <StyledContentImg to="/">
      <StyledLogo src={imgUrl} />
    </StyledContentImg>
  );
};

function AppPage() {
  const {
    appData,
    businessUnitsToTheStaff,
    setBusinessUnitSigla,
    businessUnitSigla,
  } = useContext(AuthAndPortalData);

  const {
    collapse,
    collapseMenuRef,
    optionsHeader,
    optionsNav,
    isTablet,
    isTabletMain,
    businessUnitChangeRef,
    selectedClient,
    setCollapse,
    handleLogoClick,
  } = useAppPage(appData, businessUnitSigla, setBusinessUnitSigla);

  return (
    <StyledAppPage>
      <Grid templateRows="auto 1fr" height="100vh" justifyContent="unset">
        <StyledHeaderContainer>
          <Header
            navigation={optionsHeader}
            user={{
              username: appData.user.userName,
              breakpoint: "848px",
            }}
            logoURL={renderLogo(appData.businessUnit.urlLogo)}
            menu={userMenu}
          />
        </StyledHeaderContainer>
        {businessUnitsToTheStaff.length > 1 && (
          <>
            <StyledCollapseIcon
              $collapse={collapse}
              onClick={() => setCollapse(!collapse)}
              $isTablet={isTablet}
              ref={collapseMenuRef}
            >
              <Icon
                icon={<MdOutlineChevronRight />}
                appearance="primary"
                size="24px"
                cursorHover
              />
            </StyledCollapseIcon>
            {collapse && (
              <StyledCollapse ref={businessUnitChangeRef}>
                <BusinessUnitChange
                  businessUnits={businessUnitsToTheStaff}
                  onLogoClick={handleLogoClick}
                  selectedClient={selectedClient}
                />
              </StyledCollapse>
            )}
          </>
        )}
        <StyledContainer>
          <Grid
            templateColumns={!isTablet ? "auto 1fr" : "1fr"}
            alignContent="unset"
            height={"95vh"}
          >
            {!isTablet && (
              <Nav navigation={optionsNav} actions={actionsConfig()} />
            )}
            <StyledMain $isMobile={isTabletMain}>
              <Outlet />
            </StyledMain>
          </Grid>
        </StyledContainer>
      </Grid>
    </StyledAppPage>
  );
}

export { AppPage };
