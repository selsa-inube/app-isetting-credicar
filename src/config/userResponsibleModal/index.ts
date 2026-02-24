const userResponsibleModal = (typeAdd: boolean) => {
  return {
    title: "información",
    subtitle: "¿Por qué está inhabilitado?",
    description: typeAdd
      ? "La solicitud solo puede ser modificada por el usuario que la registro o el responsable de la solicitud."
      : "Esta opción solo esta habilitada para las solicitudes de registro",
    actionText: "Entendido",
  };
};
export { userResponsibleModal };
