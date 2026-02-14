import {
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useMediaQuery } from "@inubekit/inubekit";
import { useFormik } from "formik";
import { object } from "yup";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEnumeratorsCrediboard } from "@hooks/useEnumeratorsCrediboard";
import { EGeneralPolicies } from "@enum/generalPolicies";
import { ECreditLines } from "@enum/creditLines";
import { ENameRules } from "@enum/nameRules";
import { validationRules } from "@validations/validationRules";
import { mediaQueryMobile } from "@config/environment";
import { generalMethods } from "@config/generalCreditPolicies/assisted/generalMethods";
import { decisionsGenLabels } from "@config/generalCreditPolicies/assisted/decisionsGenLabels";
import { IUseDecisionsGenForm } from "@ptypes/hooks/IUseDecisionsGenForm";
import { IServerDomain } from "@ptypes/IServerDomain";
import { IEnumerators } from "@ptypes/IEnumerators";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { useMultipleEnumRules } from "../useMultipleEnumRules";

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
    setOptionsGenDecision,
  } = props;

  const createValidationSchema = () =>
    object().shape({
      additionalDebtors: validationRules.boolean,
      realGuarantees: validationRules.boolean,
      PaymentCapacityBasedCreditLimit: validationRules.boolean,
      ReciprocityBasedCreditLimit: validationRules.boolean,
      RiskAnalysisBasedCreditLimit: validationRules.boolean,
      DATACREDITO_EXPERIAN: validationRules.boolean,
      TRANSUNION: validationRules.boolean,
      inquiryValidityPeriod: validationRules.number,
      toggleLineCreditPayrollAdvance: validationRules.boolean,
      lineCreditPayrollAdvance: validationRules.string,
      toggleLineCreditPayrollSpecialAdvance: validationRules.boolean,
      lineCreditPayrollSpecialAdvance: validationRules.string,
      maximumNotifDocSize: validationRules.number,
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
  const [selectedPayrollAdvance, setSelectedPayrollAdvance] =
    useState<string>("");
  const [selectedPayrollSpecialAdvance, setSelectedPayrollSpecialAdvance] =
    useState<string>("");

  const { enumData: methods } = useEnumeratorsCrediboard({
    businessUnits: appData.businessUnit.publicCode,
    enumQuery: EGeneralPolicies.METHODS,
    token: appData.token,
  });

  const { rulesDataMap, isLoading: isLoadingEnums } = useMultipleEnumRules({
    ruleNames: [
      ENameRules.LINE_CREDIT_PAYROLL_ADVANCE,
      ENameRules.LINE_CREDIT_PAYROLL_SPECIAL_ADVANCE,
      ENameRules.CREDIT_BUREAUS_CONSULTATION_REQUIRED,
    ],
    ruleCatalog: ECreditLines.RULE_CATALOG,
    catalogAction: ECreditLines.CATALOG_ACTION,
    businessUnits: appData.businessUnit.publicCode,
    token: appData.token,
  });

  const methodsOptions: IServerDomain[] = methods
    .filter((entry) => generalMethods.includes(entry.code))
    .map((item: IEnumerators) => {
      const name =
        item.i18n?.[appData.language as keyof typeof item.i18n] ??
        item.description;

      return {
        id: item.code ?? "",
        label: name ?? "",
        value: item.code ?? "",
      };
    });

  const optionMap = useMemo(() => {
    const map: Record<string, IServerDomain[]> = {};

    Object.keys(rulesDataMap).forEach((ruleName) => {
      const ruleData = rulesDataMap[ruleName] as IRuleDecisionExtended;
      if (ruleData?.listOfPossibleValues?.list) {
        map[ruleName] = ruleData.listOfPossibleValues
          .list as unknown as IServerDomain[];
      }
    });

    return map;
  }, [rulesDataMap]);

  const payrollAdvanceOptions: IServerDomain[] =
    optionMap[ENameRules.LINE_CREDIT_PAYROLL_ADVANCE];
  const payrollSpecialAdvanceOptions: IServerDomain[] =
    optionMap[ENameRules.LINE_CREDIT_PAYROLL_SPECIAL_ADVANCE];

  const creditBureausOptions: IServerDomain[] =
    optionMap[ENameRules.CREDIT_BUREAUS_CONSULTATION_REQUIRED];

  useEffect(() => {
    if (setOptionsGenDecision) {
      setOptionsGenDecision({
        payrollAdvance: payrollAdvanceOptions,
        payrollSpecialAdvance: payrollSpecialAdvanceOptions,
        creditBureaus: creditBureausOptions,
      });
    }
  }, [
    payrollAdvanceOptions,
    payrollSpecialAdvanceOptions,
    creditBureausOptions,
  ]);

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
  const handleChangePayrollAdvance = (_name: string, value: string) => {
    setSelectedPayrollAdvance(value);
  };
  const handleChangePayrollSpecialAdvance = (_name: string, value: string) => {
    setSelectedPayrollSpecialAdvance(value);
  };
  useEffect(() => {
    if (selectedPayrollAdvance) {
      formik.setFieldValue("lineCreditPayrollAdvance", selectedPayrollAdvance);
    }
  }, [selectedPayrollAdvance]);

  useEffect(() => {
    if (selectedPayrollSpecialAdvance) {
      formik.setFieldValue(
        "lineCreditPayrollSpecialAdvance",
        selectedPayrollSpecialAdvance,
      );
    }
  }, [selectedPayrollSpecialAdvance]);

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
        setIsDisabledButton(valuesEqualBoton);
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
      handleFormValidChange(isDisabledButton);
    }
  }, [formik.isValid, isDisabledButton, handleFormValidChange]);

  const isMobile = useMediaQuery(mediaQueryMobile);

  const buttonLabel = editDataOption
    ? decisionsGenLabels.buttonSaveLabel
    : decisionsGenLabels.buttonNextLabel;

  return {
    formik,
    isLoadingEnums,
    showInformationReferenceModal,
    showInformationMethodModal,
    showInformationObligationModal,
    isMobile,
    isDisabledButton,
    buttonLabel,
    methodsOptions,
    selectedPayrollSpecialAdvance,
    selectedPayrollAdvance,
    payrollAdvanceOptions,
    payrollSpecialAdvanceOptions,
    creditBureausOptions,
    handleChangePayrollAdvance,
    handleChangePayrollSpecialAdvance,
    handleInformationReferenceModal,
    handleInformationObligationModal,
    handleInformationMethodsModal,
    handleToggleChange,
  };
};

export { useDecisionsGenForm };
