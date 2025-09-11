import { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MdOutlineChevronRight } from "react-icons/md";
import { Icon, Grid, Header, Nav } from "@inubekit/inubekit";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useAppPage } from "@hooks/design/useAppPage";
import { BusinessUnitChange } from "@design/inputs/BusinessUnitChange";
import { userMenu } from "@config/menuMainConfiguration";
import { actionsConfig } from "@config/mainActionLogout";
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

const AppPage = () => {
  const {
    appData,
    businessUnitsToTheStaff,
    setBusinessUnitSigla,
    businessUnitSigla,
  } = useContext(AuthAndPortalData);

  const location = useLocation();
  const {
    collapse,
    collapseMenuRef,
    optionsHeader,
    optionsNav,
    isTablet,
    isTabletMain,
    businessUnitChangeRef,
    selectedClient,
    maxWidthPage,
    setCollapse,
    handleLogoClick,
  } = useAppPage({
    appData,
    businessUnitSigla,
    setBusinessUnitSigla,
    location,
  });

  const hasbusinessUnits = businessUnitsToTheStaff.length > 1;

  return (
    <StyledAppPage>
      <Grid templateRows="auto 1fr" height="100vh" justifyContent="unset">
        <StyledHeaderContainer>
          <Header
            navigation={optionsHeader}
            user={{
              username: appData.user.userName,
              breakpoint: "1281px",
            }}
            logoURL={renderLogo(appData.businessUnit.urlLogo)}
            menu={userMenu}
          />
        </StyledHeaderContainer>
        {hasbusinessUnits && (
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
            <StyledMain $maxWidthPage={maxWidthPage} $isMobile={isTabletMain}>
              <Outlet />
            </StyledMain>
          </Grid>
        </StyledContainer>
      </Grid>
    </StyledAppPage>
  );
};

export { AppPage };
