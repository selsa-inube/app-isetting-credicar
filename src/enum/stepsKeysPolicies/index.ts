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
  VERIFICATION: stepKeyByNamePolicies["Verificación"],
};

export { stepKeysPolicies };
