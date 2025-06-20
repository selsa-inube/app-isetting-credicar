import { inube, Searchfield, Stack, Text } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { IRequestsInProgressTabUI } from "@ptypes/payrollAgreement/requestInProgTab/IRequestsInProgressTabUI";
import {
  actionsConfig,
  titles,
  breakPoints,
} from "@config/payrollAgreement/requestsInProgressTab/table";
import { Table } from "@design/data/table";
import { BoxContainer } from "@design/layout/boxContainer";
import { useThemeData } from "@utils/theme";
import { tabLabels } from "@config/payrollAgreement/requestsInProgressTab/tabLabels";
import { ComponentAppearance } from "@enum/appearances";

const RequestsInProgressTabUI = (props: IRequestsInProgressTabUI) => {
  const {
    entries,
    searchrequestProgress,
    loading,
    smallScreen,
    columnWidths,
    pageLength,
    setEntryCanceled,
    onSearchrequestProgress,
  } = props;

  const theme = useThemeData();

  return (
    <BoxContainer
      backgroundColor={
        theme ? theme?.palette?.neutral?.N0 : inube.palette.neutral.N0
      }
      boxSizing="initial"
      borderColor={
        theme ? theme?.palette?.neutral?.N40 : inube.palette.neutral.N40
      }
      borderRadius={tokens.spacing.s100}
      padding={smallScreen ? `${tokens.spacing.s150}` : `${tokens.spacing.s0}`}
    >
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
          width="100%"
        >
          {smallScreen && (
            <Stack>
              <Text
                type="title"
                size="medium"
                appearance={ComponentAppearance.DARK}
                ellipsis
              >
                {tabLabels.description}
              </Text>
            </Stack>
          )}
          <Stack
            justifyContent={smallScreen ? "center" : "start"}
            direction={smallScreen ? "column" : "row"}
            gap={
              smallScreen ? `${tokens.spacing.s150}` : `${tokens.spacing.s0}`
            }
          >
            <Stack
              justifyContent="center"
              width={smallScreen ? "100%" : "auto"}
            >
              <Searchfield
                name="searchrequestProgress"
                id="searchrequestProgress"
                label={smallScreen ? "" : tabLabels.search}
                placeholder={tabLabels.placeholderSearch}
                type="search"
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
                {tabLabels.description}
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
            pageLength={pageLength}
            ellipsisCell={!smallScreen}
          />
        </Stack>
      </Stack>
    </BoxContainer>
  );
};

export { RequestsInProgressTabUI };
