import {
  IStackAlignItem,
  IStackDirectionAlignment,
  useMediaQuery,
} from "@inubekit/inubekit";
import { useEffect, useImperativeHandle, useState } from "react";
import { MdOutlineFax } from "react-icons/md";
import { FormikProps, useFormik } from "formik";
import { object } from "yup";

import { validationRules } from "@validations/validationRules";
import { validationMessages } from "@validations/validationMessages";
import { tokens } from "@design/tokens";
import { EMoneyDestination } from "@enum/moneyDestination";
import { normalizeCodeDestination } from "@utils/destination/normalizeCodeDestination";
import { normalizeDestination } from "@utils/destination/normalizeDestination";
import { normalizeEditDestination } from "@utils/destination/normalizeEditDestination";
import { normalizeIconDestination } from "@utils/destination/normalizeIconDestination";
import { normalizeIconTextDestination } from "@utils/destination/normalizeIconTextDestination";
import { mediaQueryTablet } from "@config/environment";
import { generalInfoLabels } from "@config/moneyDestination/moneyDestinationTab/form/generalInfoLabels";
import { IGeneralInformationEntry } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IGeneralInformationEntry";
import { IServerDomain } from "@ptypes/IServerDomain";
import { IEnumerators } from "@ptypes/IEnumerators";

const useGeneralInformationForm = (
  enumData: IEnumerators[],
  initialValues: IGeneralInformationEntry,
  ref: React.ForwardedRef<FormikProps<IGeneralInformationEntry>>,
  editDataOption: boolean,
  loading: boolean | undefined,
  onSubmit: ((values: IGeneralInformationEntry) => void) | undefined,
  onFormValid: React.Dispatch<React.SetStateAction<boolean>> | undefined,
  initialGeneralInfData?: IGeneralInformationEntry,
) => {
  const createValidationSchema = () =>
    object().shape({
      nameDestination: validationRules.string
        .required(validationMessages.required)
        .max(36, generalInfoLabels.maxLengthName),
      description: validationRules.string.required(validationMessages.required),
      icon: validationRules.string,
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
  const [icon, setIcon] = useState<JSX.Element | undefined>(
    editDataOption && normalizeIconDestination(initialValues.icon)?.icon ? (
      normalizeIconDestination(initialValues.icon)?.icon
    ) : (
      <></>
    ),
  );

  const optionsDestination: IServerDomain[] = enumData.map((item) => {
    const name = normalizeCodeDestination(item.code)?.name as unknown as string;
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
      const description =
        normalizeDestination(enumData, value)?.description ?? "";

      if (value === "") {
        formik.setFieldValue("description", "");
      } else {
        const currentDescription = formik.values.description ?? "";
        const descriptionToAdd = description.trim();

        if (equalValueName) {
          formik.setFieldValue("description", descriptionToAdd);
        } else {
          const newDescription =
            `${currentDescription} ${descriptionToAdd}`.trim();
          formik.setFieldValue("description", newDescription);
        }
      }
    }
  };

  const addData = enumData.find(
    (item) => item.value === formik.values.nameDestination,
  )?.type;

  const valuesEqual =
    JSON.stringify(initialValues) === JSON.stringify(formik.values);

  const valuesEqualBoton =
    JSON.stringify(initialGeneralInfData) === JSON.stringify(formik.values);

  const valuesEmpty = Object.values(formik.values).every(
    (value) => value === "" || value === null || value === undefined,
  );

  useEffect(() => {
    const updateButton = () => {
      if (editDataOption) {
        setIsDisabledButton(!formik.isValid || valuesEmpty || valuesEqualBoton);
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

  useEffect(() => {
    const updateIcon = () => {
      const getNormalizedIcon = (value: string | undefined) =>
        normalizeIconDestination(value ?? "")?.icon;

      const isNameDestinationEqual =
        JSON.stringify(initialGeneralInfData?.nameDestination) ===
        JSON.stringify(formik.values.nameDestination);

      let iconData = getNormalizedIcon(initialValues.icon);

      if (editDataOption && formik.values.nameDestination) {
        const editData = normalizeEditDestination(enumData, formik.values.icon);

        iconData =
          editData && isNameDestinationEqual ? (
            getNormalizedIcon(editData?.value)
          ) : addData ? (
            getNormalizedIcon(addData)
          ) : (
            <MdOutlineFax size={24} />
          );

        iconData ??= getNormalizedIcon(initialValues.icon);
      } else {
        iconData = getNormalizedIcon(addData);
      }

      if (editDataOption && valuesEqual) {
        formik.setFieldValue("icon", initialValues.icon);
      } else {
        const normalizedIconValue =
          normalizeIconTextDestination(iconData)?.value ??
          EMoneyDestination.ICON_DEFAULT;
        formik.setFieldValue("icon", normalizedIconValue);
      }

      setIcon(iconData);
    };

    updateIcon();
  }, [
    editDataOption,
    formik.values.icon,
    formik.values.nameDestination,
    enumData,
    initialValues.nameDestination,
    addData,
    initialGeneralInfData,
    valuesEqual,
  ]);

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

  return {
    autosuggestValue,
    optionsDestination,
    formik,
    isDisabledButton,
    icon,
    labelButtonNext,
    isMobile,
    widthStack,
    directionStack,
    alignItemsIcon,
    paddingIcon,
    handleChange,
    handleReset,
    valuesEqual,
    valuesEqualBoton,
    buttonDisabledState,
  };
};

export { useGeneralInformationForm };
