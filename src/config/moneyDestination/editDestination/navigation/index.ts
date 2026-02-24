const crumbsEditDestination = (optionInProgress: boolean) => {
  return [
    {
      path: "/",
      label: "Inicio",
      id: "home",
      isActive: false,
    },
    {
      path: "/money-destination",
      label: "Destinos de dinero",
      id: "moneyDestination",
      isActive: false,
    },
    {
      path: "/money-destination/edit-destination",
      label: optionInProgress ? "Editar solicitud" : "Editar destino",
      id: "editDestination",
      isActive: true,
    },
  ];
};

export { crumbsEditDestination };
