import { useEffect, useImperativeHandle } from "react";
import { useFormik } from "formik";
import { object } from "yup";
import { validationRules } from "@validations/validationRules";
import { validationMessages } from "@validations/validationMessages";
import { IUseNameAndDescriptionForm } from "@ptypes/hooks/creditLines/IUseNameAndDescriptionForm";

const useNameAndDescriptionForm = (props: IUseNameAndDescriptionForm) => {
  const { ref, onFormValid, initialValues } = props;

  const validationSchema = object().shape({
    aliasLine: validationRules.string.required(validationMessages.required),
    nameLine: validationRules.string.required(validationMessages.required),
    descriptionLine: validationRules.string.required(
      validationMessages.required,
    ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit: () => void 0,
  });

  useEffect(() => {
    formik.setValues(initialValues);
  }, [
    initialValues.aliasLine,
    initialValues.nameLine,
    initialValues.descriptionLine,
  ]);

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (onFormValid) {
      formik.validateForm().then((errors) => {
        const isFormValid = Object.keys(errors).length === 0;
        onFormValid(isFormValid);
      });
    }
  }, [formik.values, onFormValid]);

  return {
    formik,
  };
};

export { useNameAndDescriptionForm };
