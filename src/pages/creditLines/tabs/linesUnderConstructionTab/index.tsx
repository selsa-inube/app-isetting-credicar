import { useLineInConstructionTab } from "@hooks/creditLine/useLineInConstructionTab";
import { usePageLength } from "@hooks/usePageLength";
import { IEntry } from "@ptypes/design/table/IEntry";
import { LinesUnderConstructionTabUI } from "./interface";

const LinesUnderConstructionTab = () => {
  const {
    lineUnderConstruction,
    loading,
    columnWidths,
    emptyDataMessage,
    modalData,
    showDecision,
    searchLineInConstruction,
    setEntryDeleted,
    handleSearchLineInConstruction,
  } = useLineInConstructionTab();

  const pageLength = usePageLength();
  return (
    <LinesUnderConstructionTabUI
      loading={loading}
      searchLineInConstruction={searchLineInConstruction}
      showModal={showDecision}
      modalData={modalData}
      columnWidths={columnWidths}
      entries={lineUnderConstruction as IEntry[]}
      emptyDataMessage={emptyDataMessage}
      pageLength={pageLength}
      onSearchLineInConstruction={handleSearchLineInConstruction}
      setEntryDeleted={setEntryDeleted}
    />
  );
};

export { LinesUnderConstructionTab };
