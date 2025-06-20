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
        <Stack
          gap={smallScreen ? tokens.spacing.s150 : tokens.spacing.s400}
          direction="column"
        >
          {smallScreen && (
            <Stack>
              <Text
                type="title"
                size="medium"
                appearance={ComponentAppearance.DARK}
                ellipsis
              >
                {tablabels.description}
              </Text>
            </Stack>
          )}
          <Stack
            justifyContent={smallScreen ? "center" : "space-between"}
            direction={smallScreen ? "column-reverse" : "row"}
            gap={
              smallScreen ? `${tokens.spacing.s150}` : `${tokens.spacing.s0}`
            }
            width="100%"
          >
            <Stack
              justifyContent="center"
              width={smallScreen ? "100%" : "auto"}
            >
              <Searchfield
                name="searchMoneyDestination"
                id="searchMoneyDestination"
                placeholder={tablabels.searchPlaceholder}
                label={smallScreen ? "" : tablabels.searchLabel}
                size="compact"
                value={searchMoneyDestination}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onSearchMoneyDestination(e)
                }
                fullwidth={smallScreen}
              />
            </Stack>
            {!smallScreen && (
              <Button
                spacing="wide"
                appearance={ComponentAppearance.PRIMARY}
                variant="filled"
                iconBefore={<MdAdd />}
                type="link"
                path="/money-destination/add-destination"
                fullwidth={smallScreen}
              >
                {tablabels.addButton}
              </Button>
            )}
          </Stack>

          {!smallScreen && (
            <Stack>
              <Text
                type="title"
                size="medium"
                appearance={ComponentAppearance.DARK}
              >
                {tablabels.description}
              </Text>
            </Stack>
          )}

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
