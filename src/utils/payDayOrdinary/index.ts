import { biweeklyPayDayOptions } from "@config/payrollAgreement/payrollAgreementTab/assisted/biweeklyPayDay";
import { everyTenPayDayOptions } from "@config/payrollAgreement/payrollAgreementTab/assisted/everyTenPayDay";
import { monthPayDayOptions } from "@config/payrollAgreement/payrollAgreementTab/assisted/monthlyPayDay";
import { weeklyPayDayOptions } from "@config/payrollAgreement/payrollAgreementTab/assisted/weeklyPayDay";

const payDayOrdinaryOptions = (periodicity: string) => {
  switch (periodicity) {
    case "Weekly":
      return weeklyPayDayOptions;
    case "Intervals_10_days":
      return everyTenPayDayOptions;
    case "Biweekly":
      return biweeklyPayDayOptions;
    case "Monthly":
      return monthPayDayOptions;
    case "Semimonthly":
      return weeklyPayDayOptions;
  }
};

export { payDayOrdinaryOptions };
