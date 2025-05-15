import { useRef, useState } from "react";
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
import { renderValue } from "@utils/renderValue";
import { IDateVerification } from "@ptypes/generalCredPolicies/forms/IDateVerification";
import { formatRuleDecisions } from "@utils/formatRuleDecisions";

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

  const rulesContributions = formatRuleDecisions(
    contributionsPortfolio,
    dateVerification?.date,
  );
  const rulesIncomes = formatRuleDecisions(
    incomePortfolio,
    dateVerification?.date,
  );

  const ruleScoremodels = formatRuleDecisions(
    scoreModels,
    dateVerification?.date,
  );

  const rules = [...rulesContributions, ...rulesIncomes, ...ruleScoremodels];

  console.log("rules", rules);

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
        reference: formValues.decisionsGeneral.values.reference,
        additionalDebtors: renderValue(
          formValues.decisionsGeneral.values.additionalDebtors,
        ),
        sourcesIncome: renderValue(
          formValues.decisionsGeneral.values.sourcesIncome,
        ),
        financialObligations: renderValue(
          formValues.decisionsGeneral.values.financialObligations,
        ),
        realGuarantees: renderValue(
          formValues.decisionsGeneral.values.realGuarantees,
        ),
        calculation: renderValue(
          formValues.decisionsGeneral.values.calculation,
        ),
        reciprocity: renderValue(
          formValues.decisionsGeneral.values.reciprocity,
        ),
        factor: renderValue(formValues.decisionsGeneral.values.factor),
        ruleName: rules,
      },
    });
    setShowRequestProcessModal(!showRequestProcessModal);
  };

  const formValid =
    (currentStep === 2 && contributionsPortfolio.length === 0) ||
    (currentStep === 3 && incomePortfolio.length === 0) ||
    (currentStep === 4 && scoreModels.length === 0)
      ? true
      : isCurrentFormValid;

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
