import { useContext } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useCancelRequestInProgress } from "@hooks/creditLine/useCancelRequestInProgress";
import { ECreditLines } from "@enum/creditLines";
import { CancelRecord } from "@design/feedback/cancelRecord";
import { ICancel } from "@ptypes/creditLines/ICancel";

const Cancel = (props: ICancel) => {
  const { data, setEntryCanceled } = props;
  const { appData } = useContext(AuthAndPortalData);

  const { loading, modalData, showDecision, handleToggleModal } =
    useCancelRequestInProgress({
      useCaseCancel: ECreditLines.USE_CASE_CANCEL_REQUEST,
      businessUnit: appData.businessUnit.publicCode,
      data,
      userAccount: appData.user.userAccount,
      setEntryCanceled,
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
