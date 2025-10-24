import { MdOutlineChevronRight, MdOutlineDoorFront } from "react-icons/md";
import { Icon, Header } from "@inubekit/inubekit";

import { EComponentAppearance } from "@enum/appearances";
import { AppCard } from "@design/feedback/appCard";
import { Title } from "@design/data/title";
import { BusinessUnitChange } from "@design/inputs/BusinessUnitChange";
import { RenderLogo } from "@design/feedback/renderLogo";
import { BoxContainer } from "@design/layout/boxContainer";
import { ErrorPage } from "@design/layout/errorPage";
import { tokens } from "@design/tokens";
import { userMenu } from "@config/menuMainConfiguration";
import { homeLabels } from "@config/home/homeLabels";
import { IHomeUI } from "@ptypes/home/IHomeUI";
import {
  StyledCollapse,
  StyledCollapseIcon,
  StyledFooter,
  StyledHeaderContainer,
  StyledLogo,
  StyledTitle,
} from "./styles";

const HomeUI = (props: IHomeUI) => {
  const {
    data,
    appData,
    businessUnitChangeRef,
    businessUnitsToTheStaff,
    collapse,
    collapseMenuRef,
    selectedClient,
    loading,
    username,
    screenMobile,
    screenTablet,
    screenTabletHeader,
    hasMultipleBusinessUnits,
    optionsHeader,
    dataExists,
    padding,
    onlogout,
    setCollapse,
    handleLogoClick,
  } = props;

  return (
    <>
      <BoxContainer
        direction="column"
        boxSizing="border-box"
        padding={padding}
        height="100vh"
        overflowY="auto"
        backgroundColor={EComponentAppearance.LIGHT}
      >
        <StyledHeaderContainer>
          <Header
            navigation={optionsHeader}
            logoURL={<RenderLogo imgUrl={appData.businessUnit.urlLogo} />}
            user={{
              username: appData.user.userName,
              breakpoint: "848px",
            }}
            menu={userMenu}
          />
          {hasMultipleBusinessUnits && (
            <>
              <StyledCollapseIcon
                $collapse={collapse}
                onClick={() => setCollapse(!collapse)}
                $isTablet={screenTabletHeader}
                ref={collapseMenuRef}
              >
                <Icon
                  icon={<MdOutlineChevronRight />}
                  appearance={EComponentAppearance.PRIMARY}
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
        </StyledHeaderContainer>
        <BoxContainer
          direction="column"
          padding={
            screenMobile ? `${tokens.spacing.s200}` : `${tokens.spacing.s0}`
          }
          gap={screenMobile ? `${tokens.spacing.s300}` : `${tokens.spacing.s0}`}
          backgroundColor={EComponentAppearance.LIGHT}
          boxSizing="initial"
        >
          {(loading || dataExists) && (
            <StyledTitle $isTablet={screenTablet}>
              <Title
                title={`${homeLabels.welcome} ${username}`}
                description={homeLabels.description}
                icon={<MdOutlineDoorFront />}
                sizeTitle="large"
              />
            </StyledTitle>
          )}
          <BoxContainer
            direction="row"
            boxSizing="border-box"
            padding={
              screenTablet
                ? `${tokens.spacing.s0}`
                : `${tokens.spacing.s0} 120px ${tokens.spacing.s400}`
            }
            justifyContent={screenTablet ? "center" : "flex-start"}
            wrap="wrap"
            gap={tokens.spacing.s400}
            backgroundColor={EComponentAppearance.LIGHT}
          >
            <BoxContainer
              direction="row"
              boxSizing="border-box"
              padding={tokens.spacing.s200}
              justifyContent={screenTablet ? "center" : "flex-start"}
              wrap="wrap"
              width="100%"
              gap={tokens.spacing.s250}
              backgroundColor={EComponentAppearance.LIGHT}
              borderColor={EComponentAppearance.DARK}
              borderRadius={tokens.spacing.s100}
            >
              {loading ? (
                <AppCard
                  label={""}
                  description={""}
                  icon={""}
                  url={""}
                  loading
                />
              ) : (
                <>
                  {dataExists ? (
                    <>
                      {data?.map((card) => (
                        <AppCard
                          key={card.id}
                          label={card.publicCode}
                          description={card.description}
                          icon={card.icon}
                          url={card.url}
                          loading={false}
                        />
                      ))}
                    </>
                  ) : (
                    <BoxContainer
                      boxSizing="border-box"
                      width="100%"
                      height="100%"
                    >
                      <ErrorPage errorCode={500} onClick={onlogout} />
                    </BoxContainer>
                  )}
                </>
              )}
            </BoxContainer>
          </BoxContainer>
        </BoxContainer>
        {dataExists && (
          <StyledFooter $isMobile={screenMobile}>
            <StyledLogo src={appData.businessManager.urlBrand} />
          </StyledFooter>
        )}
      </BoxContainer>
    </>
  );
};

export { HomeUI };
