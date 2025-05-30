import { Stack, Tabs, Breadcrumbs, Grid } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { Title } from "@design/data/title";
import { crumbsPayrollAgreement } from "@config/payrollAgreement/navigation";
import { IPayrollAgreementUI } from "@ptypes/payrollAgreement/IPayrollAgreementUI";
import { MenuAddButton } from "@design/feedback/menuAddButton";
import { PayrollAgreementTab } from "./tabs/payrollAgreementTab";
import { RequestsInProgressTab } from "./tabs/requestsInProgressTab";
import { StyledMenuContainer } from "./styles";

const PayrollAgreementUI = (props: IPayrollAgreementUI) => {
  const {
    isSelected,
    descriptionOptions,
    showPayrollAgreementTab,
    showRequestsInProgressTab,
    smallScreen,
    payrollAgreementTabs,
    showModal,
    showInfoModal,
    options,
    onToggleInfoModal,
    onCloseMenu,
    onToggleModal,
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
          <Breadcrumbs crumbs={crumbsPayrollAgreement} />
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
        <Stack gap={tokens.spacing.s300} direction="column" width="100%">
          <Tabs
            tabs={payrollAgreementTabs}
            selectedTab={isSelected}
            onChange={handleTabChange}
          />

          {showPayrollAgreementTab && <PayrollAgreementTab />}
          {showRequestsInProgressTab && <RequestsInProgressTab />}
        </Stack>
      </Stack>
    </Stack>
  );
};

export { PayrollAgreementUI };
