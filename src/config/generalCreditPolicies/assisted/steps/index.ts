import { IAssistedStep } from "@inubekit/inubekit";

const addGenCredPoliciesSteps: IAssistedStep[] = [
  {
    id: 1,
    number: 1,
    name: "Decisiones generales",
    description: "Descripción decisiones generales.",
  },
  {
    id: 2,
    number: 2,
    name: "# de veces los aportes como cupo total de cartera",
    description: "Número de veces los aportes como cupo total de cartera.",
  },
  {
    id: 3,
    number: 3,
    name: "# de veces los ingresos como cupo total de la cartera",
    description: "Número de veces los ingresos como cupo total de la cartera.",
  },
  {
    id: 4,
    number: 4,
    name: "Modelos de score",
    description: "Modelos de score de riesgo.",
  },
  {
    id: 5,
    number: 5,
    name: "Porcentaje mínimo ingreso",
    description: "Porcentaje mínimo de reserva por la fuente de ingreso.",
  },

  {
    id: 6,
    number: 6,
    name: "Formato de notificación",
    description: "Define qué formato de notificación debe utilizarse.",
  },
  {
    id: 7,
    number: 7,
    name: "Destinatario de la notificación",
    description: "Define quién debe recibir la notificación.",
  },
  {
    id: 8,
    number: 8,
    name: "Puntuación mínima de riesgo de crédito",
    description: "Puntuación mínima de riesgo de la agencia de crédito.",
  },
  {
    id: 9,
    number: 9,
    name: "Canal de notificación",
    description: "Canales que deben utilizarse para enviar la notificación.",
  },
  {
    id: 10,
    number: 10,
    name: "URL de la API de score de riesgo",
    description: "URL de la API de score de riesgo.",
  },

  {
    id: 11,
    number: 11,
    name: "Verificación",
    description: "Confirma la información diligenciada en pasos anteriores.",
  },
];

export { addGenCredPoliciesSteps };
