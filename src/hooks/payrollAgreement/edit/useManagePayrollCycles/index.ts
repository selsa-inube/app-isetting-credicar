import { useEffect, useMemo, useRef } from "react";
import { TransactionOperation } from "@enum/transactionOperation";
import { IExtraordinaryCyclesEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IExtraordinaryCyclesEntry";
import { IOrdinaryCyclesEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IOrdinaryCyclesEntry";
import { IRegularPaymentCycles } from "@ptypes/payrollAgreement/payrollAgreementTab/IRegularPaymentCycles";
import { normalizeEnumTranslationCode } from "@utils/normalizeEnumTranslationCode";
import { severancePay } from "@config/payrollAgreement/payrollAgreementTab/assisted/severancePaymentCycles";
import { specialBenefitPayment } from "@config/payrollAgreement/payrollAgreementTab/assisted/specialBenefitPaymentCycles";
import { getDatesFromDaysWeek } from "@utils/getDatesFromDaysWeek";
import { getDaysWeekSelected } from "@utils/getDaysWeekSelected";
import { areObjectsEqual } from "@utils/areObjectEqual";
import { getUniquePaydays } from "@utils/getUniqueDays";
import { getDaysInNumber } from "@utils/getDaysInNumber";
import { editPayrollAgTabsConfig } from "@config/payrollAgreement/payrollAgreementTab/edit/tab";
import { getLastDayOfMonth } from "@utils/getLastDayOfMonth";
import { IUseManagePayrollCycles } from "@ptypes/hooks/IUseManagePayrollCycles";
import { checkDayWeek } from "@utils/checkDayWeek";
import { formatPaymentDay } from "@utils/formatPaymentDay";

const useManagePayrollCycles = (props: IUseManagePayrollCycles) => {
  const {
    initialData,
    regularPaymentCycles,
    isSelected,
    extraordinaryPayment,
    setExtraordinaryPayment,
  } = props;

  const newObjRegularPayment = (
    newValues: IOrdinaryCyclesEntry[],
    transactionOperation: string,
  ): IRegularPaymentCycles[] =>
    newValues.map((item) => ({
      payrollForDeductionAgreementId: item.cycleId ?? "",
      regularPaymentCycleName: item.nameCycle ?? "",
      schedule:
        normalizeEnumTranslationCode(item.periodicity ?? "")?.code ??
        item.periodicity ??
        "",
      paymentDay: checkDayWeek(item.payday ?? ""),
      numberOfDaysBeforePaymentToBill: Number(item.numberDaysUntilCut),
      transactionOperation: transactionOperation,
    }));

  const newObjExtraordinaryPayment = (
    newValues: IExtraordinaryCyclesEntry[],
    transactionOperation: string,
  ) =>
    newValues.map((item) => ({
      abbreviatedName: item.nameCycle,
      numberOfDaysBeforePaymentToBill: Number(item.numberDaysUntilCut),
      paymentDay: formatPaymentDay(item.payday ?? ""),
      payrollForDeductionAgreementId: item.id ?? "",
      transactionOperation: transactionOperation,
    }));

  const initialOrdinaryCyclesValues = useRef(initialData.ordinaryCycles.values);

  const deleteValuesRegular = useMemo(() => {
    return initialOrdinaryCyclesValues.current.filter(
      (formValue) =>
        !regularPaymentCycles.some((initialValue) =>
          areObjectsEqual(initialValue, formValue),
        ),
    );
  }, [regularPaymentCycles]);

  const filterExtraordinaryPayment = (entries: IOrdinaryCyclesEntry[]) => {
    const days = getUniquePaydays(entries);
    const daysWeekSelected = getDaysWeekSelected(days);
    const daysInNumber = getDaysInNumber(days);
    const filteredExtraordinary: IExtraordinaryCyclesEntry[] = [];

    let daysMonth: number[] = [];
    let verifyDays: number[] = [];
    let lastDayOfMonth: number[] = [];

    extraordinaryPayment.forEach((item) => {
      const month = Number(item.payday?.slice(0, 2));
      const paydayValue = Number(item.payday?.slice(-2));
      daysMonth = getDatesFromDaysWeek(daysWeekSelected, month - 1);
      lastDayOfMonth = getLastDayOfMonth(days, month - 1);

      verifyDays = Array.from(
        new Set([...daysInNumber, ...daysMonth, ...lastDayOfMonth]),
      );

      const filteredRegularPaymentCycles = regularPaymentCycles.flatMap(
        (item) => {
          const filteredPayday = (item.payday ?? "")
            .split(",")
            .map((payday) => Number(payday.trim()));
          return filteredPayday.filter((payday) => verifyDays.includes(payday));
        },
      );

      if (filteredRegularPaymentCycles.length > 0) {
        verifyDays = verifyDays.filter(
          (day) => !filteredRegularPaymentCycles.includes(day),
        );
      }

      if (!verifyDays.includes(paydayValue)) {
        filteredExtraordinary.push(item);
      }
    });

    return {
      filteredExtraordinary,
      verifyDays,
    };
  };

  useEffect(() => {
    if (
      isSelected === editPayrollAgTabsConfig.regularPaymentCycles.id &&
      deleteValuesRegular.length > 0
    ) {
      const { filteredExtraordinary } =
        filterExtraordinaryPayment(deleteValuesRegular);
      setExtraordinaryPayment(filteredExtraordinary);
    }
  }, [isSelected, deleteValuesRegular]);

  const newRegularPayment = () => {
    const newValues = regularPaymentCycles.filter(
      (formValue) =>
        !initialData.ordinaryCycles.values.some(
          (initialValue) =>
            JSON.stringify(initialValue) === JSON.stringify(formValue),
        ),
    );

    const regularPayment = [
      ...newObjRegularPayment(newValues, TransactionOperation.INSERT),
      ...newObjRegularPayment(deleteValuesRegular, TransactionOperation.DELETE),
    ];

    return regularPayment;
  };

  const newExtraordinaryPayment = () => {
    const newValues = extraordinaryPayment.filter(
      (formValue) =>
        !initialData.extraordinaryCycles.values.some(
          (initialValue) =>
            JSON.stringify(initialValue) === JSON.stringify(formValue),
        ),
    );

    const deleteValues = initialData.extraordinaryCycles.values.filter(
      (formValue) =>
        !extraordinaryPayment.some(
          (initialValue) =>
            JSON.stringify(initialValue) === JSON.stringify(formValue),
        ),
    );

    const newValSeverance = newValues.filter((item) =>
      severancePay.includes(item.typePayment),
    );

    const newDelSeverance = deleteValues.filter((item) =>
      severancePay.includes(item.typePayment),
    );

    const newValSpecialBenefit = newValues.filter((item) =>
      specialBenefitPayment.includes(item.typePayment),
    );

    const newDelSpecialBenefit = deleteValues.filter((item) =>
      specialBenefitPayment.includes(item.typePayment),
    );

    return {
      severancePayment: [
        ...newObjExtraordinaryPayment(
          newValSeverance,
          TransactionOperation.INSERT,
        ),
        ...newObjExtraordinaryPayment(
          newDelSeverance,
          TransactionOperation.DELETE,
        ),
      ],
      payrollSpeBenPayment: [
        ...newObjExtraordinaryPayment(
          newValSpecialBenefit,
          TransactionOperation.INSERT,
        ),
        ...newObjExtraordinaryPayment(
          newDelSpecialBenefit,
          TransactionOperation.DELETE,
        ),
      ],
    };
  };

  return {
    newRegularPayment,
    newExtraordinaryPayment,
  };
};

export { useManagePayrollCycles };
