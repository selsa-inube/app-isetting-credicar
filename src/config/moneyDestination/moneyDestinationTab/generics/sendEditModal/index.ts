const sendEditedModal = (optionInProcess: boolean, request?: string) => {
  return {
    title: "Enviar",
    description: optionInProcess
      ? `Se actualizara la información de la solicitud número ${request} ¿Realmente quieres continuar con los cambios realizados?.`
      : "Se enviará la solicitud de edición. ¿Realmente quieres continuar con los cambios realizados?.",
    actionText: "Confirmar",
  };
};

export { sendEditedModal };
