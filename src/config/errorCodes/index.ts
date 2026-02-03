import { IDetailsErrors } from "@ptypes/IDetailsErrors";

const errorCodes: Record<number, IDetailsErrors> = {
  400: {
    descriptionError: [
      "La solicitud no se pudo procesar debido a datos inválidos.",
      "Asegúrate de que los datos enviados sean correctos.",
    ],
    solutionError: [
      "Revisa los datos que enviaste y asegúrate de que sean correctos.",
      "Intenta nuevamente con datos válidos.",
    ],
  },
  401: {
    descriptionError: [
      "No tienes permisos para acceder a este recurso.",
      "Tu sesión puede haber expirado.",
    ],
    solutionError: [
      "Inicia sesión con una cuenta válida.",
      "Si el problema persiste, contacta a soporte.",
    ],
  },
  403: {
    descriptionError: [
      "Acceso denegado a la página solicitada.",
      "Puede que no tengas los privilegios necesarios.",
    ],
    solutionError: [
      "Contacta al administrador si crees que esto es un error.",
      "Verifica tus permisos de acceso.",
    ],
  },
  404: {
    descriptionError: [
      "La URL solicitada no se encontró en el servidor.",
      "Puede que la página haya sido eliminada o movida.",
    ],
    solutionError: [
      "Verifica la URL o vuelve a la página principal.",
      "Usa el menú de navegación para encontrar lo que buscas.",
    ],
  },
  500: {
    descriptionError: [
      "Ocurrió un problema en el servidor.",
      "Puede que haya un error temporal en el sistema.",
    ],
    solutionError: [
      "Verifica tu conexión a Internet",
      "Intenta nuevamente más tarde o contacta a soporte.",
    ],
  },
  1000: {
    descriptionError: [
      "El codigo del portal esta vacio",
      "El codigo del portal de la URL no es valido",
    ],
    solutionError: ["Confirma que estés usando la url adecuada."],
  },
  1001: {
    descriptionError: [
      " NO tiene los privilegios requeridos para acceder al portal.",
      "No estás registrado(a) o las atribuciones utilizadas no corresponden con las registradas.",
    ],
    solutionError: ["Confirma que estés usando la url adecuada."],
  },
  1002: {
    descriptionError: ["El codigo del portal es invalido."],
    solutionError: ["Confirma que estés usando la url adecuada."],
  },
  1003: {
    descriptionError: [
      "No hay una unidad de negocio relacionada con el codigo del portal.",
    ],
    solutionError: ["Confirma que estés usando la url adecuada."],
  },
  1004: {
    descriptionError: ["Su usuario no tiene unidades de negocio relacionados."],
    solutionError: ["Consulta con tu operador."],
  },
  1005: {
    descriptionError: ["No se encuentra disponible la página."],
    solutionError: [
      "Confirma que estés usando la url adecuada.",
      "Puede que no tengas los privilegios necesarios.",
      "Intenta nuevamente más tarde.",
    ],
  },
  1006: {
    descriptionError: ["Datos no disponibles."],
    solutionError: [
      "Intenta nuevamente más tarde.",
      "Consulta con tu operador.",
    ],
  },
  1009: {
    descriptionError: ["Error en el proceso de autenticación."],
    solutionError: ["Consulta con tu operador."],
  },
};

export { errorCodes };
