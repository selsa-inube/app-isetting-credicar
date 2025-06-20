import { Stack, useMediaQueries, useMediaQuery } from "@inubekit/inubekit";

import { useMemo, useState } from "react";
import { filterEntries } from "@utils/table/filterEntries";
import { getQueriesArray } from "@utils/table/breakpoint/getQueriesArray";
import { nextPage } from "@utils/table/pagination/nextPage";
import { prevPage } from "@utils/table/pagination/prevPage";
import { getPagination } from "@utils/table/pagination/getPagination";
import { goToFirstPage } from "@utils/table/pagination/goToFirstPage";
import { goToEndPage } from "@utils/table/pagination/goToEndPage";
import { getPageEntries } from "@utils/table/pagination/getPageEntries";
import { titleColumns } from "@utils/table/titleColumns";
import { findCurrentMediaQuery } from "@utils/table/breakpoint/findCurrentMediaQuery";
import { ITable } from "@ptypes/design/table/ITable";
import { TableUI } from "./interface";
import { StyledContainerTable } from "./styles";

const Table = (props: ITable) => {
  const {
    id,
    titles,
    actions,
    entries,
    filter = "",
    loading,
    mobileTitle,
    pageLength = 10,
    breakpoints,
    tableLayout = "fixed",
    widthPercentageTotalColumns,
    columnWidths,
    emptyDataMessage,
    withActionsTitles,
    ellipsisCell = true,
    withActionMobile = true,
    withGeneralizedTitle = false,
  } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const mediaQueries = useMediaQueries(getQueriesArray(breakpoints));
  const mediaActionOpen = useMediaQuery("(max-width: 1200px)");
  const screenTablet = useMediaQuery("(max-width: 1200px)");

  const media = useMediaQueries(getQueriesArray(breakpoints) || []);

  const filteredEntries = useMemo(
    () => filterEntries(entries, filter, titles),
    [entries, filter, titles],
  );

  const { totalPages, firstEntry, lastEntry } = getPagination(
    currentPage,
    pageLength,
    filteredEntries.length,
  );

  const numberActions = actions ? actions.length : 1;

  const findCurrentMedia = findCurrentMediaQuery(media);

  return (
    <StyledContainerTable
      id={id}
      $pageLength={pageLength}
      $entriesLength={entries.length}
      $isTablet={screenTablet}
    >
      <Stack direction="column">
        <TableUI
          titles={titles}
          actions={actions}
          entriesLength={entries.length}
          entries={getPageEntries(filteredEntries, firstEntry, lastEntry)}
          loading={loading}
          mediaActionOpen={mediaActionOpen}
          numberActions={numberActions}
          TitleColumns={titleColumns(
            titles,
            breakpoints,
            mediaQueries,
            findCurrentMedia,
          )}
          mobileTitle={mobileTitle}
          pageLength={pageLength}
          firstEntryInPage={firstEntry}
          lastEntryInPage={lastEntry}
          goToFirstPage={() => goToFirstPage(setCurrentPage)}
          prevPage={() => prevPage(currentPage, setCurrentPage)}
          nextPage={() => nextPage(currentPage, totalPages, setCurrentPage)}
          goToEndPage={() => goToEndPage(setCurrentPage, totalPages)}
          filteredEntries={filteredEntries}
          widthPercentageTotalColumns={widthPercentageTotalColumns}
          columnWidths={columnWidths}
          emptyDataMessage={emptyDataMessage}
          withActionsTitles={withActionsTitles}
          tableLayout={tableLayout}
          ellipsisCell={ellipsisCell}
          withActionMobile={withActionMobile}
          withGeneralizedTitle={withGeneralizedTitle}
        />
      </Stack>
    </StyledContainerTable>
  );
};

export { Table };
