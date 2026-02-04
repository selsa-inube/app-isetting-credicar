import { IOption } from "@inubekit/inubekit";

const getPaydayTranslation = (months: IOption[], value: string) => {
  return months.find((month) => month.id === value)?.label ?? value;
};

export { getPaydayTranslation };
