import { useEffect, useImperativeHandle, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";
import { useFormik } from "formik";
import { object } from "yup";

import { validationRules } from "@validations/validationRules";
import { validationMessages } from "@validations/validationMessages";
import { mediaQueryMobile } from "@config/environment";
import { IUseDateVerificationForm } from "@ptypes/hooks/generalCreditPolicies/IUseDateVerificationForm";

const useDateVerification = (props: IUseDateVerificationForm) => {
  const { initialValues, ref, onSubmit, setDateVerification } = props;

  const createValidationSchema = () =>
    object().shape({
      date: validationRules.string.required(validationMessages.required),
    });

  const validationSchema = createValidationSchema();

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit: onSubmit ?? (() => true),
  });

  useImperativeHandle(ref, () => formik);

  const [isDisabledButton, setIsDisabledButton] = useState(false);

  useEffect(() => {
    setDateVerification({ date: formik.values.date });
  }, [formik.values.date]);

  useEffect(() => {
    const updateButton = () => {
      setIsDisabledButton(!formik.isValid);
    };
    updateButton();
  }, [formik.values, formik.isValid, initialValues]);

  const isMobile = useMediaQuery(mediaQueryMobile);

  return {
    formik,
    isMobile,
    isDisabledButton,
  };
};

export { useDateVerification };
