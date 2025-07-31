import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";
import { useContext, useEffect, useRef, useState } from "react";
import { FormikProps } from "formik";
import { IRuleDecision, ICondition } from "@isettingkit/input";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { EStepsKeysMoneyDestination } from "@enum/stepsKeysMoneyDest";
import { EMoneyDestination } from "@enum/moneyDestination";
import { formatDate } from "@utils/date/formatDate";
import { formatDateDecision } from "@utils/date/formatDateDecision";
import { compareObjects } from "@utils/compareObjects";
import { addDestinationStepsConfig } from "@config/moneyDestination/addDestination/assisted";
import { addMoneyLabels } from "@config/payrollAgreement/payrollAgreementTab/assisted/addMoneyLabels";
import { mediaQueryTablet } from "@config/environment";
import { IGeneralInformationEntry } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IGeneralInformationEntry";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";

const useAddDestination = () => {
  const initialValues = {
    nameDestination: "",
    description: "",
    icon: "",
  };

  const { appData } = useContext(AuthAndPortalData);
  const [currentStep, setCurrentStep] = useState(1);
  const [formValues, setFormValues] =
    useState<IGeneralInformationEntry>(initialValues);
  const [saveData, setSaveData] = useState<ISaveDataRequest>();
  const [showModal, setShowModal] = useState(false);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const [creditLineDecisions, setCreditLineDecisions] = useState<
    IRuleDecision[]
  >([]);
  const [showGoBackModal, setShowGoBackModal] = useState(false);
  const [canRefresh, setCanRefresh] = useState(false);
  const [showRequestProcessModal, setShowRequestProcessModal] = useState(false);
  const [showAttentionModal, setShowAttentionModal] = useState(false);

  const generalInformationRef =
    useRef<FormikProps<IGeneralInformationEntry>>(null);

  const [nameDecision, setNameDecision] = useState(
    generalInformationRef.current?.values.nameDestination ?? "",
  );

  const navigate = useNavigate();

  useEffect(() => {
    setNameDecision(formValues.nameDestination ?? "");
  }, [formValues.nameDestination]);

  const handleNextStep = () => {
    if (
      currentStep === EStepsKeysMoneyDestination.LINE_CREDIT &&
      creditLineDecisions.length === 0 &&
      !showAttentionModal
    ) {
      setShowAttentionModal(true);
      return;
    }

    if (
      currentStep === EStepsKeysMoneyDestination.LINE_CREDIT &&
      showAttentionModal
    ) {
      setShowAttentionModal(false);
    }

    if (currentStep < addDestinationStepsConfig("").length) {
      if (generalInformationRef.current) {
        setFormValues(generalInformationRef.current.values);
        setIsCurrentFormValid(generalInformationRef.current.isValid);
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const hasUnsavedChanges = generalInformationRef.current
        ? !compareObjects(initialValues, generalInformationRef.current.values)
        : false;

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
  }, [formValues, initialValues, canRefresh]);

  const handleOpenModal = () => {
    const compare = generalInformationRef.current
      ? compareObjects(initialValues, generalInformationRef.current.values)
      : true;

    if (!compare) {
      setShowGoBackModal(true);
    } else {
      navigate(-1);
    }
  };

  const handleCloseModal = () => {
    setShowGoBackModal(false);
  };

  const handleGoBack = () => {
    setCanRefresh(true);
    navigate(-1);
  };

  const decisionsData = creditLineDecisions.map((decision) => {
    const decisionsByRule: IRuleDecision = {
      conditionsThatEstablishesTheDecision:
        decision.conditionsThatEstablishesTheDecision?.map((condition) => {
          return {
            labelName: condition.labelName,
            conditionName: condition.conditionName,
            value: condition.value,
          };
        }) as ICondition[],
      effectiveFrom: formatDateDecision(decision.effectiveFrom as string),
      value: decision.value,
    };

    if (decision.validUntil) {
      decisionsByRule.validUntil = formatDateDecision(
        decision.validUntil as string,
      );
    }

    return {
      ruleName: decision.ruleName,
      decisionsByRule: [decisionsByRule],
    };
  });

  const smallScreen = useMediaQuery(mediaQueryTablet);

  const handleSubmitClick = () => {
    setSaveData({
      applicationName: "ifac",
      businessManagerCode: appData.businessManager.publicCode,
      businessUnitCode: appData.businessUnit.publicCode,
      description: addMoneyLabels.description,
      entityName: "MoneyDestination",
      requestDate: formatDate(new Date()),
      useCaseName: EMoneyDestination.USE_CASE_NAME_ADD,
      configurationRequestData: {
        abbreviatedName: formValues.nameDestination,
        descriptionUse: formValues.description,
        iconReference: formValues.icon ?? "",
        rules: decisionsData,
      },
    });
    setShowRequestProcessModal(!showRequestProcessModal);
  };

  return {
    creditLineDecisions,
    currentStep,
    formValues,
    generalInformationRef,
    isCurrentFormValid,
    nameDecision,
    showModal,
    showRequestProcessModal,
    saveData,
    showAttentionModal,
    smallScreen,
    showGoBackModal,
    handleCloseModal,
    handleGoBack,
    handleOpenModal,
    handleNextStep,
    handlePreviousStep,
    handleSubmitClick,
    handleToggleModal,
    setCreditLineDecisions,
    setCurrentStep,
    setIsCurrentFormValid,
    setShowRequestProcessModal,
    setShowAttentionModal,
    setShowModal,
  };
};

export { useAddDestination };
