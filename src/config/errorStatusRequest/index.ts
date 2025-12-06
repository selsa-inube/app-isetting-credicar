const errorStatusRequest = (description?: string) => {
  return {
    status0: "La petición tardó demasiado tiempo.",
    status400: description
      ? `Se ha generó el error: ${description} `
      : "No fue posible registrar la solicitud.",
    status404: description
      ? `Se ha generó el error: ${description} `
      : "No fue posible procesar su solicitud en este momento",
    status500: "No se pudo conectar al servidor. Inténtalo más tarde.",
    default:
      "Ocurrio un error en el registro de la solicitud, contacte con su operador",
  };
};

export { errorStatusRequest };
