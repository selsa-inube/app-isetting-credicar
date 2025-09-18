import { IDetailsDestinationModal } from "@ptypes/moneyDestination/tabs/IDetailsDestinationModal";
import { DetailsDestinationModalUI } from "./interface";

const DetailsDestinationModal = (props: IDetailsDestinationModal) => {
  const { data, portalId, onCloseModal } = props;

  return (
    <DetailsDestinationModalUI
      data={data}
      onCloseModal={onCloseModal}
      portalId={portalId}
    />
  );
};

export { DetailsDestinationModal };
export type { IDetailsDestinationModal };
