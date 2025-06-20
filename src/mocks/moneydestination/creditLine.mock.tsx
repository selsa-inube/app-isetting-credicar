import {
  IRuleDecision,
  ValueDataType,
  ValueHowToSetUp,
} from "@isettingkit/input";

const decision1: IRuleDecision = {
  decisionId: "Decisión 1",
  ruleName: "LíneaDeCrédito",
  labelName: "Crédito vacacional",
  decisionDataType: ValueDataType.ALPHABETICAL,
  howToSetTheDecision: ValueHowToSetUp.EQUAL,
  effectiveFrom: "2024-12-31",
  validUntil: "2024-12-31",
  conditionsThatEstablishesTheDecision: [
    {
      labelName: "Categoria del cliente",
      conditionName: "CategoriaCliente",
      conditionDataType: ValueDataType.ALPHABETICAL,
      value: ["Leales", "Platinum"],
      howToSetTheCondition: ValueHowToSetUp.LIST_OF_VALUES_MULTI,
    },
  ],
};

const decision2: IRuleDecision = {
  decisionId: "Decisión 2",
  ruleName: "LíneaDeCrédito",
  labelName: "Libre inversión",
  decisionDataType: ValueDataType.ALPHABETICAL,
  howToSetTheDecision: ValueHowToSetUp.EQUAL,
  effectiveFrom: "2024-12-31",
  validUntil: "2024-12-31",
  conditionsThatEstablishesTheDecision: [
    {
      labelName: "Categoria del cliente",
      conditionName: "CategoriaCliente",
      conditionDataType: ValueDataType.ALPHABETICAL,
      value: ["Ocasionales", "Plata"],
      howToSetTheCondition: ValueHowToSetUp.LIST_OF_VALUES_MULTI,
    },
  ],
};

const decision3: IRuleDecision = {
  decisionId: "Decisión 3",
  ruleName: "LíneaDeCrédito",
  decisionDataType: ValueDataType.ALPHABETICAL,
  value: "Libre inversión",
  howToSetTheDecision: ValueHowToSetUp.EQUAL,
  effectiveFrom: "2024-12-31",
  validUntil: "2024-12-31",
  conditionsThatEstablishesTheDecision: [
    {
      labelName: "Categoria del cliente",
      conditionName: "CategoriaCliente",
      conditionDataType: ValueDataType.ALPHABETICAL,
      value: ["Ocasionales", "Plata"],
      howToSetTheCondition: ValueHowToSetUp.LIST_OF_VALUES_MULTI,
    },
  ],
};

const decisions = [decision1, decision2, decision3];
const decisionsAssited = [decision1, decision2];

export { decisions, decisionsAssited };
