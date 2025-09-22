import {
  IStackAlignItem,
  IStackDirectionAlignment,
  useMediaQuery,
} from "@inubekit/inubekit";
import { useContext, useEffect, useImperativeHandle, useState } from "react";
import { useFormik } from "formik";
import { object } from "yup";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { validationRules } from "@validations/validationRules";
import { validationMessages } from "@validations/validationMessages";
import { tokens } from "@design/tokens";
import { EMoneyDestination } from "@enum/moneyDestination";
import { normalizeDestination } from "@utils/destination/normalizeDestination";
import { mediaQueryTablet } from "@config/environment";
import { generalInfoLabels } from "@config/moneyDestination/moneyDestinationTab/form/generalInfoLabels";
import { IEnumerators } from "@ptypes/IEnumerators";
import { II18n } from "@ptypes/i18n";
import { IServerDomain } from "@ptypes/IServerDomain";
import { IUseGeneralInformationForm } from "@ptypes/hooks/moneyDestination/IUseGeneralInformationForm";

const useGeneralInformationForm = (props: IUseGeneralInformationForm) => {
  const {
    enumData,
    initialValues,
    ref,
    editDataOption,
    loading,
    creditLineValues,
    setCreditLineValues,
    onSubmit,
    onFormValid,
    initialGeneralInfData,
  } = props;

  const createValidationSchema = () =>
    object().shape({
      nameDestination: validationRules.string
        .required(validationMessages.required)
        .max(65, generalInfoLabels.maxLengthName),
      typeDestination: validationRules.string.required(
        validationMessages.required,
      ),
      description: validationRules.string.required(validationMessages.required),
      icon: validationRules.string,
      creditLine: validationRules.string,
    });

  const validationSchema = createValidationSchema();

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit ?? (() => true),
  });

  const [autosuggestValue, setAutosuggestValue] = useState(
    formik.values.nameDestination ?? "",
  );

  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const { appData } = useContext(AuthAndPortalData);

  const optionsDestination = enumData.map((item: IEnumerators) => {
    const name =
      item.i18nValue?.[appData.language as keyof typeof item.i18n] ??
      item.description;
    return {
      id: item.code,
      label: name,
      value: item.code,
    };
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (onFormValid) {
      formik.validateForm().then((errors) => {
        const isFormValid = Object.keys(errors).length === 0;
        onFormValid(isFormValid);
      });
    }
  }, [formik.values, onFormValid]);

  useEffect(() => {
    setAutosuggestValue(formik.values.nameDestination ?? "");
  }, [formik.values.nameDestination]);

  const handleChange = (name: string, value: string) => {
    setAutosuggestValue(value);
    formik.setFieldValue(name, value);

    if (name === EMoneyDestination.MONEY_DESTINATION) {
      const equalValueName = value !== formik.values.nameDestination;
      const normalizeData = normalizeDestination(enumData, value);
      const description =
        normalizeData?.i18nDescription?.[appData.language as keyof II18n] ?? "";

      if (value === "") {
        formik.setFieldValue("description", "");
        formik.setFieldValue("icon", EMoneyDestination.ICON_DEFAULT);
      } else {
        const currentDescription = formik.values.description ?? "";
        const descriptionToAdd = description.trim();

        if (equalValueName) {
          formik.setFieldValue("description", descriptionToAdd);
          const addIconFormik =
            normalizeData?.type ?? EMoneyDestination.ICON_DEFAULT;

          formik.setFieldValue("icon", addIconFormik);
        } else {
          const newDescription =
            `${currentDescription} ${descriptionToAdd}`.trim();
          formik.setFieldValue("description", newDescription);
        }
      }
    }
  };

  const valuesEqual =
    JSON.stringify(initialValues) === JSON.stringify(formik.values);

  const valuesEqualBoton =
    JSON.stringify(initialGeneralInfData) === JSON.stringify(formik.values);

  const valuesEmpty = Object.values(formik.values).every(
    (value) => value === "" || value === null || value === undefined,
  );

  useEffect(() => {
    if (editDataOption) {
      if (
        initialGeneralInfData?.nameDestination !== formik.values.nameDestination
      ) {
        formik.setFieldValue("icon", EMoneyDestination.ICON_DEFAULT);
      } else {
        formik.setFieldValue("icon", initialGeneralInfData?.icon);
      }
    }
  }, [editDataOption, formik.values]);

  useEffect(() => {
    const updateButton = () => {
      if (editDataOption) {
        setIsDisabledButton(!formik.isValid || valuesEmpty || valuesEqual);
      } else {
        setIsDisabledButton(!formik.isValid);
      }
    };
    updateButton();
  }, [
    formik.values,
    loading,
    initialGeneralInfData,
    formik.isValid,
    initialValues,
    editDataOption,
  ]);

  const handleChangeCheck = (name: string, values: string) => {
    const updatedData = creditLineValues.map((entry) =>
      entry.id === name ? { ...entry, values } : entry,
    );
    formik.setFieldValue("creditLine", values.trim());
    setCreditLineValues(updatedData);
  };

  const handleReset = () => {
    if (editDataOption && initialGeneralInfData) {
      formik.setValues(initialGeneralInfData);
    } else {
      formik.resetForm();
    }
  };

  const labelButtonNext = editDataOption
    ? generalInfoLabels.saveButton
    : generalInfoLabels.nextButton;

  const buttonDisabledState = editDataOption
    ? isDisabledButton && !loading
    : isDisabledButton;

  const isMobile = useMediaQuery(mediaQueryTablet);

  const directionStack: IStackDirectionAlignment = isMobile ? "column" : "row";
  const widthStack = isMobile ? "100%" : "350px";
  const alignItemsIcon: IStackAlignItem = isMobile ? "flex-start" : "center";
  const paddingIcon = isMobile
    ? `${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s050} ${tokens.spacing.s250}`
    : tokens.spacing.s0;

  const typeDestinationOptions: IServerDomain[] = [];

  return {
    autosuggestValue,
    optionsDestination,
    formik,
    isDisabledButton,
    labelButtonNext,
    isMobile,
    widthStack,
    directionStack,
    alignItemsIcon,
    paddingIcon,
    typeDestinationOptions,
    creditLineValues,
    handleChange,
    handleReset,
    handleChangeCheck,
    valuesEqual,
    valuesEqualBoton,
    buttonDisabledState,
  };
};

export { useGeneralInformationForm };
