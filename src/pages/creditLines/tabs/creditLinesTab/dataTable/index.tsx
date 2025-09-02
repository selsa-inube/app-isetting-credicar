import { MdOutlineInfo } from "react-icons/md";
import { Stack, Text } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { Table } from "@design/data/table";
import { EComponentAppearance } from "@enum/appearances";
import { portalId } from "@config/portalId";
import { titles } from "@config/creditLines/creditLinesTab/table/titles";
import { breakPoints } from "@config/creditLines/creditLinesTab/table/breakPoints";
import { actions } from "@config/creditLines/creditLinesTab/table/actions";
import { creditTabLabels } from "@config/creditLines/creditLinesTab/generic/creditTabLabels";
import { IDataTable } from "@ptypes/creditLines/IDataTable";
import { InformationBox } from "../InformationBox";

const DataTable = (props: IDataTable) => {
  const {
    columnWidths,
    emptyDataMessage,
    entries,
    loadingCreditLines,
    searchCreditLines,
    pageLength,
  } = props;

  return (
    <>
      <Stack>
        <Text
          type="title"
          size="medium"
          appearance={EComponentAppearance.DARK}
          ellipsis
        >
          {creditTabLabels.description}
        </Text>
      </Stack>
      <Stack>
        {entries && entries.length > 0 ? (
          <Table
            id={portalId}
            titles={titles}
            entries={entries}
            actions={actions}
            breakpoints={breakPoints}
            filter={searchCreditLines}
            loading={loadingCreditLines}
            columnWidths={columnWidths}
            pageLength={pageLength}
          />
        ) : (
          <InformationBox
            icon={<MdOutlineInfo />}
            appearanceIcon={EComponentAppearance.PRIMARY}
            description={emptyDataMessage}
            boxPadding={tokens.spacing.s250}
            boxColor={EComponentAppearance.HELP}
            sizeIcon="20px"
            sizeDescription="large"
          />
        )}
      </Stack>
    </>
  );
};

export { DataTable };
