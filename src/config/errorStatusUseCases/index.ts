const errorStatusUseCases = (useCase: string, option: string) => {
  return {
    status0: "La petición tardó demasiado tiempo.",
    status400: `Al ${useCase} ${option} se ha generó con error. Por favor, verifica la pestaña «En trámite».`,
    status404: `Se registro la solicitud, pero No fue posible ${useCase} ${option}, Por favor, verifica la pestaña «En trámite» para procesar la solicitud`,
    status500: "No se pudo conectar al servidor. Inténtalo más tarde.",
    default: "Ocurrio un error, contacte con su operador.",
  };
};

export { errorStatusUseCases };
