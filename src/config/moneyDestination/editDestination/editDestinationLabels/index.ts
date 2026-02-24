const editDestinationLabels = (optionProcess: boolean) => {
  return {
    title: optionProcess
      ? "Editar solicitud destino de dinero"
      : "Editar destinos de dinero",
    description: optionProcess
      ? "Edita información de solicitud para la creación de destino de dinero"
      : "Edita destinos de dinero",
    addLineCredit: "Agregar línea de crédito",
    messageEmptyDecisions: "Agrega línea de crédito",
    labelBusinessRules: "LineOfCredit",
  };
};

export { editDestinationLabels };
