import { Stack, Tabs, Breadcrumbs, Grid } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { Title } from "@design/data/title";
import { crumbsMoneyDestination } from "@config/moneyDestination/navigation";
import { MoneyDestinationTab } from "@pages/moneyDestination/tabs/moneyDestinationTab";
import { RequestsInProgressTab } from "@pages/moneyDestination/tabs/requestsInProgressTab";
import { MenuAddButton } from "@design/feedback/menuAddButton";
import { IMoneyDestinationUI } from "@ptypes/moneyDestination/tabs/IMoneyDestinationUI";
import { StyledMenuContainer } from "./styles";

const MoneyDestinationUI = (props: IMoneyDestinationUI) => {
  const {
    isSelected,
    descriptionOptions,
    options,
    showModal,
    showInfoModal,
    smallScreen,
    showMoneyTab,
    showRequestsTab,
    moneyDestinationTabs,
    onCloseMenu,
    onToggleModal,
    onToggleInfoModal,
    handleTabChange,
  } = props;

  return (
    <Stack
      direction="column"
      width="-webkit-fill-available"
      padding={
        smallScreen
          ? `${tokens.spacing.s200}`
          : `${tokens.spacing.s400} ${tokens.spacing.s800}`
      }
    >
      <Stack
        gap={smallScreen ? tokens.spacing.s200 : tokens.spacing.s600}
        direction="column"
      >
        <Stack gap={tokens.spacing.s300} direction="column">
          <Breadcrumbs crumbs={crumbsMoneyDestination} />
          <Grid
            gap={tokens.spacing.s200}
            justifyContent="space-between"
            templateColumns="1fr auto"
            templateRows="auto"
          >
            <Title
              title={descriptionOptions?.publicCode ?? ""}
              description={descriptionOptions?.description ?? ""}
              sizeTitle="large"
            />

            {smallScreen && (
              <StyledMenuContainer>
                <MenuAddButton
                  showModal={showModal}
                  showInfoModal={showInfoModal}
                  options={options}
                  onToggleInfoModal={onToggleInfoModal}
                  onCloseMenu={onCloseMenu}
                  onToggleModal={onToggleModal}
                />
              </StyledMenuContainer>
            )}
          </Grid>
        </Stack>
        <Stack gap={tokens.spacing.s300} direction="column">
          <Tabs
            tabs={moneyDestinationTabs}
            selectedTab={isSelected}
            onChange={handleTabChange}
          />

          {showMoneyTab && <MoneyDestinationTab />}
          {showRequestsTab && <RequestsInProgressTab />}
        </Stack>
      </Stack>
    </Stack>
  );
};

export { MoneyDestinationUI };
