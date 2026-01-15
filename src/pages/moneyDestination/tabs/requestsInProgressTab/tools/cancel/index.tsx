import { useContext } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useCancelRequestInProgress } from "@hooks/moneyDestination/useCancelRequestInProgress";
import { CancelRecord } from "@design/feedback/cancelRecord";
import { EMoneyDestination } from "@enum/moneyDestination";
import { ICancel } from "@ptypes/moneyDestination/tabs/ICancel";

const Cancel = (props: ICancel) => {
  const { data, setEntryCanceled } = props;
  const { appData } = useContext(AuthAndPortalData);

  const { showDecision, loading, modalData, handleToggleModal } =
    useCancelRequestInProgress({
      useCaseCancel: EMoneyDestination.USE_CASE_CANCEL_REQUEST,
      businessUnit: appData.businessUnit.publicCode,
      data,
      userAccount: appData.user.userAccount,
      setEntryCanceled,
      token: appData.token,
    });

  return (
    <CancelRecord
      modalData={modalData}
      showModal={showDecision}
      onToggleModal={handleToggleModal}
      loading={loading}
    />
  );
};

export { Cancel };
