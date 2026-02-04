import { IOption, useMediaQuery } from "@inubekit/inubekit";
import { useContext, useEffect, useImperativeHandle, useState } from "react";
import { useFormik } from "formik";
import { object } from "yup";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEnumerators } from "@hooks/useEnumerators";
import { useEnumeratorsICardes } from "@hooks/useEnumeratorsIcardes";
import { validationRules } from "@validations/validationRules";
import { validationMessages } from "@validations/validationMessages";
import { eventBus } from "@events/eventBus";
import { addLeadingZero } from "@utils/addLeadingZero";
import { daysOfMonth } from "@utils/daysOfMonth";
import { optionsFromEnumerators } from "@utils/optionsFromEnumerators";
import { normalizeEnumTranslation } from "@utils/normalizeEnumTranslation";
import { optionsFromEnumI18n } from "@utils/optionsFromEnumI18n";
import { convertToOptions } from "@utils/convertToOptions";
import { optionsEnumCodeI18n } from "@utils/optionsEnumCodeI18n";
import { compareObjectsSpecific } from "@utils/compareObjectsSpecific";
import { generateExtraOrdPayDays } from "@utils/generateExtraOrdPayDays";
import { ECyclesPayroll } from "@enum/cyclesPayroll";
import { EModalState } from "@enum/modalState";
import { getPaydayTranslation } from "@utils/getPaydayTranslation";
import { cyclespaymentLabels } from "@config/payrollAgreement/payrollAgreementTab/forms/cyclespaymentLabels";
import { mediaQueryMobileSmall } from "@config/environment";
import { monthsInNumber } from "@config/payrollAgreement/payrollAgreementTab/generic/monthsInNumber";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IUseExtraordinaryCyclesForm } from "@ptypes/hooks/IUseExtraordinaryCyclesForm";
import { IServerDomain } from "@ptypes/IServerDomain";
import { IExtraordinaryCyclesEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IExtraordinaryCyclesEntry";
import { ILanguage } from "@ptypes/i18n";
import { useValuesSelect } from "../ordinaryCycles/useValuesSelect";

const useExtraordinaryCyclesForm = (props: IUseExtraordinaryCyclesForm) => {
  const {
    ref,
    editDataOption,
    typeRegularPayroll,
    loading,
    onSubmit,
    onFormValid,
    extraordinaryPayment,
    setExtraordinaryPayment,
    regularPaymentCycles,
    initialData,
  } = props;

  const createValidationSchema = () =>
    object().shape({
      nameCycle: validationRules.string.required(validationMessages.required),
      typePayment: validationRules.string.required(validationMessages.required),
      day: validationRules.number.required(validationMessages.requiredShort),
      month: validationRules.string.required(validationMessages.requiredShort),
      numberDaysUntilCut: validationRules.string.required(
        validationMessages.required,
      ),
      laborRegulatorFramework: validationRules.string.required(
        validationMessages.required,
      ),
    });

  const validationSchema = createValidationSchema();

  const initialValues: IExtraordinaryCyclesEntry = {
    nameCycle: "",
    typePayment: "",
    day: "",
    month: "",
    numberDaysUntilCut: "",
    laborRegulatorFramework: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit ?? (() => true),
  });
  const { appData } = useContext(AuthAndPortalData);
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [entries, setEntries] = useState<IEntry[]>(
    extraordinaryPayment as IEntry[],
  );

  const { montlyCourtDaysOptions: numberDaysUntilCutOptions } =
    useValuesSelect();
  const [entryDeleted, setEntryDeleted] = useState<string | number>("");

  const isMobile = useMediaQuery(mediaQueryMobileSmall);

  const [dayOptions, setDayOptions] = useState<IServerDomain[] | undefined>([]);

  const { enumData: months } = useEnumerators({
    enumDestination: ECyclesPayroll.MONTHS,
    businessUnits: appData.businessUnit.publicCode,
    token: appData.token,
  });
  const monthOptions = optionsFromEnumI18n(
    appData.language as ILanguage,
    months,
  );

  useEffect(() => {
    if (months && months.length > 0) {
      const monthOptionsUpdated = optionsFromEnumI18n(
        appData.language as ILanguage,
        months,
      );

      setEntries((prev) =>
        prev.map((entry) => {
          const extraordinaryEntry = entry as IExtraordinaryCyclesEntry;
          if (
            extraordinaryEntry.payday &&
            extraordinaryEntry.payday.includes("-")
          ) {
            const [month, day] = extraordinaryEntry.payday.split("-");

            return {
              ...entry,
              paydayTranslation: `${getPaydayTranslation(
                monthOptionsUpdated as IOption[],
                month,
              )}-${day}`,
            };
          }

          return entry;
        }),
      );
    }
  }, [months, appData.language]);

  const { enumData } = useEnumerators({
    enumDestination: ECyclesPayroll.EXTRAORDINARY_TYPE,
    businessUnits: appData.businessUnit.publicCode,
    token: appData.token,
  });

  const typePaymentOptions = optionsFromEnumerators(enumData);

  const { enumData: laborRegulator } = useEnumeratorsICardes({
    enumCredicar: ECyclesPayroll.COLOMBIAN_LABOR_LEGAL,
    businessUnits: appData.businessUnit.publicCode,
    token: appData.token,
  });

  const laborRegulatorOptions = optionsEnumCodeI18n(
    appData.language as ILanguage,
    laborRegulator,
    true,
  );

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (onFormValid) {
      formik.validateForm().then((errors) => {
        const isFormValid = Object.keys(errors).length === 0;
        onFormValid(isFormValid);
      });
    }
  }, [formik.values, onFormValid]);

  const handleChange = (name: string, value: string) => {
    formik.setFieldValue(name, value);
  };

  const valuesEqual =
    JSON.stringify(initialValues) === JSON.stringify(formik.values);

  const valuesEqualBoton = compareObjectsSpecific(
    initialData as IExtraordinaryCyclesEntry[],
    entries as IExtraordinaryCyclesEntry[],
    ["paydayTranslation"],
  );

  useEffect(() => {
    if (!formik.values.month) {
      setDayOptions([]);
      formik.setFieldValue("day", "");
    }

    const codeMonth = monthOptions.find(
      (month) => month.value === formik.values.month,
    )?.id;

    if (formik.values.month && !typeRegularPayroll) {
      formik.setFieldValue("day", "");
      const options: IServerDomain[] = convertToOptions(
        daysOfMonth(monthsInNumber[codeMonth as keyof typeof monthsInNumber]),
      );
      setDayOptions(options);
    }

    if (formik.values.month && typeRegularPayroll && regularPaymentCycles) {
      formik.setFieldValue("day", "");
      const options: IServerDomain[] = convertToOptions(
        generateExtraOrdPayDays(
          regularPaymentCycles,
          monthsInNumber[codeMonth as keyof typeof monthsInNumber],
        ),
      );
      setDayOptions(options);
    }
  }, [formik.values.month, regularPaymentCycles]);

  useEffect(() => {
    const updateButton = () => {
      if (editDataOption) {
        setIsDisabledButton(entries.length === 0 || valuesEqualBoton);
      } else {
        setIsDisabledButton(typeRegularPayroll ? false : entries.length === 0);
      }
    };
    updateButton();
  }, [loading, initialValues, editDataOption, entries]);

  const handleToggleModal = () => {
    setShowModal(!showModal);
    formik.resetForm();
  };

  const createNewCycle = (id: number) => ({
    id: `cycle-${addLeadingZero(id).toString()}-${formik.values.nameCycle}-${formik.values.month}-${formik.values.day}`,
    nameCycle: formik.values.nameCycle,
    typePayment:
      normalizeEnumTranslation(formik.values.typePayment)?.name ??
      formik.values.typePayment,
    payday: `${formik.values.month}-${formik.values.day}`,
    paydayTranslation: `${getPaydayTranslation(monthOptions as IOption[], formik.values.month as string)}-${formik.values.day}`,
    numberDaysUntilCut: formik.values.numberDaysUntilCut,
    laborRegulatorFramework: formik.values.laborRegulatorFramework,
  });

  const handleAddCycle = () => {
    setEntries((prev) => {
      if (!Array.isArray(prev)) return [];
      return [...prev, createNewCycle(prev.length + 1)];
    });

    setExtraordinaryPayment((prev) => {
      if (!Array.isArray(prev)) return [];
      return [...prev, createNewCycle(prev.length + 1)];
    });

    setShowModal(false);
    formik.resetForm();
  };

  useEffect(() => {
    if (entryDeleted) {
      setEntries((prev) => prev.filter((entry) => entry.id !== entryDeleted));

      setExtraordinaryPayment((prev) =>
        prev.filter((entry) => entry.id !== entryDeleted),
      );
    }
  }, [entryDeleted]);

  const labelButtonPrevious = editDataOption
    ? cyclespaymentLabels.cancelButton
    : cyclespaymentLabels.previousButton;

  const labelButtonNext = editDataOption
    ? cyclespaymentLabels.sendButton
    : cyclespaymentLabels.nextButton;

  const columnWidths = isMobile ? [65, 12] : [30, 20, 20, 20];

  useEffect(() => {
    eventBus.emit(EModalState.SECOND_MODAL_STATE, showModal);
  }, [showModal]);

  return {
    formik,
    isDisabledButton,
    valuesEqual,
    entries,
    showModal,
    isMobile,
    typePaymentOptions,
    numberDaysUntilCutOptions,
    monthOptions,
    dayOptions,
    laborRegulatorOptions,
    labelButtonPrevious,
    labelButtonNext,
    columnWidths,
    handleChange,
    handleAddCycle,
    handleToggleModal,
    setEntryDeleted,
  };
};

export { useExtraordinaryCyclesForm };
