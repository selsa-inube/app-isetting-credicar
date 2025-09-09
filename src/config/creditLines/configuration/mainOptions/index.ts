import { toLinksArray } from "@utils/toLinksArray";

const options = {
  conditionsUseProduct: {
    links: {
      linesCredit: {
        id: "linesCredit",
        label: "Líneas de crédito",
        path: "/credit-lines/edit-credit-lines",
      },
      channelsCreditByLine: {
        id: "channelsCreditByLine",
        label: "Canales que permiten colocación de crédito por línea",
        path: "/",
      },
    },
  },
  AmortizationCollectionDebt: {
    links: {
      term: { id: "term", label: "Plazo", path: "/term" },
      paymentMethodType: {
        id: "amortizationMethods",
        label: "Métodos de amortización",
        path: "/",
      },
      paymentCyclesOrdinary: {
        id: "rateIncrease",
        label: "Tasa de incremento (g)",
        path: "/",
      },
      disbursementMethods: {
        id: "disbursementMethods",
        label: "Métodos de desembolso",
        path: "/",
      },
      suggestionPaymentMethod: {
        id: "suggestionPaymentMethod",
        label: "Sugerencia para medio de pago",
        path: "/",
      },
      PercentageAmountPaidExtraordinary: {
        id: "PercentageAmountPaidExtraordinary",
        label:
          "Porcentaje del monto solicitado que se puede pagar por cuotas extraordinarias",
        path: "/",
      },
      GracePeriodDays: {
        id: "GracePeriodDays",
        label: "Periodo de gracia (dias)",
        path: "/",
      },
      typePaymentMethodExtras: {
        id: "typePaymentMethodExtras",
        label: "Tipo de medio de pago para extras",
        path: "/",
      },
      typeInterestPaymentCycle: {
        id: "typeInterestPaymentCycle",
        label: "Tipo de pago de intereses de ajuste al ciclo",
        path: "/",
      },
    },
  },
  SettingCrediLimit: {
    links: {
      maximumAmount: {
        id: "maximumAmount",
        label: "Monto máximo",
        path: "/",
      },
      MaximumPremiuMPercentage: {
        id: "MaximumPremiuMPercentage",
        label: "Porcentaje máximo de la prima para compromisos por prima",
        path: "/",
      },

      //        Percentage of available monthly payment capacity that can be used to calculate the Maximum Limit:{
      //         id: "MaximumPremiuMPercentage",
      //         label: " Porcentaje de la capacidad de pago mensual disponible que se puede usar para calcular el Cupo Máximo",
      //         path: "/MaximumPremiuMPercentage",
      //       }
      // :
    },
  },
} as const;

const groups = [
  {
    id: "conditionsUseProduct",
    title: "Condiciones de uso del producto",
    links: toLinksArray(options.conditionsUseProduct.links),
  },
  {
    id: "AmortizationCollectionDebt",
    title: "Amortización y recaudo de la deuda",
    links: toLinksArray(options.AmortizationCollectionDebt.links),
  },
  {
    id: "SettingCreditLimit",
    title: "Configuración del cupo de crédito",
    links: toLinksArray(options.SettingCrediLimit.links),
  },
] as const;

export { groups };
