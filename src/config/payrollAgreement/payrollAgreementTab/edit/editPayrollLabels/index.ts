const editPayrollLabels = (optionProcess: boolean) => {
  return {
    title: optionProcess
      ? "Editar solicitud nómina de convenio"
      : "Editar nómina de convenio",
    description: optionProcess
      ? "Edita información de solicitud para la creación de nómina de convenio."
      : "Edita nómina de convenio.",
  };
};

export { editPayrollLabels };
