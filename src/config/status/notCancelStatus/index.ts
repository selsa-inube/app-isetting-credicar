import { RequestStatus } from "@enum/requestStatus";

const notCancelStatus = [
  RequestStatus.RequestCanceled,
  RequestStatus.RequestProcessedWithError,
  RequestStatus.RejectedRequest,
  RequestStatus.RequestProcessed,
  RequestStatus.ProcessingRequest,
  RequestStatus.RequestReadyToProcess,
];

export { notCancelStatus };
