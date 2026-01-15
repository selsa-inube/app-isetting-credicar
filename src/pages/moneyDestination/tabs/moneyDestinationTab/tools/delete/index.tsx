import { useContext } from "react";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useDeleteDestination } from "@hooks/moneyDestination/delete/useDeleteDestination";
import { useSaveMoneyDestination } from "@hooks/moneyDestination/useSaveMoneyDestination";
import { useModalDeleteDestination } from "@hooks/moneyDestination/delete/useModalDeleteDestination";
import { EUseCase } from "@enum/useCase";
import { EComponentAppearance } from "@enum/appearances";
import { RequestStatusModal } from "@design/modals/requestStatusModal";
import { RequestProcess } from "@design/feedback/RequestProcess";
import { DeleteRecord } from "@design/feedback/DeleteRecord";
import { portalId } from "@config/portalId";
import { requestProcessMessage } from "@config/moneyDestination/moneyDestinationTab/generics/requestProcessMessage";
import { requestStatusMessage } from "@config/moneyDestination/moneyDestinationTab/generics/requestStatusMessage";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { IDelete } from "@ptypes/moneyDestination/tabs/IDelete";

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
  } = useDeleteDestination({ data, appData });

  const {
    saveMoneyDestination,
    requestSteps,
    showPendingReqModal,
    loadingSendData,
    hasError,
    errorData,
    networkError,
    errorFetchRequest,
    handleToggleErrorModal,
    handleCloseRequestStatus,
    handleCloseProcess,
    handleClosePendingReqModal,
  } = useSaveMoneyDestination({
    useCase: EUseCase.DELETE,
    businessUnits: appData.businessUnit.publicCode,
    userAccount: appData.user.userAccount,
    sendData: showRequestProcessModal,
    data: saveData as ISaveDataRequest,
    setSendData: setShowRequestProcessModal,
    setShowModal,
    setEntryDeleted,
    token: appData.token,
  });

  const { modalData, showDecision } = useModalDeleteDestination({
    loading: loadingSendData,
    hasError,
    errorData,
    networkError,
    errorFetchRequest,
    showInfoModal,
    showModal,
    handleToggleInfoModal,
    handleClick,
    handleToggleModal,
    handleToggleErrorModal,
  });

  const showRequestProcess = showRequestProcessModal && saveMoneyDestination;

  const showRequestStatus =
    showPendingReqModal && saveMoneyDestination?.requestNumber;

  return (
    <>
      <DeleteRecord
        modalData={modalData}
        showDecision={showDecision}
        onToggleModal={handleToggleModal}
        loading={loadingSendData}
      />
      {showRequestProcess && (
        <RequestProcess
          portalId={portalId}
          saveData={saveMoneyDestination}
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
          title={requestStatusMessage(saveMoneyDestination.staffName).title}
          description={
            requestStatusMessage(saveMoneyDestination.staffName).description
          }
          requestNumber={saveMoneyDestination.requestNumber}
          onClick={handleClosePendingReqModal}
          onCloseModal={handleClosePendingReqModal}
          loading={false}
          actionText={
            requestStatusMessage(saveMoneyDestination.staffName).actionText
          }
          appearance={EComponentAppearance.PRIMARY}
        />
      )}
    </>
  );
};

export { Delete };
