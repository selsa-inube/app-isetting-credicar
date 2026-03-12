const crumbsEditPayrollAgreement = (optionInProgress: boolean) => {
  return [
    {
      path: "/",
      label: "Inicio",
      id: "home",
      isActive: false,
    },
    {
      path: "/payroll-agreement",
      label: "Nóminas de convenio",
      id: "payrollAgreement",
      isActive: false,
    },
    {
      path: "/payroll-agreement/edit-payroll",
      label: optionInProgress
        ? "Editar solicitud"
        : "Editar nómina de convenio",
      id: "EditPayrollPayrollAgreement",
      isActive: true,
    },
  ];
};
export { crumbsEditPayrollAgreement };
