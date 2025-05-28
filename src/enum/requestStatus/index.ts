enum RequestStatus {
  RequestProcessed = "Solicitud procesada",
  RequestCanceled = "Solicitud cancelada",
  RequestProcessedWithError = "Solicitud procesada con error",
  PendingApproval = "Pendiente de aprobación",
  InTheProcessOfValidation = "En proceso de validación",
  InTheProcessOfComplementationAndValidation = "En proceso de complementación y validación",
  ProcessingRequest = "Procesando solicitud",
  RejectedRequest = "Solicitud rechazada",
  RequestPendingProcessing = "Solicitud pendiente de procesamiento",
}

export { RequestStatus };
