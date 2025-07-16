import { useContext } from "react";
import { CancelRecord } from "@design/feedback/cancelRecord";
import { cancelRequestInProgressModal } from "@config/generalCreditPolicies/requestsInProgressTab/generic/cancelRequestInProgressModal";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { ICancel } from "@ptypes/generalCredPolicies/ICancel";
import { useCancelRequestInProgress } from "@hooks/GeneralCreditPolicies/useCancelRequestInProgress";

const Cancel = (props: ICancel) => {
  const { data, setEntryCanceled } = props;
  const { appData } = useContext(AuthAndPortalData);

  const { showModal, loading, handleToggleModal, handleClick } =
    useCancelRequestInProgress({
      businessUnit: appData.businessUnit.publicCode,
      data,
      userAccount: appData.user.userAccount,
      setEntryCanceled,
    });

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
