import { useEffect, useImperativeHandle, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";
import { useFormik } from "formik";
import { object } from "yup";

import { validationRules } from "@validations/validationRules";
import { validationMessages } from "@validations/validationMessages";
import { mediaQueryMobile } from "@config/environment";
import { IUseDecisionsGenForm } from "@ptypes/hooks/IUseDecisionsGenForm";
import { decisionsGenLabels } from "@config/generalCreditPolicies/assisted/decisionsGenLabels";

const useDecisionsGenForm = (props: IUseDecisionsGenForm) => {
  const {
    initialValues,
    ref,
    editDataOption,
    onSubmit,
    onFormValid,
    handleFormValidChange,
    initialValuesEdit,
    setShowReciprocity,
    setShowFactor,
  } = props;

  const createValidationSchema = () =>
    object().shape({
      reference: validationRules.string.required(validationMessages.required),
      additionalDebtors: validationRules.boolean,
      sourcesIncome: validationRules.boolean,
      financialObligations: validationRules.boolean,
      realGuarantees: validationRules.boolean,
      calculation: validationRules.boolean,
      reciprocity: validationRules.boolean,
      factor: validationRules.boolean,
    });

  const validationSchema = createValidationSchema();

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnMount: true,
    onSubmit: onSubmit ?? (() => true),
  });

  useImperativeHandle(ref, () => formik);

  const [showInformationReferenceModal, setShowInfoRefModal] = useState(false);
  const [showInformationMethodModal, setShowInfoMetModal] = useState(false);
  const [showInformationObligationModal, setShowInfoObligModal] =
    useState(false);
  const [isDisabledButton, setIsDisabledButton] = useState(false);

  const handleInformationReferenceModal = () => {
    setShowInfoRefModal(!showInformationReferenceModal);
  };

  const handleInformationMethodsModal = () => {
    setShowInfoMetModal(!showInformationMethodModal);
  };

  const handleInformationObligationModal = () => {
    setShowInfoObligModal(!showInformationObligationModal);
  };

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    formik.setFieldValue(name, checked);
  };

  useEffect(() => {
    if (setShowReciprocity) {
      setShowReciprocity(formik.values.reciprocity);
    }
  }, [formik.values.reciprocity, setShowReciprocity]);

  useEffect(() => {
    if (setShowFactor) {
      setShowFactor(formik.values.factor);
    }
  }, [formik.values.factor, setShowFactor]);

  const handleChange = (name: string, value: string) => {
    formik.setFieldValue(name, value).then(() => {
      formik.validateForm().then((errors) => {
        formik.setErrors(errors);
      });
    });
  };

  const valuesEmpty = Object.values(formik.values).every(
    (value) => value === "" || value === null || value === undefined,
  );

  const valuesEqualBoton =
    JSON.stringify(initialValuesEdit) === JSON.stringify(formik.values);

  useEffect(() => {
    const updateButton = () => {
      if (editDataOption) {
        setIsDisabledButton(!formik.isValid || valuesEmpty || valuesEqualBoton);
      } else {
        setIsDisabledButton(!formik.isValid);
      }
    };
    updateButton();
  }, [formik.values, formik.isValid, initialValues, editDataOption]);

  useEffect(() => {
    if (onFormValid) {
      formik.validateForm().then((errors) => {
        const isFormValid = Object.keys(errors).length === 0;
        onFormValid(isFormValid);
      });
    }
  }, [formik.values, onFormValid]);

  useEffect(() => {
    if (handleFormValidChange) {
      handleFormValidChange(!formik.isValid);
    }
  }, [formik.isValid, handleFormValidChange]);

  const isMobile = useMediaQuery(mediaQueryMobile);

  const buttonLabel = editDataOption
    ? decisionsGenLabels.buttonSaveLabel
    : decisionsGenLabels.buttonNextLabel;

  return {
    formik,
    showInformationReferenceModal,
    showInformationMethodModal,
    showInformationObligationModal,
    isMobile,
    isDisabledButton,
    buttonLabel,
    handleInformationReferenceModal,
    handleInformationObligationModal,
    handleInformationMethodsModal,
    handleChange,
    handleToggleChange,
  };
};

export { useDecisionsGenForm };
