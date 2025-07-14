import { useMediaQuery } from "@inubekit/inubekit";
import { useEffect, useImperativeHandle, useState } from "react";
import { FormikProps, useFormik } from "formik";
import { object } from "yup";

import { validationRules } from "@validations/validationRules";
import { validationMessages } from "@validations/validationMessages";
import {
  ICreditProspectEntry,
  IOptionsProspect,
} from "@design/forms/creditProspect/types";
import { mediaQueryTablet } from "@config/environment";

const useCreditProspectForm = (
  optionsProspect: IOptionsProspect[],
  initialValues: ICreditProspectEntry,
  ref: React.ForwardedRef<FormikProps<ICreditProspectEntry>>,
  onSubmit: ((values: ICreditProspectEntry) => void) | undefined,
  onFormValid: React.Dispatch<React.SetStateAction<boolean>> | undefined,
  setOptionsProspect: React.Dispatch<React.SetStateAction<IOptionsProspect[]>>,
) => {
  const [additionalDebtorsField, setAdditionalDebtorsField] = useState(false);

  const validationSchema = object().shape({
    additionalDebtors: validationRules.string,
  });

  const [dynamicValidationSchema, setDynamicValidationSchema] =
    useState(validationSchema);

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicValidationSchema,
    validateOnBlur: true,
    onSubmit: onSubmit ?? (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    const isAdditionalDebtorsActive = optionsProspect.some(
      (entry) => entry.id === "3" && entry.isActive,
    );
    setAdditionalDebtorsField(isAdditionalDebtorsActive);
  }, [optionsProspect]);

  useEffect(() => {
    setDynamicValidationSchema(
      validationSchema.shape({
        additionalDebtors: validationRules.string.required(
          validationMessages.required,
        ),
      }),
    );
  }, [optionsProspect, additionalDebtorsField]);

  useEffect(() => {
    if (onFormValid) {
      if (!additionalDebtorsField) {
        onFormValid(true);
      }
    }
  }, [additionalDebtorsField, onFormValid]);

  useEffect(() => {
    if (onFormValid && additionalDebtorsField) {
      formik.validateForm().then((errors) => {
        const isFormValid = Object.keys(errors).length === 0;
        onFormValid(isFormValid);
      });
    }
  }, [formik.values, additionalDebtorsField, onFormValid]);

  const handleToggleEntry = (id: string) => {
    const newEntries = optionsProspect.map((entry) => {
      if (entry.id === id) {
        return {
          ...entry,
          isActive: !entry.isActive,
        };
      }
      return entry;
    });

    setOptionsProspect(newEntries);
  };

  const handleChange = (name: string, value: string) => {
    formik.setFieldValue(name, value).then(() => {
      formik.validateForm().then((errors) => {
        formik.setErrors(errors);
      });
    });
  };

  const isMobile = useMediaQuery(mediaQueryTablet);
  return {
    formik,
    optionsProspect,
    additionalDebtorsField,
    handleChange,
    handleToggleEntry,
    isMobile,
  };
};

export { useCreditProspectForm };
