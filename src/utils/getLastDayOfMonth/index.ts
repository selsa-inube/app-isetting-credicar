import { lastDayMonth } from "../lastDayMonth";

const getLastDayOfMonth = (paydays: string[], month: number): number[] => {
  return paydays
    .filter((payday) => payday === "Último día del mes")
    .map(() => lastDayMonth(month));
};

export { getLastDayOfMonth };
