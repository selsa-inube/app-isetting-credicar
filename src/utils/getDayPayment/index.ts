import { dataTranslations } from "../dataTranslations";

const getDayPayment = (item: string) => {
  return dataTranslations[item] ?? item;
};

export { getDayPayment };
