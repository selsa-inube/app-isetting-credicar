import {
  IRuleDecision,
  ValueDataType,
  ValueHowToSetUp,
} from "@isettingkit/input";

const decisionTemplate: IRuleDecision = {
  ruleName: "",
  decisionDataType: ValueDataType.ALPHABETICAL,
  howToSetTheDecision: ValueHowToSetUp.EQUAL,
  value: "",
  effectiveFrom: "",
  validUntil: "",
  conditionsThatEstablishesTheDecision: [
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

export { decisionTemplate };
