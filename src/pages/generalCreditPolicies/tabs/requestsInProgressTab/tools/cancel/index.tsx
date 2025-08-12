import { useContext } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useCancelRequestInProgress } from "@hooks/GeneralCreditPolicies/useCancelRequestInProgress";
import { CancelRecord } from "@design/feedback/cancelRecord";
import { EGeneralPolicies } from "@enum/generalPolicies";
import { cancelRequestInProgressModal } from "@config/generalCreditPolicies/requestsInProgressTab/generic/cancelRequestInProgressModal";
import { ICancel } from "@ptypes/generalCredPolicies/ICancel";

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
    useCaseCancel: EGeneralPolicies.USE_CASE_CANCEL_REQUEST,
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
