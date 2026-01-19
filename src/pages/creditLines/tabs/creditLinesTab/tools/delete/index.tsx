import { useContext } from "react";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useModalDeleteCreditLine } from "@hooks/creditLine/delete/useModalDelete";
import { useDeleteCreditLine } from "@hooks/creditLine/delete/useDeleteCreditLine";
import { useSaveCreditlinesTab } from "@hooks/creditLine/saveCreditLineTab/useSaveCreditlines";
import { DeleteRecord } from "@design/feedback/DeleteRecord";
import { RequestProcess } from "@design/feedback/RequestProcess";
import { RequestStatusModal } from "@design/modals/requestStatusModal";
import { EUseCase } from "@enum/useCase";
import { EComponentAppearance } from "@enum/appearances";
import { portalId } from "@config/portalId";
import { requestStatusMessage } from "@config/generalCreditPolicies/generic/requestStatusMessage";
import { requestProcessMessage } from "@config/creditLines/generic/requestProcessMessage";
import { IDelete } from "@ptypes/hooks/creditLines/IDelete";
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
  } = useDeleteCreditLine({ data, appData });

  const {
    saveCreditLines,
    requestSteps,
    loadingSendData,
    showRequestProcess,
    showRequestStatus,
    hasError,
    errorData,
    networkError,
    errorFetchRequest,
    handleToggleErrorModal,
    handleCloseRequestStatus,
    handleCloseProcess,
    handleClosePendingModal,
  } = useSaveCreditlinesTab({
    useCase: EUseCase.DELETE,
    businessUnits: appData.businessUnit.publicCode,
    userAccount: appData.user.userAccount,
    sendData: showRequestProcessModal,
    data: saveData as ISaveDataRequest,
    setSendData: setShowRequestProcessModal,
    setShowModal,
    setShowPendingReq,
    setEntryDeleted,
    token: appData.token,
    setShowUnconfiguredModal: () => {
      return false;
    },
  });

  const { modalData, showDecision } = useModalDeleteCreditLine({
    loading: loadingSendData,
    showInfoModal,
    showModal,
    hasError,
    errorData,
    networkError,
    errorFetchRequest,
    handleToggleErrorModal,
    handleToggleInfoModal,
    handleClick,
    handleToggleModal,
  });

  return (
    <>
      <DeleteRecord
        modalData={modalData}
        showDecision={showDecision}
        onToggleModal={handleToggleModal}
        loading={false}
      />

      {showRequestProcess && (
        <RequestProcess
          portalId={portalId}
          saveData={saveCreditLines}
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
          title={requestStatusMessage(saveCreditLines?.staffName).title}
          description={
            requestStatusMessage(saveCreditLines?.staffName).description
          }
          requestNumber={saveCreditLines?.requestNumber ?? ""}
          onClick={handleClosePendingModal}
          onCloseModal={handleClosePendingModal}
          loading={false}
          actionText={
            requestStatusMessage(saveCreditLines?.staffName).actionText
          }
          appearance={EComponentAppearance.PRIMARY}
        />
      )}
    </>
  );
};

export { Delete };
