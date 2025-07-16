import { useContext } from "react";
import { CancelRecord } from "@design/feedback/cancelRecord";
import { ICancel } from "@ptypes/payrollAgreement/requestInProgTab/ICancel";
import { cancelRequestInProgressModal } from "@config/payrollAgreement/requestsInProgressTab/generic/cancelRequestInProgressModal";
import { useCancelRequestInProgress } from "@hooks/payrollAgreement/useCancelRequestInProgress";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { EPayrollAgreement } from "@enum/payrollAgreement";

const Cancel = (props: ICancel) => {
  const { data, setEntryCanceled } = props;
  const { appData } = useContext(AuthAndPortalData);

  const {
    showModal,
    loading,
    showInfoModal,
    handleToggleInfoModal,
    handleToggleModal,
    handleClick,
  } = useCancelRequestInProgress({
    useCaseCancel: EPayrollAgreement.USE_CASE_CANCEL_REQUEST,
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
      showInfoModal={showInfoModal}
      onToggleInfoModal={handleToggleInfoModal}
    />
  );
};

export { Cancel };
