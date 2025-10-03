import { EComponentAppearance } from "@enum/appearances";
import { RequestProcess } from "@design/feedback/RequestProcess";
import { RequestStatusModal } from "@design/modals/requestStatusModal";
import { requestProcessMessage } from "@config/creditLines/generic/requestProcessMessage";
import { requestStatusMessage } from "@config/generalCreditPolicies/generic/requestStatusMessage";
import { portalId } from "@config/portalId";
import { IRequestModal } from "@ptypes/creditLines/IRequestModal";

const RequestModal = (props: IRequestModal) => {
  const {
    showRequestProcessModal,
    showRequestStatusModal,
    saveData,
    requestSteps,
    onCloseRequestStatus,
    onCloseProcess,
    onClosePendingModal,
  } = props;
  return (
    <>
      {showRequestProcessModal && (
        <RequestProcess
          portalId={portalId}
          saveData={saveData}
          descriptionRequestProcess={requestProcessMessage}
          descriptionRequestStatus={requestStatusMessage}
          requestProcessSteps={requestSteps}
          appearance={EComponentAppearance.SUCCESS}
          onCloseRequestStatus={onCloseRequestStatus}
          onCloseProcess={onCloseProcess}
        />
      )}
      {showRequestStatusModal && (
        <RequestStatusModal
          portalId={portalId}
          title={requestStatusMessage(saveData.staffName).title}
          description={requestStatusMessage(saveData.staffName).description}
          requestNumber={saveData.requestNumber}
          onClick={onClosePendingModal}
          onCloseModal={onClosePendingModal}
          loading={false}
          actionText={requestStatusMessage(saveData.staffName).actionText}
          appearance={EComponentAppearance.PRIMARY}
        />
      )}
    </>
  );
};

export { RequestModal };
