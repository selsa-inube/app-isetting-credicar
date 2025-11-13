import { mainOptions } from "@config/creditLines/configuration/mainOptions";

const titleOptionConfigLine = (rule: string) => {
  return mainOptions.find((option) => option.id === rule)?.label;
};

export { titleOptionConfigLine };
