import { stepKeyByNamePolicies } from "@utils/stepKeyByNamePolicies";

const stepKeysPolicies = {
  DECISIONS_GENERAL: stepKeyByNamePolicies["Decisiones generales"],
  CONTRIBUTIONS_PORTFOLIO:
    stepKeyByNamePolicies["# de veces los aportes como cupo total de cartera"],
  INCOME_PORTFOLIO:
    stepKeyByNamePolicies[
      "# de veces los ingresos como cupo total de la cartera"
    ],
  SCORE_MODELS: stepKeyByNamePolicies["Modelos de score"],
  MINIMUM_INCOME_PERCENTAGE: stepKeyByNamePolicies["Porcentaje mínimo ingreso"],
  BASIC_NOTIFICATION_FORMAT: stepKeyByNamePolicies["Formato de notificación"],
  BASIC_NOTIFICATION_RECIPIENT:
    stepKeyByNamePolicies["Destinatario de la notificación"],
  MINIMUM_CREDIT_BUREAU_RISKSCORE:
    stepKeyByNamePolicies["Puntuación mínima de riesgo de crédito"],
  NOTIFICATION_CHANNEL: stepKeyByNamePolicies["Canal de notificación"],
  RISKSCORE_API_URL: stepKeyByNamePolicies["URL de la API de score de riesgo"],
  VERIFICATION: stepKeyByNamePolicies["Verificación"],
};

export { stepKeysPolicies };
