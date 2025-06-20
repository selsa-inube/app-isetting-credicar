import { useEffect, useImperativeHandle, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";
import { useFormik } from "formik";
import { object } from "yup";

import { validationRules } from "@validations/validationRules";
import { validationMessages } from "@validations/validationMessages";
import { mediaQueryMobile } from "@config/environment";
import { IUseDateVerificationForm } from "@ptypes/hooks/generalCreditPolicies/IUseDateVerificationForm";
import { formatDate } from "@utils/date/formatDate";

const useDateVerification = (props: IUseDateVerificationForm) => {
  const { initialValues, ref, onSubmit, setDateVerification } = props;

  const dateCurrent = String(formatDate(new Date()));

  const createValidationSchema = () =>
    object().shape({
      date: validationRules.string
        .required(validationMessages.required)
        .test(
          "max-date",
          "La fecha no puede ser mayor a la actual",
          (value) => {
            if (!value) return true;
            return value <= dateCurrent;
          },
        ),
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
