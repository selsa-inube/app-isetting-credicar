const errorStatusServices = {
  status0: "La petición tardó demasiado tiempo. Inténtalo más tarde.",
  status400:
    "Error al consultar el servicio, contiene datos inválidos. Por favor contacta a tu operador.",
  status404:
    "Error al consultar el servicio. Por favor contacta a tu operador.",
  status500: "No se pudo conectar al servidor. Inténtalo más tarde.",
  default: "Error con la conexión, por favor contacta a tu operador.",
};

export { errorStatusServices };
