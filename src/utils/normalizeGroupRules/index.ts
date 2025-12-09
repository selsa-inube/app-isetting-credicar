import { mainOptions } from "@config/creditLines/configuration/mainOptions";
import { INavigationRule } from "@ptypes/creditLines/INavigationRule";
import { filterNavConfiguration } from "../filterNavConfiguration";

const normalizeGroupRules = (
  ruleNameType: string[],
  optionsAllRules: INavigationRule[],
  filterRules?: string[],
) => {
  const dataConfiguration = filterNavConfiguration(
    mainOptions,
    optionsAllRules,
  ).filter((item) => ruleNameType.includes(item.id));
  if (filterRules && filterRules.length > 0) {
    return dataConfiguration.filter((data) => filterRules.includes(data.id));
  } else {
    return dataConfiguration;
  }
};

export { normalizeGroupRules };
