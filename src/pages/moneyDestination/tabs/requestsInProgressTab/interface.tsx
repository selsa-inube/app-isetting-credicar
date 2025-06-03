import { Searchfield, Stack, Text } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";

import { IRequestsInProgressTabUI } from "@ptypes/moneyDestination/tabs/IRequestsInProgressTab/IRequestsInProgressTabUI";
import {
  actionsConfig,
  breakPoints,
  titles,
} from "@config/moneyDestination/requestsInProgressTab/table";
import { Table } from "@design/data/table";
import { tablabels } from "@config/moneyDestination/requestsInProgressTab/tabLabels";
import { ComponentAppearance } from "@enum/appearances";
import { StyledContainer } from "./styles";

const RequestsInProgressTabUI = (props: IRequestsInProgressTabUI) => {
  const {
    entries,
    searchrequestProgress,
    loading,
    smallScreen,
    columnWidths,
    setEntryCanceled,
    onSearchrequestProgress,
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
            justifyContent={smallScreen ? "center" : "start"}
            direction={smallScreen ? "column" : "row"}
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
                value={searchrequestProgress}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onSearchrequestProgress(e)
                }
                fullwidth={smallScreen}
              />
            </Stack>
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
            actions={actionsConfig(setEntryCanceled)}
            breakpoints={breakPoints}
            filter={searchrequestProgress}
            loading={loading}
            columnWidths={columnWidths}
            pageLength={8}
            ellipsisCell={smallScreen}
          />
        </Stack>
      </Stack>
    </StyledContainer>
  );
};

export { RequestsInProgressTabUI };
