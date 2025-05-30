import { useContext } from "react";

import { DeleteRecord } from "@design/feedback/DeleteRecord";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { ComponentAppearance } from "@enum/appearances";
import { RequestStatusModal } from "@design/modals/requestStatusModal";
import { RequestProcess } from "@design/feedback/RequestProcess";
import { useSavePayrollAgreement } from "@hooks/payrollAgreement/useSavePayrollAgreement";
import { deletePayrollAgreModal } from "@config/payrollAgreement/payrollAgreementTab/generic/deletePayrollAgreModal";
import { useDeletePayroll } from "@hooks/payrollAgreement/useDeletePayroll";
import { IDelete } from "@ptypes/payrollAgreement/IDelete";
import { requestProcessMessage } from "@config/payrollAgreement/payrollAgreementTab/generic/requestProcessMessage";
import { requestStatusMessage } from "@config/payrollAgreement/payrollAgreementTab/generic/requestStatusMessage";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { UseCase } from "@enum/useCase";

const Delete = (props: IDelete) => {
  const { data, setEntryDeleted } = props;
  const { appData } = useContext(AuthAndPortalData);

  const {
    showModal,
    saveData,
    showRequestProcessModal,
    handleToggleModal,
    handleClick,
    setShowRequestProcessModal,
    setShowModal,
    setShowPendingReq,
  } = useDeletePayroll({ data, appData });

  const {
    savePayrollAgreement,
    requestSteps,
    loadingSendData,
    showRequestProcess,
    showRequestStatus,
    handleCloseRequestStatus,
    handleClosePendingReqModal,
  } = useSavePayrollAgreement({
    useCase: UseCase.DELETE,
    bussinesUnits: appData.businessUnit.publicCode,
    userAccount: appData.user.userAccount,
    sendData: showRequestProcessModal,
    data: saveData as ISaveDataRequest,
    setSendData: setShowRequestProcessModal,
    setShowModal,
    setShowPendingReq,
    setEntryDeleted,
  });

  return (
    <>
      <DeleteRecord
        messageDelete={deletePayrollAgreModal}
        showModal={showModal}
        onToggleModal={handleToggleModal}
        onClick={handleClick}
        loading={loadingSendData}
      />
      {showRequestProcess && (
        <RequestProcess
          portalId="portal"
          saveData={savePayrollAgreement}
          descriptionRequestProcess={requestProcessMessage}
          descriptionRequestStatus={requestStatusMessage}
          requestProcessSteps={requestSteps}
          appearance={ComponentAppearance.SUCCESS}
          onCloseRequestStatus={handleCloseRequestStatus}
        />
      )}
      {showRequestStatus && (
        <RequestStatusModal
          portalId="portal"
          title={requestStatusMessage(savePayrollAgreement?.staffName).title}
          description={
            requestStatusMessage(savePayrollAgreement?.staffName).description
          }
          requestNumber={savePayrollAgreement?.requestNumber ?? ""}
          onClick={handleClosePendingReqModal}
          onCloseModal={handleClosePendingReqModal}
          loading={false}
          actionText={
            requestStatusMessage(savePayrollAgreement?.staffName).actionText
          }
          appearance={ComponentAppearance.PRIMARY}
        />
      )}
    </>
  );
};

export { Delete };
