import { mainOptions } from "@config/creditLines/configuration/mainOptions";
import { INavigationRule } from "@ptypes/creditLines/INavigationRule";
import { filterNavConfiguration } from "../filterNavConfiguration";

const normalizeGroupRules = (
  ruleNameType: string[],
  optionsAllRules: INavigationRule[],
) => {
  return filterNavConfiguration(mainOptions, optionsAllRules).filter((item) =>
    ruleNameType.includes(item.id),
  );
};

export { normalizeGroupRules };
