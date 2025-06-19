enum RequestStatus {
  RequestProcessed = "RequestProcessed",
  RequestCanceled = "RequestCanceled",
  RequestProcessedWithError = "RequestProcessedWithError",
  PendingApproval = "PendingApproval",
  InTheProcessOfValidation = "InTheProcessOfValidation",
  InTheProcessOfComplementationAndValidation = "InTheProcessOfComplementationAndValidation",
  ProcessingRequest = "ProcessingRequest",
  RejectedRequest = "RejectedRequest",
  RequestReadyToProcess = "RequestReadyToProcess",
  RequestPendingProcessing = "RequestPendingProcessing",
}

export { RequestStatus };
