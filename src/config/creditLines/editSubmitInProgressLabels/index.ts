const editSubmitInProgressLabels = (numberRequest: string) => {
  return {
    title: "Confirmación de envío",
    description: ` Se actualizara la información de la solicitud número ${numberRequest} ¿Realmente quieres continuar con los cambios realizados?.`,
  };
};

export { editSubmitInProgressLabels };
