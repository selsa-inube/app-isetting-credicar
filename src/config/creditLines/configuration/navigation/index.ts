const crumbsConfiguration = (option: string) => {
  return [
    {
      path: "/",
      label: "Inicio",
      id: "home",
      isActive: false,
    },
    {
      path: "/credit-lines",
      label: "Líneas de crédito",
      id: "creditLines",
      isActive: false,
    },
    {
      path: "/credit-lines/edit-credit-lines/line-Names-Descriptions",
      label: `${option} la línea de crédito`,
      id: "configCreditLines",
      isActive: true,
    },
  ];
};
export { crumbsConfiguration };
