import { ERequestStatus } from "@enum/requestStatus";

const notCancelStatus = [
  ERequestStatus.REQUEST_CANCELED,
  ERequestStatus.REQUEST_PROCESSED_WITH_ERROR,
  ERequestStatus.REJECTED_REQUEST,
  ERequestStatus.REQUEST_PROCESSED,
  ERequestStatus.PROCESSING_REQUEST,
  ERequestStatus.REQUEST_READY_TO_PROCESS,
];

export { notCancelStatus };
