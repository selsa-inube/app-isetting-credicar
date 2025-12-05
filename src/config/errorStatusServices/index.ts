const errorStatusServices = (description: string) => {
  return {
    status0: "La petición tardó demasiado tiempo. Inténtalo más tarde.",
    status400: description
      ? `Se genero el error: ${description}`
      : "Error al consultar el servicio, contiene datos inválidos. Por favor contacta con tu operador.",
    status404: description
      ? `Se genero el error: ${description}`
      : "Error al consultar el servicio. Por favor contacta con tu operador.",
    status500: "No se pudo conectar al servidor. Inténtalo más tarde.",
    default: "Error con la conexión, por favor contacta a tu operador.",
  };
};

export { errorStatusServices };
