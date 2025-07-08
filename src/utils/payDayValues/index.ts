import { ECyclesPayroll } from "@src/enum/cyclesPayroll";
import { dataTranslations } from "../dataTranslations";

const payDayValues = (periodicity: string, payDay: string) => {
  const everyTen = Number(payDay) + 10;

  switch (periodicity) {
    case ECyclesPayroll.WEEKLY:
      return dataTranslations[payDay] ?? payDay;
    case ECyclesPayroll.EVERY_TEN:
      return `${payDay}, ${everyTen}, ${Number(everyTen) + 10}`;
    case ECyclesPayroll.SEMIMONTHLY:
      return `${payDay}, ${Number(payDay) + 15}`;
    case ECyclesPayroll.MONTHLY:
      return payDay;
    case ECyclesPayroll.BIWEEKLY:
      return dataTranslations[payDay] ?? payDay;
    default:
      return payDay;
  }
};

export { payDayValues };
