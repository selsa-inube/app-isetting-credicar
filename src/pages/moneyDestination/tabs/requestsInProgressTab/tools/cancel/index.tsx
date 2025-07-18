import { useContext } from "react";
import { CancelRecord } from "@design/feedback/cancelRecord";
import { cancelRequestInProgressModal } from "@config/moneyDestination/moneyDestinationTab/generics/cancelRequestInProgressModal";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useCancelRequestInProgress } from "@hooks/moneyDestination/useCancelRequestInProgress";
import { ICancel } from "@ptypes/moneyDestination/tabs/ICancel";

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
      status={data.requestStatusCode}
      showInfoModal={false}
      onToggleInfoModal={() => void 0}
    />
  );
};

export { Cancel };
