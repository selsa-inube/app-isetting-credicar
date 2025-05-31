import { biweeklyPayDayOptions } from "@config/payrollAgreement/payrollAgreementTab/assisted/biweeklyPayDay";
import { everyTenPayDayOptions } from "@config/payrollAgreement/payrollAgreementTab/assisted/everyTenPayDay";
import { bimonthlyCourtDaysOptions } from "@config/payrollAgreement/payrollAgreementTab/assisted/bimonthlyCourtDays";
import { weeklyCourtDaysOptions } from "@config/payrollAgreement/payrollAgreementTab/assisted/weeklyCourtDays";
import { extraordinaryDaysOptions } from "@config/payrollAgreement/payrollAgreementTab/assisted/extraordinaryDay";

const courtDaysOrdinaryOptions = (periodicity: string) => {
  switch (periodicity) {
    case "Weekly":
      return weeklyCourtDaysOptions;
    case "Intervals_10_days":
      return everyTenPayDayOptions;
    case "Biweekly":
      return biweeklyPayDayOptions;
    case "Monthly":
      return extraordinaryDaysOptions;
    case "Semimonthly":
      return bimonthlyCourtDaysOptions;
  }
};

export { courtDaysOrdinaryOptions };
