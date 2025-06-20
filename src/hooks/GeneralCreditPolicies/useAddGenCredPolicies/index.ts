import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@inubekit/inubekit";
import { IRuleDecision } from "@isettingkit/input";
import { FormikProps } from "formik";

import { addPayrollAgreementSteps } from "@config/payrollAgreement/payrollAgreementTab/assisted/steps";
import { IAddGenCredPoliciesForms } from "@ptypes/generalCredPolicies/forms/IAddGenCredPoliciesForms";
import { IAddGenCredPoliciesRef } from "@ptypes/generalCredPolicies/forms/IAddGenCredPoliciesRef";
import { IDecisionsGeneralEntry } from "@ptypes/generalCredPolicies/forms/IDecisionsGeneralEntry";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { formatDate } from "@utils/date/formatDate";
import { IUseAddGenCredPolicies } from "@ptypes/hooks/generalCreditPolicies/IUseAddGenCredPolicies";
import { IDateVerification } from "@ptypes/generalCredPolicies/forms/IDateVerification";
import { compareObjects } from "@utils/compareObjects";
import { useRules } from "../useRules";

const useAddGenCredPolicies = (props: IUseAddGenCredPolicies) => {
  const { appData } = props;
  const initialValues: IAddGenCredPoliciesForms = {
    decisionsGeneral: {
      isValid: false,
      values: {
        reference: "",
        additionalDebtors: false,
        sourcesIncome: false,
        financialObligations: false,
        realGuarantees: false,
        calculation: false,
        reciprocity: false,
        factor: false,
      },
    },
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [showRequestProcessModal, setShowRequestProcessModal] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [saveData, setSaveData] = useState<ISaveDataRequest>();
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const [contributionsPortfolio, setContributionsPortfolio] = useState<
    IRuleDecision[]
  >([]);
  const [scoreModels, setScoreModels] = useState<IRuleDecision[]>([]);
  const [incomePortfolio, setIncomePortfolio] = useState<IRuleDecision[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [dateVerification, setDateVerification] = useState<IDateVerification>();
  const [showGoBackModal, setShowGoBackModal] = useState(false);
  const [canRefresh, setCanRefresh] = useState(false);

  const navigate = useNavigate();

  const smallScreen = useMediaQuery("(max-width: 990px)");

  const decisionsGeneralRef = useRef<FormikProps<IDecisionsGeneralEntry>>(null);

  const formReferences: IAddGenCredPoliciesRef = {
    decisionsGeneral: decisionsGeneralRef,
  };

  const getValues = () =>
    decisionsGeneralRef.current?.values || formValues.decisionsGeneral.values;

  const updateFormValues = () => {
    const values = decisionsGeneralRef.current?.values;
    if (values) {
      setFormValues((prev) => ({
        ...prev,
        decisionsGeneral: {
          ...prev.decisionsGeneral,
          values,
        },
      }));
    }
  };

  const getNextStep = (step: number) => {
    const { factor, reciprocity } = getValues();

    if (step === 2) return factor ? 3 : 4;
    if ([3, 4].includes(step)) return step + 1;
    if ([1].includes(step)) {
      if (reciprocity) return 2;
      return factor ? 3 : 4;
    }
    return step + 1;
  };

  const getPreviousStep = (step: number) => {
    const { factor, reciprocity } = formValues.decisionsGeneral.values;

    const map: Record<number, number> = {
      2: 1,
      3: reciprocity ? 2 : 1,
      4: factor ? 3 : reciprocity ? 2 : 1,
      5: 4,
    };

    return map[step] || step - 1;
  };

  const handleNextStep = () => {
    if (currentStep >= addPayrollAgreementSteps.length) return;
    updateFormValues();
    setCurrentStep(getNextStep(currentStep));
  };

  const handlePreviousStep = () => {
    if (currentStep <= 1) return;
    setCurrentStep(getPreviousStep(currentStep));
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFormValidChange = (isValid: boolean) =>
    setIsCurrentFormValid(isValid);

  const { rules } = useRules({
    formValues,
    dateVerification: dateVerification ?? ({} as IDateVerification),
    contributionsPortfolio,
    incomePortfolio,
    scoreModels,
  });

  const handleSubmitClick = () => {
    setSaveData({
      applicationName: "ifac",
      businessManagerCode: appData.businessManager.publicCode,
      businessUnitCode: appData.businessUnit.publicCode,
      description: "Solicitud de creación de politicas generales de credito",
      entityName: "GeneralCreditPolicies",
      requestDate: formatDate(new Date()),
      useCaseName: "AddGeneralCreditPolicies",
      configurationRequestData: {
        rules: rules,
      },
    });
    setShowRequestProcessModal(!showRequestProcessModal);
  };

  const formValid = isCurrentFormValid;

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const hasUnsavedChanges =
        !compareObjects(initialValues, formValues) ||
        (decisionsGeneralRef.current &&
          !compareObjects(
            decisionsGeneralRef.current.initialValues,
            decisionsGeneralRef.current.values,
          ));

      if (hasUnsavedChanges) {
        event.preventDefault();
        setShowGoBackModal(!showGoBackModal);

        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [formValues, initialValues, decisionsGeneralRef, canRefresh]);

  const handleOpenModal = () => {
    const compare = compareObjects(initialValues, formValues);
    const compareCompany = compareObjects(
      decisionsGeneralRef.current?.initialValues,
      decisionsGeneralRef.current?.values,
    );
    if (!compare || !compareCompany) {
      setShowGoBackModal(true);
    } else {
      navigate(-1);
    }
  };

  const handleCloseGoBackModal = () => {
    setShowGoBackModal(false);
  };

  const handleGoBack = () => {
    setCanRefresh(true);
    navigate("/");
  };

  return {
    currentStep,
    formValues,
    formReferences,
    smallScreen,
    isCurrentFormValid,
    showModal,
    contributionsPortfolio,
    incomePortfolio,
    formValid,
    scoreModels,
    showRequestProcessModal,
    saveData,
    dateVerification,
    showGoBackModal,
    handleOpenModal,
    handleCloseGoBackModal,
    handleGoBack,
    setDateVerification,
    handleSubmitClick,
    setScoreModels,
    setIncomePortfolio,
    setContributionsPortfolio,
    handleFormValidChange,
    handleToggleModal,
    handleNextStep,
    handlePreviousStep,
    setCurrentStep,
    setIsCurrentFormValid,
    setShowModal,
    setShowRequestProcessModal,
  };
};

export { useAddGenCredPolicies };
