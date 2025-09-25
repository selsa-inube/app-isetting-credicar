import { useNameAndDescriptionForm } from "@hooks/creditLine/useNameAndDescriptionForm";
import { useConfigurationLines } from "@hooks/creditLine/configurationLines/useConfigurationLines";
import { NameAndDescriptionFormUI } from "./interface";

const NameAndDescriptionForm = () => {
  const {
    showInfoModal,
    loading,
    modalData,
    showDecision,
    formValues,
    isUpdated,
    setIsCurrentFormValid,
    nameLineRef,
    handleToggleInfoModal,
    handleOpenModal,
  } = useConfigurationLines();

  const { formik } = useNameAndDescriptionForm({
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
      isUpdated={isUpdated}
    />
  );
};

export { NameAndDescriptionForm };
