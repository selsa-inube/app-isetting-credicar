import { useNameAndDescriptionForm } from "@hooks/creditLine/useNameAndDescriptionForm";
import { useConfigurationLines } from "@hooks/creditLine/configurationLines/useConfigurationLines";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { NameAndDescriptionFormUI } from "./interface";

const NameAndDescriptionForm = () => {
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
    unconfiguredRules,
    showUnconfiguredModal,
    language,
    title,
    description,
    optionCrumb,
    optionDetails,
    optionIcon,
    handleToggleUnconfiguredRulesModal,
    handleUnconfiguredRules,
    handleClosePendingModal,
    handleCloseRequestStatus,
    handleCloseProcess,
    setIsCurrentFormValid,
    nameLineRef,
    handleToggleInfoModal,
    handleOpenModal,
  } = useConfigurationLines({});

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
      onUnconfiguredModal={handleUnconfiguredRules}
      onToggleUnconfiguredRules={handleToggleUnconfiguredRulesModal}
      showUnconfiguredModal={showUnconfiguredModal}
      unconfiguredRules={unconfiguredRules}
      language={language}
      title={title}
      description={description}
      optionCrumb={optionCrumb}
      optionDetails={optionDetails}
      optionIcon={optionIcon}
      disabledField={optionDetails}
    />
  );
};

export { NameAndDescriptionForm };
