import { ECreditLines } from "@enum/creditLines";

const mainOptions = [
  {
    id: "LineNamesAndDescriptions",
    number: 1,
    label: "Nombres y descripción de la línea",
    path: "/credit-lines/edit-credit-lines/line-Names-Descriptions",
  },

  {
    id: "LoanTerm",
    number: 2,
    label: "Plazo",
    path: "/credit-lines/edit-credit-lines/loan-term",
  },
  {
    id: "RepaymentStructure",
    number: 3,
    label: "Métodos de amortización",
    path: "/credit-lines/edit-credit-lines/amortization-methods",
  },
  {
    id: "GeometricGradientRepaymentRate",
    number: 4,
    label: "Tasa de incremento (g)",
    path: "/credit-lines/edit-credit-lines/rate-increase",
  },
  {
    id: "ArithmeticGradientRepaymentValue",
    number: 5,
    label: "Valor de incremento (G)",
    path: "/credit-lines/edit-credit-lines/increment-value",
  },
  {
    id: "ModeOfDisbursementType",
    number: 6,
    label: "Métodos de desembolso",
    path: "/credit-lines/edit-credit-lines/disbursement-methods",
  },
  {
    id: "SuggestedPaymentChannelType",
    number: 7,
    label: "Sugerencia para medio de pago",
    path: "/credit-lines/edit-credit-lines/suggested-payment-channel",
  },
  {
    id: "PercentagePayableViaExtraInstallments",
    number: 8,
    label:
      "Porcentaje del monto solicitado que se puede pagar por cuotas extraordinarias",
    path: "/credit-lines/edit-credit-lines/percentage-requested-amount",
  },
  {
    id: "GracePeriod",
    number: 9,
    label: "Periodo de gracia (dias)",
    path: "/credit-lines/edit-credit-lines/grace-period",
  },
  {
    id: "PaymentChannelTypeForExtraInstallments",
    number: 10,
    label: "Tipo de medio de pago para extras",
    path: "/credit-lines/edit-credit-lines/payment-channel-extraInstallments",
  },
  {
    id: "AdjustmentInterestPaymentType",
    number: 11,
    label: "Tipo de pago de intereses de ajuste al ciclo",
    path: "/credit-lines/edit-credit-lines/adjustment-interest-payment-type",
  },
  {
    id: "LineOfCredit",
    number: 12,
    label: ECreditLines.CREDIT_LINE_STEP,
    path: "/credit-lines/edit-credit-lines/line-credit",
  },
  {
    id: "CreditPlacementChannelsByLine",
    number: 13,
    label: "Canales que permiten colocación de crédito por línea",
    path: "/credit-lines/edit-credit-lines/channels-credit-by-Line",
  },
  {
    id: "LoanAmountLimit",
    number: 14,
    label: "Monto máximo",
    path: "/credit-lines/edit-credit-lines/loan-amount-limit",
  },
  {
    id: "MaximumPremiumPercentageForExtraordinaryInstallmentsCommitments",
    number: 15,
    label: "Porcentaje máximo de la prima para compromisos por prima",
    path: "/credit-lines/edit-credit-lines/maximum-percentage-extraordinary",
  },
  {
    id: "PercentageOfMonthlyCapacityForLimit",
    number: 16,
    label:
      "Porcentaje de la capacidad de pago mensual disponible que se puede usar para calcular el Cupo Máximo",
    path: "/credit-lines/edit-credit-lines/percentage-available-monthly-payment",
  },
  {
    id: "IsExcludedFromLimitAnalysisByPaymentCapacity",
    number: 17,
    label:
      "Líneas de crédito que no se restan para el análisis de cupo por capacidad de pago",
    path: "/credit-lines/edit-credit-lines/lines-not-subtracted-analysis",
  },
  {
    id: "InterestRateType",
    number: 18,
    label: "Tipo de tasa",
    path: "/credit-lines/edit-credit-lines/interest-rate-type",
  },
  {
    id: "InterestRateFixedPoints",
    number: 19,
    label: "Puntos fijos",
    path: "/credit-lines/edit-credit-lines/interest-rate-fixed-points",
  },
  {
    id: "ReferenceRateForFixedPoints",
    number: 20,
    label: "Tasa de referencia para tasas de interés variables",
    path: "/credit-lines/edit-credit-lines/reference-rate-fixed-points",
  },
  {
    id: "CreditRiskPremium",
    number: 21,
    label: "Prima en la tasa de interés por score de riesgo",
    path: "/credit-lines/edit-credit-lines/credit-risk-premium",
  },
  {
    id: "FixedInterestRate",
    number: 22,
    label: "Tasa fija",
    path: "/credit-lines/edit-credit-lines/fixed-interest-rate",
  },
  {
    id: "ChargeMonthlyRateForAdditionalLoanCosts",
    number: 23,
    label: "Tasa de remuneración mensual de otros gastos del crédito",
    path: "/credit-lines/edit-credit-lines/monthly-remuneration-rate-other-expenses",
  },
  {
    id: "ApprovalBoardPositions",
    number: 24,
    label:
      "Cargos de los funcionarios que conforman la instancia de aprobación",
    path: "/credit-lines/edit-credit-lines/approval-board-positions",
  },
  {
    id: "IndicatorForAutomaticManualApproval",
    number: 25,
    label:
      "Indicador que establece si una SC tiene aprobación automática o aprobación manual",
    path: "/credit-lines/edit-credit-lines/indicator-automatic-manual-approval",
  },
  {
    id: "PositionsAuthorizedToApproveOnBehalfOfApprover",
    number: 26,
    label: "Cargos que pueden aprobar en representación de un aprobador",
    path: "/credit-lines/edit-credit-lines/positions-authorized-approve",
  },
  {
    id: "HasAtomaticCollection",
    number: 27,
    label: "La línea de crédito tienen recogida automática",
    path: "/credit-lines/edit-credit-lines/has-atomatic-collection",
  },
  {
    id: "ExclusiveCreditLines",
    number: 28,
    label: "Líneas de crédito excluyentes",
    path: "/credit-lines/edit-credit-lines/exclusive-credit-lines",
  },
  {
    id: "PositionsAuthorizedForExtemporaneousSystemValidationRequirementsApproval",
    number: 29,
    label:
      "Cargos de los funcionarios que están autorizados para la aprobación extemporánea de los requisitos con validación del sistema",
    path: "/credit-lines/edit-credit-lines/positions-authorized-extemporaneous",
  },
  {
    id: "OmittableHumanTasks",
    number: 30,
    label: "Tareas humanas que se pueden omitir",
    path: "/credit-lines/edit-credit-lines/omittable-human-tasks",
  },
  {
    id: "AutomaticCollectionForExclusiveCreditLines",
    number: 31,
    label: "Recoge automáticamente líneas de crédito excluyentes",
    path: "/credit-lines/edit-credit-lines/automatic-collection-exclusive-lines",
  },
  {
    id: "EstimatedDaysForLoanDisbursementProcess",
    number: 32,
    label:
      "Dias estimados que puede tardar el trámite de desembolso de un crédito",
    path: "/credit-lines/edit-credit-lines/estimated-days-loan-disbursement",
  },
  {
    id: "ConsolidationOfOtherCreditProductsAllowed ",
    number: 33,
    label: "Permite recoger otros productos de crédito",
    path: "/credit-lines/edit-credit-lines/allows-collect-other-products",
  },
  {
    id: "FinancialObligationsUpdateRequired",
    number: 34,
    label:
      "Se require la gestión de las obligaciones financieras desde la colocación de un crédito",
    path: "/credit-lines/edit-credit-lines/financial-obligations-update-required",
  },
  {
    id: "GuaranteeRequirements",
    number: 35,
    label: "Listado de garantias requeridas",
    path: "/credit-lines/edit-credit-lines/guarantee-requirements",
  },
  {
    id: "AdditionalBorrowersAllowed",
    number: 36,
    label: "La inclusión de deudores adicionales a un crédito es permitida",
    path: "/credit-lines/edit-credit-lines/additional-borrowers-allowed",
  },
  {
    id: "BondCalculationFactorByAmount",
    number: 37,
    label: "Factor para calculo de fianza respecto al monto",
    path: "/credit-lines/edit-credit-lines/bond-calculation-factor-amount",
  },
  {
    id: "Requirement",
    number: 38,
    label: "Listado de requisitos",
    path: "/credit-lines/edit-credit-lines/requirement",
  },
  {
    id: "CreditLineByRiskProfile",
    number: 39,
    label: "Clientes que soporta la línea",
    path: "/credit-lines/edit-credit-lines/clients-supported",
  },
  {
    id: "HasAutomaticCollection",
    number: 40,
    label: "La línea de crédito tiene recogida automática",
    path: "/credit-lines/edit-credit-lines/has-automatic-collection",
  },
  {
    id: "CustomerAgeRangeRequirement",
    number: 41,
    label: "Requisito: Edad del cliente",
    path: "/credit-lines/edit-credit-lines/customer-age-range",
  },
  {
    id: "MinimumLoanAmountRequirement",
    number: 42,
    label: "Requisito: Monto mínimo",
    path: "/credit-lines/edit-credit-lines/minimum-loan-amount",
  },
  {
    id: "MinimumSeniorityRequirement",
    number: 43,
    label: "Requisito: Antigüedad mínima",
    path: "/credit-lines/edit-credit-lines/minimum-seniority",
  },
  {
    id: "PercentagePaidOfCollectedObligationRequirement",
    number: 44,
    label: "Requisito: Porcentaje pagado de la obligación recogida",
    path: "/credit-lines/edit-credit-lines/percentage-paid-collected",
  },
  {
    id: "NumberOfInstallmentsPaidOnCollectedObligationRequirement",
    number: 45,
    label: "Requisito: Cantidad de cuotas pagadas de una obligación recogida",
    path: "/credit-lines/edit-credit-lines/number-installments-paid-collected",
  },
  {
    id: "MinimumNumberOfMonthsSinceLastDelinquency",
    number: 46,
    label: "Requisito: Tiempo mínimo desde la última mora del crédito recogido",
    path: "/credit-lines/edit-credit-lines/minimum-number-months-delinquency",
  },
  {
    id: "HighestDefaultScoreOfABorrowerLoan",
    number: 47,
    label:
      "Requisito: Calificación máxima de incumplimiento de los créditos de un deudor",
    path: "/credit-lines/edit-credit-lines/highest-default-score-borrower",
  },
  {
    id: "MaximumNumberOfActiveCreditsPerLine",
    number: 48,
    label:
      "Requisito: Cantidad máxima de créditos vigentes por línea de crédito",
    path: "/credit-lines/edit-credit-lines/Maximum-number-active-credits",
  },
  {
    id: "NoControlOrganismInvolvement",
    number: 49,
    label:
      "Requisito: Deudores o codeudores no están en un organismo de control",
    path: "/credit-lines/edit-credit-lines/no-control-organism-involvement",
  },
  {
    id: "SpouseCannotBeCoBorrower",
    number: 50,
    label: "Requisito: Cónyuge no puede ser codeudor",
    path: "/credit-lines/edit-credit-lines/spouse-cannot-coBorrower",
  },
  {
    id: "MinimumInstallmentAmount",
    number: 51,
    label: "Requisito: Cuota mínima permitida",
    path: "/credit-lines/edit-credit-lines/minimum-installment-amount",
  },
  {
    id: "MaximumNumberOfDaysInDelinquencyAllowed",
    number: 52,
    label: "Requisito: Cantidad máxima de días en mora",
    path: "/credit-lines/edit-credit-lines/maximum-number-days-delinquency",
  },
  {
    id: "MaximumNumberOfDelinquenciesInThePastYear",
    number: 53,
    label: "Requisito: Cantidad máxima de veces en mora en el último año",
    path: "/credit-lines/edit-credit-lines/maximum-number-delinquencies-in-past-year",
  },
  {
    id: "MaximumOverdraftValueAllowed",
    number: 54,
    label: "Requisito: Descubierto máximo",
    path: "/credit-lines/edit-credit-lines/maximum-overdraft-value-allowed",
  },
  {
    id: "MaximumOverdraftToTotalDebtRatio",
    number: 55,
    label: "Requisito: Máxima razón Descubierto - Deuda total",
    path: "/credit-lines/edit-credit-lines/maximum-overdraft-total-debt-ratio",
  },
  {
    id: "CreditLimitIsNotExceeded",
    number: 56,
    label: "Requisito: No usar más del cupo disponible",
    path: "/credit-lines/edit-credit-lines/credit-limit-is-not-exceeded",
  },
  {
    id: "IncrementFrequency",
    number: 57,
    label: "Perodicidad de incremento",
    path: "/credit-lines/edit-credit-lines/increment-frequency",
  },
];

export { mainOptions };
