const deletedAlertModal = (typePayroll: string) => {
  return {
    title: "Alerta",
    description: `Debido a que esta es una nómina de convenio de ${typePayroll}, es necesario al menos 1 ciclo de pago.`,
    actionText: "Entendido",
    moreDetails: "No puedes eliminar el único ciclo de pago existente.",
  };
};

export { deletedAlertModal };
