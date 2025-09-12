import { useNavigate } from "react-router-dom";
import { IDragAndDropColumn } from "@isettingkit/business-rules";
import { FormikProps } from "formik";
import { useEffect, useRef, useState } from "react";
import { compareObjects } from "@utils/compareObjects";
import { clientsSupportLineLabels } from "@config/creditLines/configuration/clientsSupportLineLabels";
import { IErrors } from "@ptypes/IErrors";
import { INameAndDescriptionEntry } from "@ptypes/creditLines/forms/INameAndDescriptionEntry";
import { useModalConfiguration } from "../useModalConfiguration";

const useConfigurationLines = () => {
  const initialValues = {
    nameAndDescription: {
      aliasLine: "",
      nameLine: "",
      descriptionLine: "",
    },
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [loading] = useState<boolean>(false);
  const [updateData] = useState<boolean>(false);
  const [showGoBackModal, setShowGoBackModal] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [canRefresh, setCanRefresh] = useState(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);

  const [optionsIncluded, setOptionsIncluded] = useState<IDragAndDropColumn>({
    legend: clientsSupportLineLabels.titleCustomerProfiles,
    items: [
      "Clientes NO asociados",
      "Personas sancionadas",
      "Personas con alerta de riesgo",
      "Personas sin enrolamiento seguro",
    ],
    emptyMessage: clientsSupportLineLabels.withoutIncluding,
    highlightFirst: true,
  });

  const [optionsExcluded, setOptionsExcluded] = useState<IDragAndDropColumn>({
    legend: clientsSupportLineLabels.titleDoesNotApply,
    items: [],
    emptyMessage: clientsSupportLineLabels.withoutExcluding,
    highlightFirst: false,
  });

  const navigate = useNavigate();

  const handleToggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

  const nameLineRef = useRef<FormikProps<INameAndDescriptionEntry>>(null);

  const handleOpenModal = () => {
    const compare = compareObjects(initialValues, formValues);
    const compareCompany = compareObjects(
      nameLineRef.current?.initialValues,
      nameLineRef.current?.values,
    );
    if (!compare || !compareCompany) {
      setShowGoBackModal(true);
    } else {
      navigate("/credit-lines");
    }
  };

  const handleGoBack = () => {
    setCanRefresh(true);
    navigate("/credit-lines");
  };

  const handleToggleErrorModal = () => {
    setHasError(!hasError);
  };

  const handleCloseModal = () => {
    setShowGoBackModal(!showGoBackModal);
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const hasUnsavedChanges =
        !compareObjects(initialValues, formValues) ||
        (nameLineRef.current &&
          !compareObjects(
            nameLineRef.current.initialValues,
            nameLineRef.current.values,
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
  }, [formValues, initialValues, nameLineRef, canRefresh]);

  const { modalData, showDecision } = useModalConfiguration({
    showGoBackModal,
    loading,
    hasError: false,
    errorData: {} as IErrors,
    handleCloseModal,
    handleGoBack,
    handleToggleErrorModal,
  });

  return {
    loading,
    initialValues,
    showDecision,
    modalData,
    canRefresh,
    showInfoModal,
    updateData,
    optionsExcluded,
    optionsIncluded,
    isCurrentFormValid,
    nameLineRef,
    formValues,
    setIsCurrentFormValid,
    setFormValues,
    setOptionsIncluded,
    setOptionsExcluded,
    handleToggleInfoModal,
    handleOpenModal,
  };
};

export { useConfigurationLines };
