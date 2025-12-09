const errorStatusEvaluateRule = (description?: string) => {
  return {
    status0: "La petición tardó demasiado tiempo.",
    status400: `Al consultar el servicio de evaluacion de reglas se ha generó el error ${description}`,
    status404: `Se ha generó el error ${description}.`,
    status500: "No se pudo conectar al servidor. Inténtalo más tarde.",
    default: "Ocurrio un error, contacte con su operador.",
  };
};

export { errorStatusEvaluateRule };
