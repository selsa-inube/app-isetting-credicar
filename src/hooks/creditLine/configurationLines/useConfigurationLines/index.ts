import { useNavigate } from "react-router-dom";
import { FormikProps } from "formik";
import { useEffect, useRef, useState } from "react";
import { compareObjects } from "@utils/compareObjects";
import { IErrors } from "@ptypes/IErrors";
import { IOptionClient } from "@ptypes/creditLines/forms/IOptionClient";
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

  const [optionsIncluded, setOptionsIncluded] = useState<IOptionClient[]>([
    { id: "p1", value: "Clientes personales naturales" },
    { id: "p2", value: "Clientes personales naturales" },
    { id: "p3", value: "Personas sancionadas" },
  ]);
  const [optionsExcluded, setOptionsExcluded] = useState<IOptionClient[]>([]);

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
      navigate(-1);
    }
  };

  const handleGoBack = () => {
    setCanRefresh(true);
    navigate(-1);
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
