enum ERequestStatus {
  REQUEST_PROCESSED = "RequestProcessed",
  REQUEST_CANCELED = "RequestCanceled",
  REQUEST_PROCESSED_WITH_ERROR = "RequestProcessedWithError",
  PENDING_APPROVAL = "PendingApproval ",
  IN_THE_PROCESS_OF_VALIDATION = "InTheProcessOfValidation",
  IN_THE_PROCESS_COMPLEMENTATION_VALIDATION = " InTheProcessComplementationValidation",
  PROCESSING_REQUEST = "ProcessingRequest",
  REJECTED_REQUEST = "RejectedRequest",
  REQUEST_READY_TO_PROCESS = "RequestReadyToProcess",
  REQUEST_IN_PROCESS = "RequestInProgress",
}

export { ERequestStatus };
