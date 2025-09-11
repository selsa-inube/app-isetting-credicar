const errorStatusRequest = {
  status0: "La petición tardó demasiado tiempo.",
  status400: "No fue posible registrar la solicitud, contacte con su operador.",
  status404:
    "Hemos presentado problemas con el registro de la solicitud, contacte con su operador",
  status500: "No se pudo conectar al servidor. Inténtalo más tarde.",
  default:
    "Ocurrio un error en el registro de la solicitud, contacte con su operador",
};

export { errorStatusRequest };
