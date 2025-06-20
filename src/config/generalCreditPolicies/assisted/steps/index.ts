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
    description: "Numero de veces los ingresos como cupo total de la cartera.",
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
    name: "Verificación",
    description: "Confirma la información diligenciada en pasos anteriores.",
  },
];

export { addGenCredPoliciesSteps };
