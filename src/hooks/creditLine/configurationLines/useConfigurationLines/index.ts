import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IErrors } from "@ptypes/IErrors";
import { IOptionClient } from "@ptypes/creditLines/forms/IOptionClient";
import { useModalConfiguration } from "../useModalConfiguration";

const useConfigurationLines = () => {
  const [loading] = useState<boolean>(false);
  const [lineData] = useState({
    lineName: "",
    lineType: "",
    descriptionInfo: "",
  });
  const [updateData] = useState<boolean>(false);
  const [withDecisions] = useState<boolean>(false);
  const [withoutDecisions] = useState<boolean>(false);
  const [showGoBackModal, setShowGoBackModal] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [canRefresh, setCanRefresh] = useState(false);
  const [hasError, setHasError] = useState<boolean>(false);
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
  const handleOpenModal = () => {
    setShowGoBackModal(!showGoBackModal);
  };

  const handleGoBack = () => {
    setCanRefresh(true);
    navigate("/");
  };

  const handleToggleErrorModal = () => {
    setHasError(!hasError);
  };

  const handleCloseModal = () => {
    setShowGoBackModal(!showGoBackModal);
  };

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
    lineData,
    updateData,
    withDecisions,
    withoutDecisions,
    showDecision,
    modalData,
    canRefresh,
    showInfoModal,
    optionsIncluded,
    optionsExcluded,
    setOptionsIncluded,
    setOptionsExcluded,
    handleToggleInfoModal,
    handleOpenModal,
  };
};

export { useConfigurationLines };
