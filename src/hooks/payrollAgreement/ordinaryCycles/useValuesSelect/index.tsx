import { useContext } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEnumeratorsIcardes } from "@hooks/useEnumeratorsIcardes";
import { optionsFromEnumsSpanish } from "@utils/optionsFromEnumsSpanish";
import { withoutLastElements } from "@utils/withoutLastElements";
import { ECyclesPayroll } from "@enum/cyclesPayroll";

const useValuesSelect = () => {
  const { appData } = useContext(AuthAndPortalData);
  const { enumData: periodicity } = useEnumeratorsIcardes({
    enumCredicar: ECyclesPayroll.PERIODICITY_ICARDES,
    bussinesUnits: appData.businessUnit.publicCode,
  });

  const { enumData: weekly } = useEnumeratorsIcardes({
    enumCredicar: ECyclesPayroll.WEEKLY_ICARDES,
    bussinesUnits: appData.businessUnit.publicCode,
  });

  const { enumData: everyTen } = useEnumeratorsIcardes({
    enumCredicar: ECyclesPayroll.EVERY_TEN_ICARDES,
    bussinesUnits: appData.businessUnit.publicCode,
  });

  const { enumData: semimonthly } = useEnumeratorsIcardes({
    enumCredicar: ECyclesPayroll.SEMIMONTHLY_ICARDES,
    bussinesUnits: appData.businessUnit.publicCode,
  });

  const { enumData: monthly } = useEnumeratorsIcardes({
    enumCredicar: ECyclesPayroll.MONTHLY_ICARDES,
    bussinesUnits: appData.businessUnit.publicCode,
  });

  const periodicityOptions = optionsFromEnumsSpanish(periodicity);

  const weeklyPayDayOptions = optionsFromEnumsSpanish(weekly);

  const everyTenPayDayOptions = optionsFromEnumsSpanish(everyTen);

  const semimonthlyOptions = optionsFromEnumsSpanish(semimonthly);

  const monthPayDayOptions = optionsFromEnumsSpanish(monthly);

  const montlyCourtDaysOptions = withoutLastElements(
    monthPayDayOptions as unknown as Record<string, string>[],
    1,
  );

  const BiweeklyCourtDaysOptions = withoutLastElements(
    semimonthlyOptions as unknown as Record<string, string>[],
    1,
  );

  const weeklyCourtDayOptions = withoutLastElements(
    semimonthlyOptions as unknown as Record<string, string>[],
    8,
  );

  const payDayOrdinaryOptions = (periodicity: string) => {
    switch (periodicity) {
      case ECyclesPayroll.WEEKLY:
        return weeklyPayDayOptions;
      case ECyclesPayroll.EVERY_TEN:
        return everyTenPayDayOptions;
      case ECyclesPayroll.SEMIMONTHLY:
        return semimonthlyOptions;
      case ECyclesPayroll.MONTHLY:
        return monthPayDayOptions;
      case ECyclesPayroll.BIWEEKLY:
        return weeklyPayDayOptions;
    }
  };

  const courtDaysOrdinaryOptions = (periodicity: string) => {
    switch (periodicity) {
      case ECyclesPayroll.WEEKLY:
        return weeklyCourtDayOptions;
      case ECyclesPayroll.EVERY_TEN:
        return everyTenPayDayOptions;
      case ECyclesPayroll.SEMIMONTHLY:
        return semimonthlyOptions;
      case ECyclesPayroll.MONTHLY:
        return montlyCourtDaysOptions;
      case ECyclesPayroll.BIWEEKLY:
        return BiweeklyCourtDaysOptions;
    }
  };

  return {
    periodicityOptions,
    weeklyPayDayOptions,
    everyTenPayDayOptions,
    semimonthlyOptions,
    monthPayDayOptions,
    montlyCourtDaysOptions,
    payDayOrdinaryOptions,
    courtDaysOrdinaryOptions,
  };
};

export { useValuesSelect };
