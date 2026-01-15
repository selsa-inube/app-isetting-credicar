import { useContext } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useCancelRequestInProgress } from "@hooks/payrollAgreement/useCancelRequestInProgress";
import { CancelRecord } from "@design/feedback/cancelRecord";
import { EPayrollAgreement } from "@enum/payrollAgreement";
import { ICancel } from "@ptypes/payrollAgreement/requestInProgTab/ICancel";

const Cancel = (props: ICancel) => {
  const { data, setEntryCanceled } = props;
  const { appData } = useContext(AuthAndPortalData);

  const { loading, modalData, showDecision, handleToggleModal } =
    useCancelRequestInProgress({
      useCaseCancel: EPayrollAgreement.USE_CASE_CANCEL_REQUEST,
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
