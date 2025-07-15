const requestStatus: Record<string, string> = {
  RequestProcessed: "Solicitud procesada",
  RequestCanceled: "Solicitud cancelada",
  RequestProcessedWithError: "Solicitud procesada con error",
  PendingApproval: "Pendiente de aprobación",
  InTheProcessOfValidation: "En proceso de validación",
  InTheProcessComplementationValidation:
    "En proceso de complementación y validación",
  ProcessingRequest: "Procesando solicitud",
  RejectedRequest: "Solicitud rechazada",
  RequestReadyToProcess: "Solicitud lista para procesar",
  RequestPendingProcessing: "Solicitud pendiente de procesamiento",
};

export { requestStatus };
