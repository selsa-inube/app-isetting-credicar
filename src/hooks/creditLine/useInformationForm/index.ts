import { useMediaQuery } from "@inubekit/inubekit";
import { useEffect, useImperativeHandle } from "react";
import { useFormik } from "formik";
import { object } from "yup";

import { validationRules } from "@validations/validationRules";
import { validationMessages } from "@validations/validationMessages";
import { mediaQueryTablet } from "@config/environment";
import { IUseInformationForm } from "@ptypes/hooks/creditLines/IUseInformationForm";

const useInformationForm = (props: IUseInformationForm) => {
  const { initialValues, ref, onSubmit, onFormValid } = props;

  const createValidationSchema = () =>
    object().shape({
      nameLine: validationRules.string.required(validationMessages.required),
      aliasLine: validationRules.string.required(validationMessages.required),
      descriptionLine: validationRules.string.required(
        validationMessages.required,
      ),
    });

  const validationSchema = createValidationSchema();

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit: onSubmit ?? (() => true),
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

  const isMobile = useMediaQuery(mediaQueryTablet);

  return {
    formik,
    isMobile,
  };
};

export { useInformationForm };
