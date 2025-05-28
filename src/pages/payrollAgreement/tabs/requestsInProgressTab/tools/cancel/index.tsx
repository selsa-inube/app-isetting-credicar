import { useContext } from "react";
import { CancelRecord } from "@design/feedback/cancelRecord";
import { ICancel } from "@ptypes/payrollAgreement/requestInProgTab/ICancel";
import { cancelRequestInProgressModal } from "@config/payrollAgreement/requestsInProgressTab/generic/cancelRequestInProgressModal";
import { useCancelRequestInProgress } from "@hooks/payrollAgreement/useCancelRequestInProgress";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";

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
      status={data.requestStatus}
    />
  );
};

export { Cancel };
