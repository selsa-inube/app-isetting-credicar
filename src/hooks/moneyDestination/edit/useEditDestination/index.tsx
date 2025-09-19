import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FormikProps } from "formik";
import { useMediaQuery } from "@inubekit/inubekit";

import { useCreditLine } from "@hooks/moneyDestination/useCreditLine";
import { useEnumsMoneyDestination } from "@hooks/useEnumsMoneyDestination";
import { EMoneyDestination } from "@enum/moneyDestination";
import { formatDate } from "@utils/date/formatDate";
import { compareObjects } from "@utils/compareObjects";
import { normalizeDestination } from "@utils/destination/normalizeDestination";
import { editDestinationTabsConfig } from "@config/moneyDestination/editDestination/tabs";
import { mediaQueryTablet } from "@config/environment";
import { editLabels } from "@config/moneyDestination/editDestination/editLabels";
import { IUseEditDestination } from "@ptypes/hooks/moneyDestination/IUseEditDestination";
import { IGeneralInformationEntry } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IGeneralInformationEntry";
import { ISaveDataRequest } from "@ptypes/saveData/ISaveDataRequest";
import { IServerDomain } from "@ptypes/IServerDomain";
import { II18n } from "@ptypes/i18n";

const useEditDestination = (props: IUseEditDestination) => {
  const { data, appData } = props;
  const initialGeneralInfData = {
    nameDestination: data.nameDestination ?? "",
    typeDestination: data.typeDestination ?? "",
    creditLine: data.creditLine ?? "",
    description: data.description ?? "",
    icon: data.icon ?? "",
    id: data.id ?? "",
  };

  const [isSelected, setIsSelected] = useState<string>(
    editDestinationTabsConfig.generalInformation.id,
  );
  const [formValues, setFormValues] = useState<IGeneralInformationEntry>(
    initialGeneralInfData,
  );
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const [showGoBackModal, setShowGoBackModal] = useState(false);
  const [canRefresh, setCanRefresh] = useState(false);
  const [showRequestProcessModal, setShowRequestProcessModal] = useState(false);
  const [saveData, setSaveData] = useState<ISaveDataRequest>();
  const [showModal, setShowModal] = useState(false);

  const generalInformationRef =
    useRef<FormikProps<IGeneralInformationEntry>>(null);
  const [creditLineValues, setCreditLineValues] = useState<IServerDomain[]>([]);

  const navigate = useNavigate();

  const conditionRule = "MoneyDestination";

  const { optionsCreditLine, creditLineData } = useCreditLine();

  useEffect(() => {
    setCreditLineValues(optionsCreditLine);
  }, [creditLineData]);

  const onSubmit = () => {
    const { enumDestination } = useEnumsMoneyDestination({
      businessUnits: appData.businessUnit.publicCode,
    });
    const currentValues = generalInformationRef.current?.values;
    const compare =
      JSON.stringify(initialGeneralInfData) === JSON.stringify(formValues);

    const valuesUpdatedName =
      initialGeneralInfData.nameDestination !== currentValues?.nameDestination;
    const valuesUpdatedDesc =
      initialGeneralInfData.description !== currentValues?.description;
    const valuesUpdatedLine =
      initialGeneralInfData.creditLine !== currentValues?.creditLine;
    const valueName = (name: string) => {
      const normalizeData = normalizeDestination(enumDestination, name);
      return (
        normalizeData?.i18nValue?.[appData.language as keyof II18n] ?? name
      );
    };

    const configurationRequestData: {
      moneyDestinationId: string;
      modifyJustification: string;
      abbreviatedName?: string;
      descriptionUse?: string;
      iconReference?: string;
      typeDestination?: string;
      creditLine?: string;
    } = {
      moneyDestinationId: data.id,
      modifyJustification: `${editLabels.modifyJustification} ${appData.user.userAccount}`,
    };

    if (currentValues?.nameDestination !== undefined && valuesUpdatedName) {
      configurationRequestData.abbreviatedName = valueName(
        currentValues?.nameDestination,
      );
      configurationRequestData.iconReference = currentValues?.icon;
    }
    if (currentValues?.description !== undefined && valuesUpdatedDesc) {
      configurationRequestData.descriptionUse = currentValues?.description;
    }

    if (currentValues?.creditLine !== undefined && valuesUpdatedLine)
      if (!compare) {
        if (
          initialGeneralInfData.nameDestination !== formValues.nameDestination
        ) {
          configurationRequestData.abbreviatedName = valueName(
            formValues.nameDestination,
          );
          configurationRequestData.iconReference = formValues.icon;
        }
        if (initialGeneralInfData.description !== formValues.description) {
          configurationRequestData.descriptionUse = formValues.description;
        }
      }

    setSaveData({
      applicationName: "ifac",
      businessManagerCode: appData.businessManager.publicCode,
      businessUnitCode: appData.businessUnit.publicCode,
      description: editLabels.description,
      entityName: conditionRule,
      requestDate: formatDate(new Date()),
      useCaseName: EMoneyDestination.USE_CASE_EDIT,
      configurationRequestData,
    });
    setShowRequestProcessModal(true);
  };

  useEffect(() => {
    if (generalInformationRef.current?.values) {
      setFormValues((prev) => ({
        ...prev,
        ...generalInformationRef.current?.values,
      }));
    }
  }, [generalInformationRef.current?.values]);

  const handleTabChange = (tabId: string) => {
    if (generalInformationRef.current?.values) {
      setFormValues((prev) => ({
        ...prev,
        ...generalInformationRef.current?.values,
      }));
    }
    setIsSelected(tabId);
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const hasUnsavedChanges =
        !compareObjects(initialGeneralInfData, formValues) ||
        (generalInformationRef.current &&
          !compareObjects(
            generalInformationRef.current.initialValues,
            generalInformationRef.current.values,
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
  }, [formValues, initialGeneralInfData, generalInformationRef, canRefresh]);

  const handleToggleEditedModal = () => {
    setShowModal(!showModal);
  };

  const handleOpenModal = () => {
    const compare = compareObjects(initialGeneralInfData, formValues);
    const compareCompany = compareObjects(
      generalInformationRef.current?.initialValues,
      generalInformationRef.current?.values,
    );
    if (!compare || !compareCompany) {
      setShowGoBackModal(true);
    } else {
      navigate(-1);
    }
  };

  const handleReset = () => {
    setShowGoBackModal(true);
  };

  const handleCloseGoBackModal = () => {
    setShowGoBackModal(false);
  };

  const handleGoBack = () => {
    setCanRefresh(true);
    navigate(-1);
  };

  const handleEditedModal = () => {
    setShowModal(false);
    onSubmit();
  };
  const smallScreen = useMediaQuery(mediaQueryTablet);

  const showGeneralInformation =
    isSelected === editDestinationTabsConfig.generalInformation.id;

  return {
    formValues,
    initialGeneralInfData,
    generalInformationRef,
    isCurrentFormValid,
    isSelected,
    saveData,
    showRequestProcessModal,
    showModal,
    smallScreen,
    showGeneralInformation,
    showGoBackModal,
    creditLineValues,
    setCreditLineValues,
    handleOpenModal,
    handleCloseGoBackModal,
    handleEditedModal,
    handleGoBack,
    handleToggleEditedModal,
    handleReset,
    onSubmit,
    setIsCurrentFormValid,
    handleTabChange,
    setShowRequestProcessModal,
    setShowModal,
  };
};

export { useEditDestination };
