import { useContext } from "react";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useSavePayrollAgreement } from "@hooks/payrollAgreement/useSavePayrollAgreement";
import { useDeletePayroll } from "@hooks/payrollAgreement/useDeletePayroll";
import { RequestProcess } from "@design/feedback/RequestProcess";
import { DeleteRecord } from "@design/feedback/DeleteRecord";
import { RequestStatusModal } from "@design/modals/requestStatusModal";
import { EUseCase } from "@enum/useCase";
import { EComponentAppearance } from "@enum/appearances";
import { deletePayrollAgreModal } from "@config/payrollAgreement/payrollAgreementTab/generic/deletePayrollAgreModal";
import { requestProcessMessage } from "@config/payrollAgreement/payrollAgreementTab/generic/requestProcessMessage";
import { requestStatusMessage } from "@config/payrollAgreement/payrollAgreementTab/generic/requestStatusMessage";
import { portalId } from "@config/portalId";
import { IDelete } from "@ptypes/payrollAgreement/IDelete";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";

const Delete = (props: IDelete) => {
  const { data, setEntryDeleted } = props;
  const { appData } = useContext(AuthAndPortalData);

  const {
    showModal,
    saveData,
    showRequestProcessModal,
    showInfoModal,
    handleToggleInfoModal,
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
    handleCloseProcess,
    handleClosePendingReqModal,
  } = useSavePayrollAgreement({
    useCase: EUseCase.DELETE,
    businessUnits: appData.businessUnit.publicCode,
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
        showInfoModal={showInfoModal}
        onToggleInfoModal={handleToggleInfoModal}
      />
      {showRequestProcess && (
        <RequestProcess
          portalId={portalId}
          saveData={savePayrollAgreement}
          descriptionRequestProcess={requestProcessMessage}
          descriptionRequestStatus={requestStatusMessage}
          requestProcessSteps={requestSteps}
          appearance={EComponentAppearance.SUCCESS}
          onCloseRequestStatus={handleCloseRequestStatus}
          onCloseProcess={handleCloseProcess}
        />
      )}
      {showRequestStatus && (
        <RequestStatusModal
          portalId={portalId}
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
          appearance={EComponentAppearance.PRIMARY}
        />
      )}
    </>
  );
};

export { Delete };
