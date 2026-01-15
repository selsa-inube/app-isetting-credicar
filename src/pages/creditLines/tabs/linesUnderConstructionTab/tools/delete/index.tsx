import { useContext } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useCancelRequestInProgress } from "@hooks/creditLine/useCancelRequestInProgress";
import { DeleteRecord } from "@design/feedback/DeleteRecord";
import { ECreditLines } from "@enum/creditLines";
import { ICancel } from "@ptypes/creditLines/ICancel";

const Delete = (props: ICancel) => {
  const { data, setEntryCanceled } = props;
  const { appData } = useContext(AuthAndPortalData);

  const { loading, modalData, showDecision, handleToggleModal } =
    useCancelRequestInProgress({
      useCaseCancel: ECreditLines.USE_CASE_CANCEL_REQUEST,
      businessUnit: appData.businessUnit.publicCode,
      data,
      userAccount: appData.user.userAccount,
      setEntryCanceled,
      inConstruction: true,
      token: appData.token,
    });

  return (
    <DeleteRecord
      modalData={modalData}
      showDecision={showDecision}
      onToggleModal={handleToggleModal}
      loading={loading}
    />
  );
};

export { Delete };
