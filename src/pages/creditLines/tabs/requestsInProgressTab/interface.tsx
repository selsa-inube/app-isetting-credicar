import { Searchfield, Stack, Text } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { Table } from "@design/data/table";
import { BoxContainer } from "@design/layout/boxContainer";
import { EComponentAppearance } from "@enum/appearances";
import { actionsConfig } from "@config/creditLines/requestInProgressTab/table/actions";
import { titles } from "@config/creditLines/requestInProgressTab/table/titles";
import { portalId } from "@config/portalId";
import { breakPoints } from "@config/creditLines/requestInProgressTab/table/breakPoints";
import { tabLabels } from "@config/creditLines/requestInProgressTab/tabLabels";
import { IRequestsInProgressTabUI } from "@ptypes/payrollAgreement/requestInProgTab/IRequestsInProgressTabUI";

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

  return (
    <BoxContainer
      backgroundColor={EComponentAppearance.LIGHT}
      boxSizing="initial"
      borderColor={EComponentAppearance.DARK}
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
                appearance={EComponentAppearance.DARK}
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
            actions={actionsConfig(setEntryCanceled)}
            breakpoints={breakPoints}
            filter={searchrequestProgress}
            loading={loading}
            columnWidths={columnWidths}
            pageLength={pageLength}
            ellipsisCell={!smallScreen}
            tableLayout="auto"
          />
        </Stack>
      </Stack>
    </BoxContainer>
  );
};

export { RequestsInProgressTabUI };
