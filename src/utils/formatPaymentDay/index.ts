import { monthNames } from "@config/monthNames";
import { addLeadingZero } from "../addLeadingZero";

const formatPaymentDay = (payday: string) => {
  if (payday.length === 4) {
    return payday;
  } else {
    const [month, day] = payday.split("-");

    const monthIndex = monthNames.find((item) => item.month === month)?.code;
    const formatMonth = addLeadingZero(monthIndex ?? 0);
    const formatDay = addLeadingZero(Number(day));

    return `${formatMonth}${formatDay}`;
  }
};

export { formatPaymentDay };
