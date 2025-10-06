const requestStatus: Record<string, string> = {
  RequestProcessed: "Procesada",
  RequestCanceled: "Cancelada",
  RequestProcessedWithError: "procesada con error",
  PendingApproval: "Pendiente aprobación",
  InTheProcessOfValidation: "En proceso validación",
  InTheProcessComplementationValidation:
    "En proceso complementación y validación",
  ProcessingRequest: "Procesando solicitud",
  RequestInProgress: "Procesando solicitud",
  RejectedRequest: "Rechazada",
  RequestReadyToProcess: "Lista para procesar",
  RequestPendingProcessing: "Pendiente procesamiento",
};

export { requestStatus };
