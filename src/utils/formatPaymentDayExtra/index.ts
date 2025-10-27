import { monthNames } from "@config/monthNames";
import { getDayPayment } from "../getDayPayment";

const formatPaymentDayExtra = (payday: string) => {
  if (payday.length === 4) {
    const [month, day] = [payday.slice(0, 2), payday.slice(2, 4)];

    const numericMonth = Number(month.startsWith("0") ? month.slice(1) : month);
    const numericDay = Number(day.startsWith("0") ? day.slice(1) : day);

    if (numericMonth < 1 || numericMonth > 12) {
      console.warn(`Mes inválido: ${month}`);
      return getDayPayment(payday) ?? payday;
    }

    const monthName = monthNames[numericMonth - 1];
    return `${monthName}-${numericDay}`;
  }

  return getDayPayment(payday) ?? payday;
};

export { formatPaymentDayExtra };
