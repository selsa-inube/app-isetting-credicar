import { SkeletonLine, Td } from "@inubekit/inubekit";
import { IActionsLoading } from "@ptypes/design/IActionsLoading";

const ActionsLoading = (props: IActionsLoading) => {
  const { numberActions } = props;
  const cellsOfActionsLoading = [];
  for (let cellAction = 0; cellAction < numberActions; cellAction++) {
    cellsOfActionsLoading.push(
      <Td key={cellAction}>
        <SkeletonLine animated />
      </Td>,
    );
  }
  return cellsOfActionsLoading;
};

export { ActionsLoading };
