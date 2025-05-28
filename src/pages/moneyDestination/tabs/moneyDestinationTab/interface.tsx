import { MdAdd } from "react-icons/md";
import { Stack, useMediaQuery, Input, Button } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { ComponentAppearance } from "@enum/appearances";
import { Table } from "@design/data/table";
import { IEntry } from "@design/data/table/types";
import {
  actionsConfig,
  breakPoints,
  titles,
} from "@config/moneyDestination/moneyDestinationTab/table";
import { StyledContainer } from "./styles";
import { moneyDestinationTabsConfig } from "@config/moneyDestination/tabs";

interface IMoneyDestinationTabUI {
  entries: IEntry[];
  loading: boolean;
  searchMoneyDestination: string;
  onSearchMoneyDestination: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setEntryDeleted: (value: string | number) => void;
}

function MoneyDestinationTabUI(props: IMoneyDestinationTabUI) {
  const {
    searchMoneyDestination,
    entries,
    loading,
    onSearchMoneyDestination,
    setEntryDeleted,
  } = props;

  const smallScreen = useMediaQuery("(max-width: 690px)");
  const widthFirstColumn = smallScreen ? 64 : 25;

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
              <Input
                name="searchMoneyDestination"
                id="searchMoneyDestination"
                placeholder={
                  moneyDestinationTabsConfig.moneyDestination.placeholder
                }
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

          <Table
            id="portal"
            titles={titles}
            entries={entries}
            actions={actionsConfig(setEntryDeleted)}
            breakpoints={breakPoints}
            filter={searchMoneyDestination}
            isLoading={loading}
            columnWidths={[widthFirstColumn, 55]}
            pageLength={8}
          />
        </Stack>
      </Stack>
    </StyledContainer>
  );
}

export { MoneyDestinationTabUI };
