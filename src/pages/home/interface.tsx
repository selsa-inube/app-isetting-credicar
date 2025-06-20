import { MdOutlineChevronRight, MdOutlineDoorFront } from "react-icons/md";
import { Icon, Header, Text, inube } from "@inubekit/inubekit";

import { AppCard } from "@design/feedback/appCard";
import { Title } from "@design/data/title";
import { BusinessUnitChange } from "@design/inputs/BusinessUnitChange";
import { userMenu } from "@config/menuMainConfiguration";
import { IHomeUI } from "@ptypes/home/IHomeUI";
import { ComponentAppearance } from "@enum/appearances";
import { RenderLogo } from "@design/feedback/renderLogo";
import { homeLabels } from "@config/home/homeLabels";
import { BoxContainer } from "@design/layout/boxContainer";
import { tokens } from "@design/tokens";
import { useThemeData } from "@utils/theme";
import {
  StyledCollapse,
  StyledCollapseIcon,
  StyledFooter,
  StyledHeaderContainer,
  StyledLogo,
  StyledTitle,
} from "./styles";

const HomeUI = (props: IHomeUI) => {
  const theme = useThemeData();
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
    setCollapse,
    handleLogoClick,
  } = props;

  return (
    <>
      <BoxContainer
        direction="column"
        boxSizing="border-box"
        padding={`${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s500}`}
        height="100vh"
        overflowY="auto"
        backgroundColor={
          theme ? theme?.palette?.neutral?.N0 : inube.palette.neutral.N0
        }
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
                  appearance={ComponentAppearance.PRIMARY}
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
          backgroundColor={
            theme ? theme?.palette?.neutral?.N0 : inube.palette.neutral.N0
          }
          boxSizing="initial"
        >
          <StyledTitle $isTablet={screenTablet}>
            <Title
              title={`${homeLabels.welcome} ${username}`}
              description={homeLabels.description}
              icon={<MdOutlineDoorFront />}
              sizeTitle="large"
            />
          </StyledTitle>
          <BoxContainer
            direction="row"
            boxSizing="border-box"
            padding={
              screenTablet
                ? `${tokens.spacing.s0}`
                : `${tokens.spacing.s0} ${tokens.spacing.s1400} ${tokens.spacing.s400} 170px`
            }
            justifyContent={screenTablet ? "center" : "flex-start"}
            wrap="wrap"
            gap={tokens.spacing.s400}
            backgroundColor={
              theme ? theme?.palette?.neutral?.N0 : inube.palette.neutral.N0
            }
          >
            {dataExists ? (
              data?.map((card) => (
                <AppCard
                  key={card.id}
                  label={card.publicCode}
                  description={card.description}
                  icon={card.icon}
                  url={card.url}
                  loading={loading}
                />
              ))
            ) : (
              <Text size="medium">{homeLabels.noData}</Text>
            )}
          </BoxContainer>
        </BoxContainer>
        <StyledFooter $isMobile={screenMobile}>
          <StyledLogo src={appData.businessManager.urlBrand} />
        </StyledFooter>
      </BoxContainer>
    </>
  );
};

export { HomeUI };
