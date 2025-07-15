import { MdAdd } from "react-icons/md";
import { Stack, Button, Text, Searchfield } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import { Table } from "@design/data/table";
import { IMoneyDestinationTabUI } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IMoneyDestinationTabUI";
import { tabLabels } from "@config/moneyDestination/moneyDestinationTab/tabLabels";
import {
  actionsConfig,
  breakPoints,
  titles,
} from "@config/moneyDestination/moneyDestinationTab/table";
import { portalId } from "@config/portalId";
import { StyledContainer } from "./styles";

function MoneyDestinationTabUI(props: IMoneyDestinationTabUI) {
  const {
    searchMoneyDestination,
    entries,
    loading,
    smallScreen,
    columnWidths,
    emptyDataMessage,
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
                appearance={EComponentAppearance.DARK}
                ellipsis
              >
                {tabLabels.description}
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
                placeholder={tabLabels.searchPlaceholder}
                label={smallScreen ? "" : tabLabels.searchLabel}
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
                appearance={EComponentAppearance.PRIMARY}
                variant="filled"
                iconBefore={<MdAdd />}
                type="link"
                path="/money-destination/add-destination"
                fullwidth={smallScreen}
              >
                {tabLabels.addButton}
              </Button>
            )}
          </Stack>

          {!smallScreen && (
            <Stack>
              <Text
                type="title"
                size="medium"
                appearance={EComponentAppearance.DARK}
              >
                {tabLabels.description}
              </Text>
            </Stack>
          )}

          <Table
            id={portalId}
            titles={titles}
            entries={entries}
            actions={actionsConfig(setEntryDeleted)}
            breakpoints={breakPoints}
            filter={searchMoneyDestination}
            loading={loading}
            columnWidths={columnWidths}
            pageLength={8}
            emptyDataMessage={emptyDataMessage}
          />
        </Stack>
      </Stack>
    </StyledContainer>
  );
}

export { MoneyDestinationTabUI };
