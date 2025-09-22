import { Stack, Breadcrumbs, Tabs } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { Title } from "@design/data/title";
import { crumbsCreditLines } from "@config/creditLines/navigation";
import { ICreditLinesUI } from "@ptypes/creditLines/ICreditLinesUI";
import { CreditLinesTab } from "./tabs/creditLinesTab";
import { LinesUnderConstructionTab } from "./tabs/linesUnderConstructionTab";
import { RequestsInProgressTab } from "./tabs/requestsInProgressTab";

const CreditLinesUI = (props: ICreditLinesUI) => {
  const {
    descriptionOptions,
    smallScreen,
    creditLinesTabs,
    isSelected,
    showCreditLinesTab,
    showRequestsInProgressTab,
    showLinesUnderConstructionTab,
    setShowUnderConstruction,
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
      <Stack gap={tokens.spacing.s300} direction="column">
        <Stack gap={tokens.spacing.s300} direction="column">
          <Breadcrumbs crumbs={crumbsCreditLines} />
          <Title
            title={descriptionOptions?.publicCode ?? ""}
            description={descriptionOptions?.description ?? ""}
            sizeTitle="large"
          />
        </Stack>

        <Stack gap={tokens.spacing.s300} direction="column" width="100%">
          <Tabs
            tabs={creditLinesTabs}
            selectedTab={isSelected}
            onChange={handleTabChange}
          />
          {showCreditLinesTab && (
            <CreditLinesTab
              setShowUnderConstruction={setShowUnderConstruction}
            />
          )}
          {showRequestsInProgressTab && <RequestsInProgressTab />}
          {showLinesUnderConstructionTab && <LinesUnderConstructionTab />}
        </Stack>
      </Stack>
    </Stack>
  );
};

export { CreditLinesUI };
