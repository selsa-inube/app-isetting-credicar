import { useContext, useEffect, useImperativeHandle, useState } from "react";
import { useFormik } from "formik";
import { useMediaQuery } from "@inubekit/inubekit";
import { object } from "yup";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { validationRules } from "@validations/validationRules";
import { validationMessages } from "@validations/validationMessages";
import { useEnumerators } from "@hooks/useEnumerators";
import { EComponentAppearance } from "@enum/appearances";
import { EPayrollAgreement } from "@enum/payrollAgreement";
import { optionsFromEnumerators } from "@utils/optionsFromEnumerators";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { codeExistModal } from "@config/payrollAgreement/payrollAgreementTab/generic/codeExistModal";
import { mediaQueryTablet } from "@config/environment";
import { infoModal } from "@config/payrollAgreement/payrollAgreementTab/generic/infoModal";
import { generalInfoLabels } from "@config/payrollAgreement/payrollAgreementTab/forms/generalInfoLabels";
import { infoTypeModal } from "@config/payrollAgreement/payrollAgreementTab/generic/infoTypeModal";
import { IUseGeneralInformationForm } from "@ptypes/hooks/IUseGeneralInformationForm";
import { usePayrollAgreementData } from "../usePayrollAgreementData";

const useGeneralInformationForm = (props: IUseGeneralInformationForm) => {
  const {
    ref,
    editDataOption,
    loading,
    onSubmit,
    onFormValid,
    initialValues,
    setSourcesOfIncomeValues,
    sourcesOfIncomeValues,
    initialGeneralInfData,
  } = props;

  const { appData } = useContext(AuthAndPortalData);
  const { payrollAgreement } = usePayrollAgreementData({
    businessUnits: appData.businessUnit.publicCode,
    token: appData.token,
  });

  const codeExists = (code: string) => {
    return payrollAgreement.find(
      (item) => item.payrollForDeductionAgreementCode === String(code),
    );
  };

  const createValidationSchema = () =>
    object().shape({
      code: editDataOption
        ? validationRules.string.required(validationMessages.required)
        : validationRules.string
            .required(validationMessages.required)
            .test(
              "valid-code",
              validationMessages.code,
              (value) =>
                codeExists(value ?? "")?.payrollForDeductionAgreementCode !==
                String(value),
            ),
      abbreviatedName: validationRules.string.required(
        validationMessages.required,
      ),
      typePayroll: validationRules.string.required(validationMessages.required),
      sourcesOfIncome: validationRules.string.required(
        validationMessages.required,
      ),
      applicationDaysPayroll: validationRules.number
        .required(validationMessages.required)
        .test("exact-digits", validationMessages.maxCharacters(2), (value) => {
          if (!value) return false;
          return value.toString().length <= 2;
        }),
    });

  const validationSchema = createValidationSchema();

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    validateOnBlur: true,
    onSubmit: onSubmit ?? (() => true),
  });
  const [autosuggestValue, setAutosuggestValue] = useState(
    formik.values.applicationDaysPayroll ?? "",
  );
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showDecision, setShowDecision] = useState(false);

  const [showCodeModal, setShowCodeModal] = useState(false);

  const { enumData: typePayroll } = useEnumerators({
    enumDestination: EPayrollAgreement.TYPE_PAYROLL,
    businessUnits: appData.businessUnit.publicCode,
    token: appData.token,
  });

  const typePayrollOptions = optionsFromEnumerators(typePayroll);

  const isMobile = useMediaQuery(mediaQueryTablet);

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
    setAutosuggestValue(formik.values.applicationDaysPayroll ?? "");
  }, [formik.values.applicationDaysPayroll]);

  const handleChangeAutosuggest = (name: string, value: string) => {
    const isNumeric = /^[0-9]*$/.test(value);
    if (isNumeric) {
      setAutosuggestValue(value);
      formik.setFieldValue(name, value);
    }
  };

  useEffect(() => {
    if (payrollAgreement && !editDataOption) {
      codeExists(formik.values.code ?? "");
      const inter = setTimeout(() => {
        const codePayroll = codeExists(formik.values.code ?? "");

        if (codePayroll) {
          setShowCodeModal(true);
        } else {
          setShowCodeModal(false);
        }
      }, 500);

      return () => {
        if (inter) {
          clearTimeout(inter);
        }
      };
    }
  }, [formik.values.code]);

  const handleChangeSelect = (name: string, value: string) => {
    formik.setFieldValue(name, value);
  };

  const handleChangeCheck = (name: string, values: string) => {
    const updatedData = sourcesOfIncomeValues.map((entry) =>
      entry.id === name ? { ...entry, values } : entry,
    );
    formik.setFieldValue("sourcesOfIncome", values.trim());
    setSourcesOfIncomeValues(updatedData);
  };

  const valuesEqual =
    JSON.stringify(initialValues) === JSON.stringify(formik.values);

  const valuesEmpty = Object.values(formik.values).every(
    (value) => value === "" || value === null || value === undefined,
  );

  const valuesEqualBoton =
    JSON.stringify(initialGeneralInfData) === JSON.stringify(formik.values);

  useEffect(() => {
    const updateButton = () => {
      if (editDataOption) {
        setIsDisabledButton(!formik.isValid || valuesEmpty || valuesEqualBoton);
      } else {
        setIsDisabledButton(!formik.isValid);
      }
    };
    updateButton();
  }, [formik.values, loading, formik.isValid, initialValues, editDataOption]);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleToggleInfoTypeModal = () => {
    setShowTypeModal(!showTypeModal);
  };

  const handleToggleCodeModal = () => {
    setShowCodeModal(!showCodeModal);
  };

  const handleReset = () => {
    formik.resetForm();
    setSourcesOfIncomeValues(getDomainById("sourcesOfIncome"));
  };

  const gridTemplateRows = editDataOption
    ? isMobile
      ? "repeat(6, auto)"
      : "repeat(3, auto)"
    : isMobile
      ? "repeat(5, auto)"
      : "repeat(3, 1fr)";

  const labelButtonPrevious = editDataOption
    ? generalInfoLabels.cancel
    : generalInfoLabels.previous;

  const labelButtonNext = editDataOption
    ? generalInfoLabels.send
    : generalInfoLabels.next;

  const {
    title: titleCodeModal,
    description: descriptionCodeModal,
    actionText: actionTextCodeModal,
    moreDetails: moreDetailsCode,
  } = codeExistModal;

  useEffect(() => {
    const decision = showModal || showTypeModal;
    setShowDecision(decision);
  }, [showModal, showTypeModal]);

  const modal = () => {
    const initial = {
      title: "",
      subtitle: "",
      description: "",
      actionText: "",
      moreDetails: "",
      icon: <></>,
      onCloseModal: () => void 0,
      onClick: () => void 0,
      withCancelButton: false,
      withIcon: false,
      appearance: EComponentAppearance.PRIMARY,
      appearanceButton: EComponentAppearance.PRIMARY,
    };

    if (showModal) {
      return {
        ...infoModal,
        onCloseModal: handleToggleModal,
        onClick: handleToggleModal,
        withCancelButton: false,
        withIcon: true,
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    if (showTypeModal) {
      return {
        ...infoTypeModal,
        onCloseModal: handleToggleInfoTypeModal,
        onClick: handleToggleInfoTypeModal,
        withCancelButton: false,
        withIcon: true,
        moreDetails: "",
        appearance: EComponentAppearance.WARNING,
        appearanceButton: EComponentAppearance.WARNING,
      };
    }

    return initial;
  };

  const modalData = modal();

  return {
    autosuggestValue,
    formik,
    isDisabledButton,
    showModal,
    sourcesOfIncomeValues,
    valuesEqual,
    isMobile,
    typePayrollOptions,
    gridTemplateRows,
    labelButtonPrevious,
    labelButtonNext,
    showCodeModal,
    titleCodeModal,
    descriptionCodeModal,
    actionTextCodeModal,
    moreDetailsCode,
    modalData,
    showDecision,
    handleToggleInfoTypeModal,
    handleToggleCodeModal,
    handleChangeSelect,
    handleChangeAutosuggest,
    handleChangeCheck,
    handleReset,
    handleToggleModal,
  };
};

export { useGeneralInformationForm };
