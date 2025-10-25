const errorStatusEvaluateRule = {
  status0: "La petición tardó demasiado tiempo.",
  status400: `No fue posible consultar el servicio de evaluacion de reglas se ha generó un error.`,
  status404: `No fue posible consultar el servicio de evaluacion de reglas. Es posible que el recurso no exista o haya sido eliminado.`,
  status500: "No se pudo conectar al servidor. Inténtalo más tarde.",
  default: "Ocurrio un error, contacte con su operador.",
};

export { errorStatusEvaluateRule };
