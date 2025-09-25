import { useContext, useEffect, useImperativeHandle, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";
import { useFormik } from "formik";
import { object } from "yup";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEnumeratorsCrediboard } from "@hooks/useEnumeratorsCrediboard";
import { validationRules } from "@validations/validationRules";
import { EPayrollAgreement } from "@enum/payrollAgreement";
import { mediaQueryMobile } from "@config/environment";
import { decisionsGenLabels } from "@config/generalCreditPolicies/assisted/decisionsGenLabels";
import { IUseDecisionsGenForm } from "@ptypes/hooks/IUseDecisionsGenForm";
import { IServerDomain } from "@ptypes/IServerDomain";
import { IEnumerators } from "@ptypes/IEnumerators";

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
      additionalDebtors: validationRules.boolean,
      realGuarantees: validationRules.boolean,
      PaymentCapacityBasedCreditLimit: validationRules.boolean,
      ReciprocityBasedCreditLimit: validationRules.boolean,
      RiskAnalysisBasedCreditLimit: validationRules.boolean,
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

  const { appData } = useContext(AuthAndPortalData);
  const [showInformationReferenceModal, setShowInfoRefModal] = useState(false);
  const [showInformationMethodModal, setShowInfoMetModal] = useState(false);
  const [showInformationObligationModal, setShowInfoObligModal] =
    useState(false);
  const [isDisabledButton, setIsDisabledButton] = useState(false);

  const { enumData: methods } = useEnumeratorsCrediboard({
    businessUnits: appData.businessUnit.publicCode,
    enumQuery: EPayrollAgreement.METHODS,
  });
  const methodsOptions: IServerDomain[] = methods.map((item: IEnumerators) => {
    const name =
      item.i18n?.[appData.language as keyof typeof item.i18n] ??
      item.description;

    return {
      id: item.code ?? "",
      label: name ?? "",
      value: item.code ?? "",
    };
  });

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
      setShowReciprocity(formik.values.ReciprocityBasedCreditLimit);
    }
  }, [formik.values.ReciprocityBasedCreditLimit, setShowReciprocity]);

  useEffect(() => {
    if (setShowFactor) {
      setShowFactor(formik.values.RiskAnalysisBasedCreditLimit);
    }
  }, [formik.values.RiskAnalysisBasedCreditLimit, setShowFactor]);

  const valuesEmpty = Object.values(formik.values).every(
    (value) => value === "" || value === null || value === undefined,
  );

  const valuesEqualBoton =
    JSON.stringify(initialValuesEdit) === JSON.stringify(formik.values);

  useEffect(() => {
    const {
      PaymentCapacityBasedCreditLimit,
      ReciprocityBasedCreditLimit,
      RiskAnalysisBasedCreditLimit,
    } = formik.values;
    const requiredFields = [
      PaymentCapacityBasedCreditLimit,
      ReciprocityBasedCreditLimit,
      RiskAnalysisBasedCreditLimit,
    ];
    const validatefields = requiredFields.every((field) => !field);

    const updateButton = () => {
      if (editDataOption) {
        setIsDisabledButton(
          !formik.isValid || validatefields || valuesEmpty || valuesEqualBoton,
        );
      } else {
        setIsDisabledButton(!formik.isValid || validatefields);
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
    methodsOptions,
    handleInformationReferenceModal,
    handleInformationObligationModal,
    handleInformationMethodsModal,
    handleToggleChange,
  };
};

export { useDecisionsGenForm };
