import { useContext } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useCancelRequestInProgress } from "@hooks/GeneralCreditPolicies/useCancelRequestInProgress";
import { CancelRecord } from "@design/feedback/cancelRecord";
import { EGeneralPolicies } from "@enum/generalPolicies";
import { ICancel } from "@ptypes/generalCredPolicies/ICancel";

const Cancel = (props: ICancel) => {
  const { data, setEntryCanceled } = props;
  const { appData } = useContext(AuthAndPortalData);

  const { loading, modalData, showDecision, handleToggleModal } =
    useCancelRequestInProgress({
      useCaseCancel: EGeneralPolicies.USE_CASE_CANCEL_REQUEST,
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
