import { MdAdd } from "react-icons/md";
import { Stack, Button, Text, Searchfield } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { ComponentAppearance } from "@enum/appearances";
import { Table } from "@design/data/table";
import { IMoneyDestinationTabUI } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IMoneyDestinationTabUI";
import { tablabels } from "@config/moneyDestination/moneyDestinationTab/tabLabels";
import {
  actionsConfig,
  breakPoints,
  titles,
} from "@config/moneyDestination/moneyDestinationTab/table";
import { StyledContainer } from "./styles";
import { moneyDestinationTabsConfig } from "@config/moneyDestination/tabs";

function MoneyDestinationTabUI(props: IMoneyDestinationTabUI) {
  const {
    searchMoneyDestination,
    entries,
    loading,
    smallScreen,
    columnWidths,
    onSearchMoneyDestination,
    setEntryDeleted,
  } = props;

  return (
    <StyledContainer $smallScreen={smallScreen}>
      <Stack
        width="-webkit-fill-available"
        direction="column"
        gap={tokens.spacing.s250}
        padding={
          smallScreen ? `${tokens.spacing.s150}` : `${tokens.spacing.s300}`
        }
        justifyContent={smallScreen ? "center" : "normal"}
      >
        <Stack gap={tokens.spacing.s400} direction="column">
          <Stack
            justifyContent={smallScreen ? "center" : "space-between"}
            direction={smallScreen ? "column-reverse" : "row"}
            gap={
              smallScreen ? `${tokens.spacing.s150}` : `${tokens.spacing.s0}`
            }
          >
            <Stack justifyContent="center">
              <Searchfield
                name="searchMoneyDestination"
                id="searchMoneyDestination"
                placeholder={
                  moneyDestinationTabsConfig.moneyDestination.placeholder
                }
                label={tablabels.searchLabel}
                type="search"
                size="compact"
                value={searchMoneyDestination}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onSearchMoneyDestination(e)
                }
              />
            </Stack>
            <Button
              spacing="wide"
              appearance={ComponentAppearance.PRIMARY}
              variant="filled"
              iconBefore={<MdAdd />}
              type="link"
              path="/money-destination/add-destination"
              fullwidth={smallScreen}
            >
              {moneyDestinationTabsConfig.moneyDestination.buttonLabel}
            </Button>
          </Stack>

          <Stack>
            <Text
              type="title"
              size="medium"
              appearance={ComponentAppearance.DARK}
            >
              {tablabels.description}
            </Text>
          </Stack>

          <Table
            id="portal"
            titles={titles}
            entries={entries}
            actions={actionsConfig(setEntryDeleted)}
            breakpoints={breakPoints}
            filter={searchMoneyDestination}
            loading={loading}
            columnWidths={columnWidths}
            pageLength={8}
          />
        </Stack>
      </Stack>
    </StyledContainer>
  );
}

export { MoneyDestinationTabUI };
