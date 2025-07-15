enum ERequestStatus {
  REQUEST_PROCESSED = "Solicitud procesada",
  REQUEST_CANCELED = "Solicitud cancelada",
  REQUEST_PROCESSED_WITH_ERROR = "Solicitud procesada con error",
  PENDING_APPROVAL = "Pendiente de aprobación",
  IN_THE_PROCESS_OF_VALIDATION = "En proceso de validación",
  IN_THE_PROCESS_COMPLEMENTATION_VALIDATION = "En proceso de complementación y validación",
  PROCESSING_REQUEST = "Procesando solicitud",
  REJECTED_REQUEST = "Solicitud rechazada",
  REQUEST_READY_TO_PROCESS = "Solicitud lista para procesar",
  REQUEST_PENDING_PROCESSING = "Solicitud pendiente de procesamiento",
}

export { ERequestStatus };
