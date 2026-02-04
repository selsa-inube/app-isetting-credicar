import { monthNames } from "@config/monthNames";
import { IEnumerators } from "@ptypes/IEnumerators";
import { getDayPayment } from "../getDayPayment";

const formatPaymentDayExtra = (
  payday: string,
  months?: IEnumerators[],
  language?: string,
) => {
  if (payday.length === 4) {
    const [month, day] = [payday.slice(0, 2), payday.slice(2, 4)];

    const numericMonth = Number(month.startsWith("0") ? month.slice(1) : month);
    const numericDay = Number(day.startsWith("0") ? day.slice(1) : day);

    if (numericMonth < 1 || numericMonth > 12) {
      console.warn(`Mes inválido: ${month}`);
      return getDayPayment(payday) ?? payday;
    }

    if (months && months.length > 0) {
      const monthCurrent = months.find((item) => item.index === numericMonth);

      if (monthCurrent) {
        const i18n =
          monthCurrent?.i18n?.[language as keyof typeof monthCurrent.i18n] ??
          monthCurrent?.description;

        return `${i18n}-${numericDay}`;
      }
    }

    const monthName = monthNames.find(
      (item) => item.code === numericMonth,
    )?.month;

    return monthName ? `${monthName}-${numericDay}` : payday;
  }

  return getDayPayment(payday) ?? payday;
};

export { formatPaymentDayExtra };
