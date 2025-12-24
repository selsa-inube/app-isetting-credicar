import { useNameAndDescriptionForm } from "@hooks/creditLine/useNameAndDescriptionForm";
import { EUseCase } from "@enum/useCase";
import { useConfigurationLines } from "@hooks/creditLine/configurationLines/useConfigurationLines";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { NameAndDescriptionFormUI } from "./interface";
import { useOutletContext } from "react-router-dom";
import React from "react";
import { IOutletCtx } from "@ptypes/creditLines/IOutletCtx";
import { INavGuard } from "@ptypes/creditLines/INavGuard";

const NameAndDescriptionForm = () => {
  const { setBeforeDropdownNavigate } = useOutletContext<IOutletCtx>();

  const {
    showInfoModal,
    loading,
    modalData,
    showDecision,
    formValues,
    loadingModify,
    nav,
    saveCreditLines,
    requestSteps,
    showRequestProcessModal,
    showRequestStatusModal,
    language,
    title,
    description,
    optionCrumb,
    optionDetails,
    optionIcon,
    showSendModal,
    submitModalData,
    useCaseConfiguration,
    handleClosePendingModal,
    handleCloseRequestStatus,
    handleCloseProcess,
    setIsCurrentFormValid,
    nameLineRef,
    handleToggleInfoModal,
    handleOpenModal,
    beforeDropdownNavigate,
  } = useConfigurationLines({});

  const guardRef = React.useRef(beforeDropdownNavigate);

  React.useEffect(() => {
    guardRef.current = beforeDropdownNavigate;
  }, [beforeDropdownNavigate]);

  React.useEffect(() => {
    const stableGuard: INavGuard = (to) => guardRef.current(to);

    setBeforeDropdownNavigate(() => stableGuard);

    return () => setBeforeDropdownNavigate(undefined);
  }, [setBeforeDropdownNavigate]);

  const { formik, message } = useNameAndDescriptionForm({
    initialValues: formValues.nameAndDescription,
    loading,
    onFormValid: setIsCurrentFormValid,
    ref: nameLineRef,
  });

  return (
    <NameAndDescriptionFormUI
      formik={formik}
      showModal={showDecision}
      showInfoModal={showInfoModal}
      modalData={modalData}
      onToggleInfoModal={handleToggleInfoModal}
      onOpenModal={handleOpenModal}
      loading={loading}
      lineName={formValues.nameAndDescription.nameLine}
      isUpdated={loadingModify}
      navigation={nav}
      message={message}
      showRequestProcessModal={showRequestProcessModal}
      showRequestStatusModal={showRequestStatusModal}
      saveData={saveCreditLines as ISaveDataResponse}
      requestSteps={requestSteps}
      onCloseRequestStatus={handleCloseRequestStatus}
      onCloseProcess={handleCloseProcess}
      onClosePendingModal={handleClosePendingModal}
      language={language}
      title={title}
      description={description}
      optionCrumb={optionCrumb}
      optionDetails={optionDetails}
      optionIcon={optionIcon}
      disabledField={optionDetails}
      showSendModal={showSendModal}
      submitModalData={submitModalData}
      editOption={useCaseConfiguration === EUseCase.EDIT}
    />
  );
};

export { NameAndDescriptionForm };
