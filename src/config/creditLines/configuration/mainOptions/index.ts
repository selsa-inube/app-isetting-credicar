import { toLinksArray } from "@utils/toLinksArray";

const options = {
  lineNamesAndDescriptions: {},
  lineNames: {
    links: {
      namesAndDescriptions: {
        id: "lineNamesAndDescriptions",
        number: 1,
        label: "Nombres y descripción de la línea",
        description:
          "En este paso encontraras la información principal que permite identificar la línea de crédito, además de una breve descripción de uso.",
        path: "/credit-lines/edit-credit-lines/line-Names-Descriptions",
      },
    },
  },
  AmortizationCollectionDebt: {
    links: {
      loanTerm: {
        id: "loanTerm",
        number: 2,
        label: "Plazo",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/loan-term",
      },
      repaymentStructure: {
        id: "repaymentStructure",
        number: 3,
        label: "Métodos de amortización",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/amortization-methods",
      },
      geometricGradientRepaymentRate: {
        id: "geometricGradientRepaymentRate",
        number: 4,
        label: "Tasa de incremento (g)",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/rate-increase",
      },
      arithmeticGradientRepaymentValue: {
        id: "arithmeticGradientRepaymentValue",
        number: 5,
        label: "Valor de incremento (G)",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/increment-value",
      },
      modeOfDisbursementType: {
        id: "modeOfDisbursementType",
        number: 6,
        label: "Métodos de desembolso",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/disbursement-methods",
      },
      suggestedPaymentChannelType: {
        id: "suggestedPaymentChannelType",
        number: 7,
        label: "Sugerencia para medio de pago",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/suggested-payment-channel",
      },
      percentagePayableViaExtraInstallments: {
        id: "percentagePayableViaExtraInstallments",
        number: 8,
        label:
          "Porcentaje del monto solicitado que se puede pagar por cuotas extraordinarias",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/percentage-requested-amount",
      },
      gracePeriod: {
        id: "gracePeriod",
        number: 9,
        label: "Periodo de gracia (dias)",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/grace-period",
      },
      paymentChannelTypeForExtraInstallments: {
        id: "paymentChannelTypeForExtraInstallments",
        number: 10,
        label: "Tipo de medio de pago para extras",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/payment-channel-extraInstallments",
      },
      adjustmentInterestPaymentType: {
        id: "adjustmentInterestPaymentType",
        number: 11,
        label: "Tipo de pago de intereses de ajuste al ciclo",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/adjustment-interest-payment-type",
      },
    },
  },
  conditionsUseProduct: {
    links: {
      lineOfCredit: {
        id: "lineOfCredit",
        number: 12,
        label: "Líneas de crédito",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/line-credit",
      },
      channelsCreditByLine: {
        id: "channelsCreditByLine",
        number: 13,
        label: "Canales que permiten colocación de crédito por línea",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/channels-credit-by-Line",
      },
    },
  },
  settingCrediLimit: {
    links: {
      loanAmountLimit: {
        id: "loanAmountLimit",
        number: 14,
        label: "Monto máximo",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/loan-amount-limit",
      },
      maximumPremiuMPercentage: {
        id: "maximumPremiumPercentageForExtraordinaryInstallmentsCommitments",
        number: 15,
        label: "Porcentaje máximo de la prima para compromisos por prima",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/maximum-percentage-extraordinary",
      },
      percentageOfMonthlyCapacityForLimit: {
        id: "percentageOfMonthlyCapacityForLimit",
        number: 16,
        label:
          "Porcentaje de la capacidad de pago mensual disponible que se puede usar para calcular el Cupo Máximo",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/percentage-available-monthly-payment",
      },
      isExcludedFromLimitAnalysisByPaymentCapacity: {
        id: "isExcludedFromLimitAnalysisByPaymentCapacity",
        number: 17,
        label:
          "Líneas de crédito que no se restan para el análisis de cupo por capacidad de pago",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/lines-not-subtracted-analysis",
      },
    },
  },
  costsClientWithinQuota: {
    links: {
      interestRateType: {
        id: "interestRateType",
        number: 18,
        label: "Tipo de tasa",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/interest-rate-type",
      },
      interestRateFixedPoints: {
        id: "interestRateFixedPoints",
        number: 19,
        label: "Puntos fijos",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/interest-rate-fixed-points",
      },
      referenceRateForFixedPoints: {
        id: "referenceRateForFixedPoints",
        number: 20,
        label: "Tasa de referencia para tasas de interés variables",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/reference-rate-fixed-points",
      },
      creditRiskPremium: {
        id: "creditRiskPremium",
        number: 21,
        label: "Prima en la tasa de interés por score de riesgo",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/credit-risk-premium",
      },
      fixedInterestRate: {
        id: "fixedInterestRate",
        number: 22,
        label: "Tasa fija",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/fixed-interest-rate",
      },
      chargeMonthlyRateForAdditionalLoanCosts: {
        id: "chargeMonthlyRateForAdditionalLoanCosts",
        number: 23,
        label: "Tasa de remuneración mensual de otros gastos del crédito",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/monthly-remuneration-rate-other-expenses",
      },
    },
  },
  creditStudyProcessing: {
    links: {
      approvalBoardPositions: {
        id: "approvalBoardPositions",
        number: 24,
        label:
          "Cargos de los funcionarios que conforman la instancia de aprobación",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/approval-board-positions",
      },
      indicatorForAutomaticManualApproval: {
        id: "indicatorForAutomaticManualApproval",
        number: 25,
        label:
          "Indicador que establece si una SC tiene aprobación automática o aprobación manual",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/indicator-automatic-manual-approval",
      },
      chargesCanApproveOnBehalf: {
        id: "positionsAuthorizedToApproveOnBehalfOfApprover",
        number: 26,
        label: "Cargos que pueden aprobar en representación de un aprobador",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/positions-authorized-approve",
      },
      hasAtomaticCollection: {
        id: "hasAtomaticCollection",
        number: 27,
        label: "La línea de crédito tienen} recogida automática",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/has-atomatic-collection",
      },
      exclusiveCreditLines: {
        id: "exclusiveCreditLines",
        number: 28,
        label: "Líneas de crédito excluyentes",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/exclusive-credit-lines",
      },
      positionsOfficialsAuthorizedForApproval: {
        id: "positionsAuthorizedForExtemporaneousSystemValidationRequirementsApproval",
        number: 29,
        label:
          "Cargos de los funcionarios que están autorizados para la aprobación extemporánea de los requisitos con validación del sistema",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/positions-authorized-extemporaneous",
      },
      omittableHumanTasks: {
        id: "omittableHumanTasks",
        number: 30,
        label: "Tareas humanas que se pueden omitir",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/omittable-human-tasks",
      },
      automaticCollectionForExclusiveCreditLines: {
        id: "automaticCollectionForExclusiveCreditLines",
        number: 31,
        label: "Recoge automáticamente líneas de crédito excluyentes",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/automatic-collection-exclusive-lines",
      },
      estimatedDaysForLoanDisbursementProcess: {
        id: "estimatedDaysForLoanDisbursementProcess",
        number: 32,
        label:
          "Dias estimados que puede tardar el trámite de desembolso de un crédito",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/estimated-days-loan-disbursement",
      },
      allowsCollectOtherCreditProducts: {
        id: "consolidationOfOtherCreditProductsAllowed ",
        number: 33,
        label: "Permite recoger otros productos de crédito",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/allows-collect-other-products",
      },
      financialObligationsUpdateRequired: {
        id: "financialObligationsUpdateRequired",
        number: 34,
        label:
          "Se require la gestión de las obligaciones financieras desde la colocación de un crédito",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/financial-obligations-update-required",
      },
    },
  },
  requiredGuarantees: {
    links: {
      guaranteeRequirements: {
        id: "guaranteeRequirements",
        number: 35,
        label: "Listado de garantias requeridas",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/guarantee-requirements",
      },
      additionalBorrowersAllowed: {
        id: "additionalBorrowersAllowed",
        number: 36,
        label: "La inclusión de deudores adicionales a un crédito es permitida",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/additional-borrowers-allowed",
      },
      bondCalculationFactorByAmount: {
        id: "bondCalculationFactorByAmount",
        number: 37,
        label: "Factor para calculo de fianza respecto al monto",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/bond-calculation-factor-amount",
      },
    },
  },
  productRequirements: {
    links: {
      Requirement: {
        id: "requirement",
        number: 38,
        label: "Listado de requisitos",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/requirement",
      },
    },
  },
  clientsSupportedByLine: {},
  clientsSupported: {
    links: {
      clientsSupported: {
        id: "clientsSupported",
        number: 39,
        label: "Clientes que soporta la línea",
        description: "En este paso encontraras que permite",
        path: "/credit-lines/edit-credit-lines/clients-supported",
      },
    },
  },
} as const;

const groups = [
  {
    id: "lineNamesAndDescriptions",
    title: "Nombres y descripción de la línea",
    path: "/credit-lines/edit-credit-lines/line-Names-Descriptions",
    links: toLinksArray(options.lineNamesAndDescriptions),
  },
  {
    id: "AmortizationCollectionDebt",
    title: "Amortización y recaudo de la deuda",
    links: toLinksArray(options.AmortizationCollectionDebt.links),
  },
  {
    id: "clientsSupportedByLine",
    title: "Clientes que soporta la línea",
    path: "/credit-lines/edit-credit-lines/clients-supported",
    links: toLinksArray(options.clientsSupportedByLine),
  },
  {
    id: "conditionsUseProduct",
    title: "Condiciones de uso del producto",
    links: toLinksArray(options.conditionsUseProduct.links),
  },
  {
    id: "settingCreditLimit",
    title: "Configuración del cupo de crédito",
    links: toLinksArray(options.settingCrediLimit.links),
  },
  {
    id: "costsClientWithinQuota",
    title: "Costos para el cliente dentro de la cuota",
    links: toLinksArray(options.costsClientWithinQuota.links),
  },
  {
    id: "creditStudyProcessing",
    title: "Estudio y trámite de crédito",
    links: toLinksArray(options.creditStudyProcessing.links),
  },
  {
    id: "requiredGuarantees",
    title: "Garantías requeridas",
    links: toLinksArray(options.requiredGuarantees.links),
  },
  {
    id: "productRequirements",
    title: "Requisitos del producto",
    links: toLinksArray(options.productRequirements.links),
  },
] as const;

export { groups, options };
