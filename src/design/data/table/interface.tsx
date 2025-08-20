import {
  Text,
  Colgroup,
  Pagination,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@inubekit/inubekit";
import { EComponentAppearance } from "@enum/appearances";
import { getAlignment } from "@utils/getAlignment/index.";
import { tableLabels } from "@config/tableLabels";
import { ITableUI } from "@ptypes/design/table/ITableUI";
import { WidthColmnsData } from "./widthColumns";
import { ShowActionTitle } from "./showActionTitle";
import { ShowAction } from "./showAction";
import { DataLoading } from "./dataLoading";

const TableUI = (props: ITableUI) => {
  const {
    actions,
    entries,
    entriesLength,
    filteredEntries,
    firstEntryInPage,
    loading,
    lastEntryInPage,
    hasEntries,
    isPaginated,
    titles,
    widthPercentageTotalColumns,
    columnWidths,
    mediaActionOpen,
    numberActions,
    TitleColumns,
    emptyDataMessage,
    withActionsTitles,
    tableLayout,
    ellipsisCell,
    withActionMobile,
    withGeneralizedTitle,
    goToEndPage,
    goToFirstPage,
    nextPage,
    prevPage,
  } = props;

  return (
    <Table tableLayout={tableLayout}>
      <Colgroup>
        {WidthColmnsData({
          titleColumns: TitleColumns,
          widthPercentageTotalColumns,
          columnWidths,
        })}
      </Colgroup>

      <Thead>
        <Tr border="bottom">
          {TitleColumns.map((title, index) => (
            <Th key={index} align="center">
              {title.titleName}
            </Th>
          ))}
          {ShowActionTitle({
            numberActions,
            mediaQuery: mediaActionOpen,
            actionTitle: actions,
            title: withActionsTitles,
            withGeneralizedTitle,
          })}
        </Tr>
      </Thead>
      <Tbody>
        {loading ? (
          DataLoading({ titleColumns: TitleColumns, numberActions })
        ) : (
          <>
            {entriesLength === 0 ? (
              <Tr>
                <Td type="custom" colSpan={titles.length + actions.length}>
                  <Text
                    type="label"
                    size={mediaActionOpen ? "medium" : "large"}
                    appearance={EComponentAppearance.DARK}
                    textAlign="center"
                  >
                    {emptyDataMessage
                      ? `${emptyDataMessage}`
                      : tableLabels.emptyData}
                  </Text>
                </Td>
              </Tr>
            ) : (
              <>
                {hasEntries ? (
                  entries.map((entry, index) => (
                    <Tr key={index} zebra={index % 2 === 1} border="top">
                      {TitleColumns.map((title, index) => (
                        <Td
                          key={`${index}-${entry[title.id]}`}
                          align={getAlignment(title.id, entry[title.id])}
                          type="custom"
                        >
                          <Text size="small" ellipsis={ellipsisCell}>
                            {entry[title.id]}
                          </Text>
                        </Td>
                      ))}
                      {ShowAction({
                        actionContent: actions,
                        entry,
                        mediaQuery: mediaActionOpen,
                        withActionMobile,
                      })}
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td type="custom" colSpan={titles.length + actions.length}>
                      <Text
                        type="label"
                        size="large"
                        appearance={EComponentAppearance.DARK}
                        ellipsis
                      >
                        {tableLabels.emptySearch}
                      </Text>
                    </Td>
                  </Tr>
                )}
              </>
            )}
          </>
        )}
      </Tbody>

      {isPaginated && (
        <Tfoot>
          <Tr border="bottom">
            <Td
              colSpan={
                mediaActionOpen
                  ? titles.length + 1
                  : titles.length + actions.length
              }
              type="custom"
              align="left"
            >
              <Pagination
                firstEntryInPage={firstEntryInPage}
                lastEntryInPage={lastEntryInPage}
                totalRecords={filteredEntries.length}
                handleStartPage={goToFirstPage}
                handlePrevPage={prevPage}
                handleNextPage={nextPage}
                handleEndPage={goToEndPage}
              />
            </Td>
          </Tr>
        </Tfoot>
      )}
    </Table>
  );
};

export { TableUI };
