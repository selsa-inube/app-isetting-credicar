import { useContext } from "react";
import { CancelRecord } from "@design/feedback/cancelRecord";
import { cancelRequestInProgressModal } from "@config/moneyDestination/moneyDestinationTab/generics/cancelRequestInProgressModal";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useCancelRequestInProgress } from "@hooks/moneyDestination/useCancelRequestInProgress";
import { IEntry } from "@ptypes/design/table/IEntry";
interface ICancel {
  data: IEntry;
  setEntryCanceled: (id: string | number) => void;
}

const Cancel = (props: ICancel) => {
  const { data, setEntryCanceled } = props;
  const { appData } = useContext(AuthAndPortalData);

  const { showModal, loading, handleToggleModal, handleClick } =
    useCancelRequestInProgress(
      appData.businessUnit.publicCode,
      data,
      appData.user.userAccount,
      setEntryCanceled,
    );

  return (
    <CancelRecord
      messageCancel={cancelRequestInProgressModal}
      showModal={showModal}
      onToggleModal={handleToggleModal}
      onClick={handleClick}
      loading={loading}
      status={data.requestStatus}
    />
  );
};

export { Cancel };
