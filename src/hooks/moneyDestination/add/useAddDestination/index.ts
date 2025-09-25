import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";
import { useContext, useEffect, useRef, useState } from "react";
import { FormikProps } from "formik";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useCreditLine } from "@hooks/moneyDestination/useCreditLine";
import { useEnumsMoneyDestination } from "@hooks/useEnumsMoneyDestination";
import { EMoneyDestination } from "@enum/moneyDestination";
import { formatDate } from "@utils/date/formatDate";
import { compareObjects } from "@utils/compareObjects";
import { addDestinationStepsConfig } from "@config/moneyDestination/addDestination/assisted";
import { normalizeDestination } from "@utils/destination/normalizeDestination";
import { addMoneyLabels } from "@config/payrollAgreement/payrollAgreementTab/assisted/addMoneyLabels";
import { mediaQueryTablet } from "@config/environment";
import { IGeneralInformationEntry } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IGeneralInformationEntry";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { IServerDomain } from "@ptypes/IServerDomain";
import { II18n } from "@ptypes/i18n";

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

  const generalInformationRef =
    useRef<FormikProps<IGeneralInformationEntry>>(null);

  const { optionsCreditLine, creditLineData } = useCreditLine();

  const [creditLineValues, setCreditLineValues] = useState<IServerDomain[]>([]);

  const navigate = useNavigate();

  const { enumDestination } = useEnumsMoneyDestination({
    businessUnits: appData.businessUnit.publicCode,
  });

  const normalizeData = normalizeDestination(
    enumDestination,
    formValues.nameDestination,
  );
  const valueName =
    normalizeData?.i18nValue?.[appData.language as keyof II18n] ??
    formValues.nameDestination;

  const handleNextStep = () => {
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

  const handleSubmitClick = () => {
    setSaveData({
      applicationName: "ifac",
      businessManagerCode: appData.businessManager.publicCode,
      businessUnitCode: appData.businessUnit.publicCode,
      description: addMoneyLabels.description,
      entityName: "MoneyDestination",
      requestDate: formatDate(new Date()),
      useCaseName: EMoneyDestination.USE_CASE_ADD,
      configurationRequestData: {
        abbreviatedName: valueName,
        descriptionUse: formValues.description,
        iconReference: formValues.icon ?? "",
        moneyDestinationType: formValues.typeDestination,
        creditLine: formValues.creditLine ?? "",
      },
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
