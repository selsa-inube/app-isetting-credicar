import { SkeletonLine, Td, Tr } from "@inubekit/inubekit";

import { IDataLoading } from "@ptypes/hooks/IDataLoading";
import { ActionsLoading } from "../actionsLoading";

const DataLoading = (props: IDataLoading) => {
  const { titleColumns, numberActions } = props;
  const rowsLoading = [];
  for (let rows = 0; rows < 4; rows++) {
    rowsLoading.push(
      <Tr key={rows}>
        {titleColumns.map((title) => (
          <Td key={`e-${title.id}`}>
            <SkeletonLine animated />
          </Td>
        ))}
        <ActionsLoading numberActions={numberActions} />
      </Tr>,
    );
  }
  return rowsLoading;
};

export { DataLoading };
