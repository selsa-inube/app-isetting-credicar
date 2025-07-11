import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";
import { useContext, useEffect, useRef, useState } from "react";
import { FormikProps } from "formik";
import { IRuleDecision, ICondition } from "@isettingkit/input";

import { addDestinationStepsConfig } from "@config/moneyDestination/addDestination/assisted";
import { IGeneralInformationEntry } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IGeneralInformationEntry";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { formatDate } from "@utils/date/formatDate";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { formatDateDecision } from "@utils/date/formatDateDecision";
import { compareObjects } from "@utils/compareObjects";
import { mediaQueryTablet } from "@config/environment";

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
      currentStep === 2 &&
      creditLineDecisions.length === 0 &&
      !showAttentionModal
    ) {
      setShowAttentionModal(true);
      return;
    }

    if (currentStep === 2 && showAttentionModal) {
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
      const hasUnsavedChanges = !compareObjects(initialValues, formValues);

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
    const compare = compareObjects(initialValues, formValues);

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
      description: "Solicitud de creación de un destino de dinero",
      entityName: "MoneyDestination",
      requestDate: formatDate(new Date()),
      useCaseName: "AddMoneyDestination",
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
