import { useNavigate } from "react-router-dom";
import { IRuleDecision } from "@isettingkit/input";
import { useMediaQuery } from "@inubekit/inubekit";
import { useContext, useEffect, useRef, useState } from "react";
import { FormikProps } from "formik";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useCreditLine } from "@hooks/moneyDestination/useCreditLine";
import { useEnumRules } from "@hooks/moneyDestination/useEnumRules";
import { useEnumsMoneyDestination } from "@hooks/useEnumsMoneyDestination";
import { EGeneral } from "@enum/general";
import { EStepsKeysMoneyDestination } from "@enum/stepsKeysMoneyDest";
import { EMoneyDestination } from "@enum/moneyDestination";
import { ECreditLines } from "@enum/creditLines";
import { ERequestType } from "@enum/requestType";
import { formatDate } from "@utils/date/formatDate";
import { compareObjects } from "@utils/compareObjects";
import { normalizeOptions } from "@utils/destination/normalizeOptions";
import { addDestinationStepsConfig } from "@config/moneyDestination/addDestination/assisted";
import { normalizeDestination } from "@utils/destination/normalizeDestination";
import { addMoneyLabels } from "@config/payrollAgreement/payrollAgreementTab/assisted/addMoneyLabels";
import { mediaQueryTablet } from "@config/environment";
import { IGeneralInformationEntry } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IGeneralInformationEntry";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { IServerDomain } from "@ptypes/IServerDomain";
import { II18n } from "@ptypes/i18n";
import { IDecisionWithConditions } from "@ptypes/creditLines/IDecisionWithConditions";

const useAddDestination = () => {
  const initialValues = {
    nameDestination: "",
    typeDestination: "",
    description: "",
    creditLine: "",
    icon: "",
  };

  const { appData } = useContext(AuthAndPortalData);
  const [currentStep, setCurrentStep] = useState(1);
  const [formValues, setFormValues] =
    useState<IGeneralInformationEntry>(initialValues);
  const [saveData, setSaveData] = useState<ISaveDataRequest>();
  const [showModal, setShowModal] = useState(false);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const [showGoBackModal, setShowGoBackModal] = useState(false);
  const [canRefresh, setCanRefresh] = useState(false);
  const [showRequestProcessModal, setShowRequestProcessModal] = useState(false);
  const [showDecisionModal, setShowDecisionModal] = useState<boolean>(false);

  const generalInformationRef =
    useRef<FormikProps<IGeneralInformationEntry>>(null);

  const { optionsCreditLine, creditLineData } = useCreditLine();

  const [creditLineValues, setCreditLineValues] = useState<IServerDomain[]>([]);

  const navigate = useNavigate();

  const { enumDestination } = useEnumsMoneyDestination({
    businessUnits: appData.businessUnit.publicCode,
    token: appData.token,
  });

  const normalizeData = normalizeDestination(
    enumDestination,
    formValues.nameDestination,
  );
  const valueName =
    normalizeData?.i18nValue?.[appData.language as keyof II18n] ??
    formValues.nameDestination;

  const handleNextStep = () => {
    if (
      currentStep === EStepsKeysMoneyDestination.GENERAL_DATA &&
      (!generalInformationRef.current?.values.creditLine ||
        generalInformationRef.current?.values.creditLine.length === 0) &&
      !showDecisionModal
    ) {
      setShowDecisionModal(true);
      return;
    }

    if (
      currentStep === EStepsKeysMoneyDestination.GENERAL_DATA &&
      showDecisionModal
    ) {
      setShowDecisionModal(false);
    }
    if (currentStep < addDestinationStepsConfig.length) {
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
    setCreditLineValues(optionsCreditLine);
  }, [creditLineData]);

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

  const smallScreen = useMediaQuery(mediaQueryTablet);

  const creditLineDecisions = formValues.creditLine.split(",").map((item) => {
    return normalizeOptions(optionsCreditLine, item.trim());
  });

  const { ruleData } = useEnumRules({
    enumDestination: EMoneyDestination.LINE_OF_CREDIT,
    ruleCatalog: ECreditLines.RULE_CATALOG,
    catalogAction: ECreditLines.CATALOG_ACTION,
    businessUnits: appData.businessUnit.publicCode,
    token: appData.token,
  });

  const condition = ruleData.conditionsThatEstablishesTheDecision?.find(
    (condition) => condition.conditionName === "MoneyDestination",
  )?.conditionName;

  const handleSubmitClick = () => {
    const transformDecision: IDecisionWithConditions[] =
      creditLineDecisions.map((rule) => {
        const decision: IDecisionWithConditions = {
          effectiveFrom: formatDate(new Date()),
          value: rule?.id,
        };

        if (condition) {
          decision.conditionGroups = [
            {
              conditionsThatEstablishesTheDecision: [
                {
                  conditionName: condition,
                  value: valueName,
                },
              ],
            },
          ];
        }

        return decision;
      });

    const rules = [
      {
        ruleName: EMoneyDestination.LINE_OF_CREDIT,
        decisionsByRule: transformDecision,
      },
    ];

    const configurationRequestData: {
      abbreviatedName: string;
      descriptionUse: string;
      iconReference: string;
      moneyDestinationType: string;
      rules?: IRuleDecision[];
    } = {
      abbreviatedName: valueName,
      descriptionUse: formValues.description,
      iconReference: formValues.icon ?? "",
      moneyDestinationType: formValues.typeDestination,
    };

    if (formValues.creditLine.length > 0) {
      configurationRequestData.rules = rules;
    }

    setSaveData({
      applicationName: EGeneral.APPLICATION_NAME,
      requestType: ERequestType.ADD,
      businessManagerCode: appData.businessManager.publicCode,
      businessUnitCode: appData.businessUnit.publicCode,
      description: addMoneyLabels.description,
      entityName: "MoneyDestination",
      requestDate: formatDate(new Date()),
      useCaseName: EMoneyDestination.USE_CASE_ADD,
      configurationRequestData: configurationRequestData,
    });
    setShowRequestProcessModal(!showRequestProcessModal);
  };

  return {
    currentStep,
    formValues,
    generalInformationRef,
    isCurrentFormValid,
    showModal,
    showRequestProcessModal,
    saveData,
    smallScreen,
    showGoBackModal,
    creditLineValues,
    showDecisionModal,
    setShowDecisionModal,
    setCreditLineValues,
    handleCloseModal,
    handleGoBack,
    handleOpenModal,
    handleNextStep,
    handlePreviousStep,
    handleSubmitClick,
    handleToggleModal,
    setCurrentStep,
    setIsCurrentFormValid,
    setShowRequestProcessModal,
    setShowModal,
  };
};

export { useAddDestination };
