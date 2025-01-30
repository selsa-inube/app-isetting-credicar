import {
  IRuleDecision,
  ValueDataType,
  ValueHowToSetUp,
} from "@isettingkit/input";

const textValuesBusinessRules = {
  selectOptions: "Seleccione las opciones",
  selectOption: "Seleccione una opción",
  rangeMin: (label: string) => `${label} Minima`,
  rangeMax: (label: string) => `${label} Maxima`,
  reasonForChange: "Motivo del cambio",
  change: "Cambio",
  changePlaceholder: "Describa brevemente el motivo del cambio",
  termStart: "Fecha de inicio",
  termEnd: "Fecha de fin",
  cancel: "Cancelar",
  confirm: "Confirmar",
  none: "Ninguno",
  factsThatConditionIt: "Condiciones que lo determinan",
  criteria: "Criterios",
  terms: "Vigencia",
};

const decisionTemplate: IRuleDecision = {
  ruleName: "LineaDeCrédito",
  decisionDataType: ValueDataType.ALPHABETICAL,
  howToSetTheDecision: ValueHowToSetUp.EQUAL,
  value: "",
  effectiveFrom: "",
  validUntil: "",
  conditionThatEstablishesTheDecision: [
    {
      labelName: "Antigüedad del cliente(Días)",
      conditionName: "AntigüedadDelCliente",
      conditionDataType: ValueDataType.ALPHABETICAL,
      value: "",
      howToSetTheCondition: ValueHowToSetUp.EQUAL,
    },
    {
      labelName: "Categoría del cliente ",
      conditionName: "CategoriaDelCliente",
      conditionDataType: ValueDataType.ALPHABETICAL,
      listOfPossibleValues: {
        list: ["Leales", "Ocasionales", "Plata", "Platinum"],
      },
      value: [],
      howToSetTheCondition: ValueHowToSetUp.LIST_OF_VALUES_MULTI,
    },
    {
      labelName: "Nivel de membresía",
      conditionName: "NivelDeMembresía",
      conditionDataType: ValueDataType.ALPHABETICAL,
      listOfPossibleValues: {
        list: ["Muy alto", "Alto", "Medio", "Bajo", "Muy bajo"],
      },
      value: "",
      howToSetTheCondition: ValueHowToSetUp.EQUAL,
    },
    {
      labelName: "Reciprocidad de ahorro",
      conditionName: "ReciprocidadDeAhorro",
      conditionDataType: ValueDataType.PERCENTAGE,
      value: 0,
      howToSetTheCondition: ValueHowToSetUp.EQUAL,
    },
  ],
};

export { textValuesBusinessRules, decisionTemplate };
