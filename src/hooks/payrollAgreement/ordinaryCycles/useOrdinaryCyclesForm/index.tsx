import { useContext, useEffect, useImperativeHandle, useState } from "react";
import { useFormik } from "formik";
import { useMediaQuery } from "@inubekit/inubekit";
import { object } from "yup";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEnumeratorsICardes } from "@hooks/useEnumeratorsIcardes";
import { validationRules } from "@validations/validationRules";
import { validationMessages } from "@validations/validationMessages";
import { ECyclesPayroll } from "@enum/cyclesPayroll";
import { optionsFromEnumI18n } from "@utils/optionsFromEnumI18n";
import { getNextId } from "@utils/getNextId";
import { addLeadingZero } from "@utils/addLeadingZero";
import { payDayValues } from "@utils/payDayValues";
import { normalizeEnumTranslation } from "@utils/normalizeEnumTranslation";
import { compareObjects } from "@utils/compareObjects";
import { cyclespaymentLabels } from "@config/payrollAgreement/payrollAgreementTab/forms/cyclespaymentLabels";
import { includedPeriodicity } from "@config/payrollAgreement/payrollAgreementTab/assisted/excludedPeriodicity";
import { enviroment } from "@config/environment";
import { IOrdinaryCyclesEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IOrdinaryCyclesEntry";
import { ILanguage } from "@ptypes/i18n";
import { IServerDomain } from "@ptypes/IServerDomain";
import { IUseOrdinaryCyclesForm } from "@ptypes/hooks/IUseOrdinaryCyclesForm";
import { IEntry } from "@ptypes/design/table/IEntry";
import { useValuesSelect } from "../useValuesSelect";

const useOrdinaryCyclesForm = (props: IUseOrdinaryCyclesForm) => {
  const {
    ref,
    editDataOption,
    loading,
    onSubmit,
    onFormValid,
    regularPaymentCycles,
    setRegularPaymentCycles,
    setIncludeExtraPayDay,
    setRegularDeleted,
    initialData,
  } = props;

  const createValidationSchema = () =>
    object().shape({
      nameCycle: validationRules.string.required(validationMessages.required),
      periodicity: validationRules.string.required(validationMessages.required),
      payday: validationRules.string.required(validationMessages.required),
      numberDaysUntilCut: validationRules.string.required(
        validationMessages.required,
      ),
      laborRegulatorFramework: validationRules.string.required(
        validationMessages.required,
      ),
    });

  const validationSchema = createValidationSchema();

  const isMobile = useMediaQuery("(max-width: 990px)");

  const initialValues: IOrdinaryCyclesEntry = {
    cycleId: "",
    nameCycle: "",
    periodicity: "",
    payday: "",
    numberDaysUntilCut: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit ?? (() => true),
  });

  const { appData } = useContext(AuthAndPortalData);

  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [entries, setEntries] = useState<IEntry[]>(
    regularPaymentCycles as IEntry[],
  );
  const [entryDeleted, setEntryDeleted] = useState<string | number>("");
  const [paydayOptions, setPaydayOptions] = useState<
    IServerDomain[] | undefined
  >([]);
  const [numberDaysUntilCutOptions, setNumberDaysUntilCutOptions] = useState<
    IServerDomain[] | undefined
  >([]);

  const {
    periodicityOptions,
    payDayOrdinaryOptions,
    courtDaysOrdinaryOptions,
  } = useValuesSelect();

  const { enumData: laborRegulator } = useEnumeratorsICardes({
    enumCredicar: ECyclesPayroll.COLOMBIAN_LABOR_LEGAL,
    businessUnits: appData.businessUnit.publicCode,
  });

  const laborRegulatorOptions = optionsFromEnumI18n(
    enviroment.VITE_LANGUAGE as ILanguage,
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

  useEffect(() => {
    if (!formik.values.periodicity) {
      formik.setFieldValue("payday", "");
      formik.setFieldValue("numberDaysUntilCut", "");
      setPaydayOptions([]);
      setNumberDaysUntilCutOptions([]);
    }

    if (formik.values.periodicity) {
      formik.setFieldValue("payday", "");
      formik.setFieldValue("numberDaysUntilCut", "");
      const Payday = payDayOrdinaryOptions(formik.values.periodicity);
      setPaydayOptions(Payday);

      const numberDaysUntilCut = courtDaysOrdinaryOptions(
        formik.values.periodicity,
      );
      setNumberDaysUntilCutOptions(numberDaysUntilCut as IServerDomain[]);
    }
  }, [formik.values.periodicity]);

  const valuesEqual =
    JSON.stringify(initialValues) === JSON.stringify(formik.values);

  const valuesEqualBoton = compareObjects(initialData, entries);

  useEffect(() => {
    const updateButton = () => {
      if (editDataOption) {
        setIsDisabledButton(entries.length === 0 || valuesEqualBoton);
      } else {
        setIsDisabledButton(loading ?? !formik.isValid);
      }
    };
    updateButton();
  }, [
    entries,
    loading,
    initialData,
    entries,
    formik.isValid,
    initialValues,
    editDataOption,
  ]);

  const handleToggleModal = () => {
    setPaydayOptions([]);
    setNumberDaysUntilCutOptions([]);
    formik.resetForm();
    setShowAddModal(!showAddModal);
  };

  const onToggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

  const createNewCycle = (id: number) => ({
    id: id,
    cycleId: addLeadingZero(id).toString(),
    nameCycle: formik.values.nameCycle,
    periodicity:
      normalizeEnumTranslation(formik.values.periodicity ?? "")?.name ??
      formik.values.periodicity,
    payday: payDayValues(
      formik.values.periodicity ?? "",
      formik.values.payday ?? "",
    ),
    numberDaysUntilCut: formik.values.numberDaysUntilCut,
  });

  const handleAddCycle = () => {
    setEntries((prev) => {
      if (!Array.isArray(prev)) return [];
      const nextId = getNextId(prev);
      return [...prev, createNewCycle(nextId)];
    });

    setRegularPaymentCycles((prev) => {
      if (!Array.isArray(prev)) return [];
      const nextId = getNextId(prev as IEntry[]);
      return [...prev, createNewCycle(nextId)];
    });

    formik.resetForm();
    setShowAddModal(false);
  };

  useEffect(() => {
    const newData = regularPaymentCycles.filter((entry) =>
      includedPeriodicity.includes(entry.periodicity ?? ""),
    );

    setIncludeExtraPayDay(newData);
  }, [regularPaymentCycles]);

  useEffect(() => {
    if (entryDeleted) {
      setEntries((prev) => prev.filter((entry) => entry.id !== entryDeleted));

      setRegularPaymentCycles((prev) =>
        prev.filter((entry) => entry.id !== entryDeleted),
      );

      setRegularDeleted(() =>
        regularPaymentCycles.filter((entry) => entry.id === entryDeleted),
      );
    } else {
      setRegularDeleted([]);
    }
  }, [entryDeleted]);

  const columnWidths = isMobile ? [70, 30, 20, 18] : [8, 30, 20, 18, 15];

  const labelButtonPrevious = editDataOption
    ? cyclespaymentLabels.cancelButton
    : cyclespaymentLabels.previousButton;

  const labelButtonNext = editDataOption
    ? cyclespaymentLabels.sendButton
    : cyclespaymentLabels.nextButton;

  const disabledButtonNext = editDataOption
    ? isDisabledButton && !loading
    : entries.length === 0;

  return {
    formik,
    isDisabledButton,
    valuesEqual,
    entries,
    showAddModal,
    showInfoModal,
    numberDaysUntilCutOptions,
    paydayOptions,
    periodicityOptions,
    laborRegulatorOptions,
    isMobile,
    columnWidths,
    labelButtonPrevious,
    labelButtonNext,
    disabledButtonNext,
    onToggleInfoModal,
    handleChange,
    handleAddCycle,
    handleToggleModal,
    setEntryDeleted,
  };
};

export { useOrdinaryCyclesForm };
