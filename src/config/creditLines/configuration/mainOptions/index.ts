const options = {
  lineNamesAndDescriptions: {},
  lineNames: {
    links: {
      namesAndDescriptions: {
        id: "lineNamesAndDescriptions",
        number: 1,
        label: "Nombres y descripción de la línea",
        path: "/credit-lines/edit-credit-lines/line-Names-Descriptions",
      },
    },
  },
  AmortizationCollectionDebt: {
    links: {
      loanTerm: {
        id: "LoanTerm",
        number: 2,
        label: "Plazo",
        path: "/credit-lines/edit-credit-lines/loan-term",
      },
      repaymentStructure: {
        id: "RepaymentStructure",
        number: 3,
        label: "Métodos de amortización",
        path: "/credit-lines/edit-credit-lines/amortization-methods",
      },
      geometricGradientRepaymentRate: {
        id: "GeometricGradientRepaymentRate",
        number: 4,
        label: "Tasa de incremento (g)",
        path: "/credit-lines/edit-credit-lines/rate-increase",
      },
      arithmeticGradientRepaymentValue: {
        id: "ArithmeticGradientRepaymentValue",
        number: 5,
        label: "Valor de incremento (G)",
        path: "/credit-lines/edit-credit-lines/increment-value",
      },
      modeOfDisbursementType: {
        id: "ModeOfDisbursementType",
        number: 6,
        label: "Métodos de desembolso",
        path: "/credit-lines/edit-credit-lines/disbursement-methods",
      },
      suggestedPaymentChannelType: {
        id: "SuggestedPaymentChannelType",
        number: 7,
        label: "Sugerencia para medio de pago",
        path: "/credit-lines/edit-credit-lines/suggested-payment-channel",
      },
      percentagePayableViaExtraInstallments: {
        id: "PercentagePayableViaExtraInstallments",
        number: 8,
        label:
          "Porcentaje del monto solicitado que se puede pagar por cuotas extraordinarias",
        path: "/credit-lines/edit-credit-lines/percentage-requested-amount",
      },
      gracePeriod: {
        id: "GracePeriod",
        number: 9,
        label: "Periodo de gracia (dias)",
        path: "/credit-lines/edit-credit-lines/grace-period",
      },
      paymentChannelTypeForExtraInstallments: {
        id: "PaymentChannelTypeForExtraInstallments",
        number: 10,
        label: "Tipo de medio de pago para extras",
        path: "/credit-lines/edit-credit-lines/payment-channel-extraInstallments",
      },
      adjustmentInterestPaymentType: {
        id: "AdjustmentInterestPaymentType",
        number: 11,
        label: "Tipo de pago de intereses de ajuste al ciclo",
        path: "/credit-lines/edit-credit-lines/adjustment-interest-payment-type",
      },
    },
  },
  conditionsUseProduct: {
    links: {
      lineOfCredit: {
        id: "LineOfCredit",
        number: 12,
        label: "Líneas de crédito",
        path: "/credit-lines/edit-credit-lines/line-credit",
      },
      channelsCreditByLine: {
        id: "CreditPlacementChannelsByLine",
        number: 13,
        label: "Canales que permiten colocación de crédito por línea",
        path: "/credit-lines/edit-credit-lines/channels-credit-by-Line",
      },
    },
  },
  settingCrediLimit: {
    links: {
      loanAmountLimit: {
        id: "LoanAmountLimit",
        number: 14,
        label: "Monto máximo",
        path: "/credit-lines/edit-credit-lines/loan-amount-limit",
      },
      maximumPremiuMPercentage: {
        id: "MaximumPremiumPercentageForExtraordinaryInstallmentsCommitments",
        number: 15,
        label: "Porcentaje máximo de la prima para compromisos por prima",
        path: "/credit-lines/edit-credit-lines/maximum-percentage-extraordinary",
      },
      percentageOfMonthlyCapacityForLimit: {
        id: "PercentageOfMonthlyCapacityForLimit",
        number: 16,
        label:
          "Porcentaje de la capacidad de pago mensual disponible que se puede usar para calcular el Cupo Máximo",
        path: "/credit-lines/edit-credit-lines/percentage-available-monthly-payment",
      },
      isExcludedFromLimitAnalysisByPaymentCapacity: {
        id: "IsExcludedFromLimitAnalysisByPaymentCapacity",
        number: 17,
        label:
          "Líneas de crédito que no se restan para el análisis de cupo por capacidad de pago",
        path: "/credit-lines/edit-credit-lines/lines-not-subtracted-analysis",
      },
    },
  },
  costsClientWithinQuota: {
    links: {
      interestRateType: {
        id: "InterestRateType",
        number: 18,
        label: "Tipo de tasa",
        path: "/credit-lines/edit-credit-lines/interest-rate-type",
      },
      interestRateFixedPoints: {
        id: "InterestRateFixedPoints",
        number: 19,
        label: "Puntos fijos",
        path: "/credit-lines/edit-credit-lines/interest-rate-fixed-points",
      },
      referenceRateForFixedPoints: {
        id: "ReferenceRateForFixedPoints",
        number: 20,
        label: "Tasa de referencia para tasas de interés variables",
        path: "/credit-lines/edit-credit-lines/reference-rate-fixed-points",
      },
      creditRiskPremium: {
        id: "CreditRiskPremium",
        number: 21,
        label: "Prima en la tasa de interés por score de riesgo",
        path: "/credit-lines/edit-credit-lines/credit-risk-premium",
      },
      fixedInterestRate: {
        id: "FixedInterestRate",
        number: 22,
        label: "Tasa fija",
        path: "/credit-lines/edit-credit-lines/fixed-interest-rate",
      },
      chargeMonthlyRateForAdditionalLoanCosts: {
        id: "ChargeMonthlyRateForAdditionalLoanCosts",
        number: 23,
        label: "Tasa de remuneración mensual de otros gastos del crédito",
        path: "/credit-lines/edit-credit-lines/monthly-remuneration-rate-other-expenses",
      },
    },
  },
  creditStudyProcessing: {
    links: {
      approvalBoardPositions: {
        id: "ApprovalBoardPositions",
        number: 24,
        label:
          "Cargos de los funcionarios que conforman la instancia de aprobación",
        path: "/credit-lines/edit-credit-lines/approval-board-positions",
      },
      indicatorForAutomaticManualApproval: {
        id: "IndicatorForAutomaticManualApproval",
        number: 25,
        label:
          "Indicador que establece si una SC tiene aprobación automática o aprobación manual",
        path: "/credit-lines/edit-credit-lines/indicator-automatic-manual-approval",
      },
      chargesCanApproveOnBehalf: {
        id: "PositionsAuthorizedToApproveOnBehalfOfApprover",
        number: 26,
        label: "Cargos que pueden aprobar en representación de un aprobador",
        path: "/credit-lines/edit-credit-lines/positions-authorized-approve",
      },
      hasAtomaticCollection: {
        id: "HasAtomaticCollection",
        number: 27,
        label: "La línea de crédito tienen} recogida automática",
        path: "/credit-lines/edit-credit-lines/has-atomatic-collection",
      },
      exclusiveCreditLines: {
        id: "ExclusiveCreditLines",
        number: 28,
        label: "Líneas de crédito excluyentes",
        path: "/credit-lines/edit-credit-lines/exclusive-credit-lines",
      },
      positionsOfficialsAuthorizedForApproval: {
        id: "PositionsAuthorizedForExtemporaneousSystemValidationRequirementsApproval",
        number: 29,
        label:
          "Cargos de los funcionarios que están autorizados para la aprobación extemporánea de los requisitos con validación del sistema",
        path: "/credit-lines/edit-credit-lines/positions-authorized-extemporaneous",
      },
      omittableHumanTasks: {
        id: "OmittableHumanTasks",
        number: 30,
        label: "Tareas humanas que se pueden omitir",
        path: "/credit-lines/edit-credit-lines/omittable-human-tasks",
      },
      automaticCollectionForExclusiveCreditLines: {
        id: "AutomaticCollectionForExclusiveCreditLines",
        number: 31,
        label: "Recoge automáticamente líneas de crédito excluyentes",
        path: "/credit-lines/edit-credit-lines/automatic-collection-exclusive-lines",
      },
      estimatedDaysForLoanDisbursementProcess: {
        id: "EstimatedDaysForLoanDisbursementProcess",
        number: 32,
        label:
          "Dias estimados que puede tardar el trámite de desembolso de un crédito",
        path: "/credit-lines/edit-credit-lines/estimated-days-loan-disbursement",
      },
      allowsCollectOtherCreditProducts: {
        id: "ConsolidationOfOtherCreditProductsAllowed ",
        number: 33,
        label: "Permite recoger otros productos de crédito",
        path: "/credit-lines/edit-credit-lines/allows-collect-other-products",
      },
      financialObligationsUpdateRequired: {
        id: "FinancialObligationsUpdateRequired",
        number: 34,
        label:
          "Se require la gestión de las obligaciones financieras desde la colocación de un crédito",
        path: "/credit-lines/edit-credit-lines/financial-obligations-update-required",
      },
    },
  },
  requiredGuarantees: {
    links: {
      guaranteeRequirements: {
        id: "GuaranteeRequirements",
        number: 35,
        label: "Listado de garantias requeridas",
        path: "/credit-lines/edit-credit-lines/guarantee-requirements",
      },
      additionalBorrowersAllowed: {
        id: "AdditionalBorrowersAllowed",
        number: 36,
        label: "La inclusión de deudores adicionales a un crédito es permitida",
        path: "/credit-lines/edit-credit-lines/additional-borrowers-allowed",
      },
      bondCalculationFactorByAmount: {
        id: "BondCalculationFactorByAmount",
        number: 37,
        label: "Factor para calculo de fianza respecto al monto",
        path: "/credit-lines/edit-credit-lines/bond-calculation-factor-amount",
      },
    },
  },
  productRequirements: {
    links: {
      Requirement: {
        id: "Requirement",
        number: 38,
        label: "Listado de requisitos",
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
        path: "/credit-lines/edit-credit-lines/clients-supported",
      },
    },
  },
} as const;

export { options };
