const crumbsEditGenCredPolicies = (
  option: string,
  id: string,
  requestNumber: string,
) => {
  return [
    {
      path: "/",
      label: "Inicio",
      id: "home",
      isActive: false,
    },
    {
      path: "/general-credit-policies",
      label: "Políticas generales de crédito",
      id: "generalCreditPolicies",
      isActive: false,
    },

    {
      path: `/general-credit-policies/edit-general-credit-policies/${option}/${id}/${requestNumber}`,
      label: "Editar solicitud",
      id: "editGenCredPolicies",
      isActive: true,
    },
  ];
};
export { crumbsEditGenCredPolicies };
