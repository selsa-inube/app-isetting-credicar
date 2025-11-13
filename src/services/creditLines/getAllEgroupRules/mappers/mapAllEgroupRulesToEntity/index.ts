import { IAllEgroupRuleType } from "@ptypes/creditLines/IAllEgroupRuleType";

const mapAllEgroupRulesToEntity = (data: IAllEgroupRuleType) => {
  const newData: IAllEgroupRuleType = {
    code: String(data.code),
    value: String(data.value),
    i18nAttribute: String(data.i18nAttribute),
    i18nValue: Object(data.i18nValue),
    ruleNameType: Object(data.ruleNameType),
  };

  return newData;
};

export { mapAllEgroupRulesToEntity };
