import { AddCreditLineForm } from "@pages/creditLines/tabs/forms/addCreditLineForm";
import { useAddCreditlines } from "@hooks/creditLine/useAddCreditLines";
import { DecisionModal } from "@design/modals/decisionModal";
import { portalId } from "@config/portalId";
import { lineInitiatedLabels } from "@config/creditLines/creditLinesTab/generic/lineInitiatedLabels";
import { IAddCreditLine } from "@ptypes/creditLines/IAddCreditLine";
import { LineInitiatedModal } from "../lineInitiatedModal";

const AddCreditLine = (props: IAddCreditLine) => {
  const { setShowAddModal, setShowUnderConstruction } = props;

  const {
    formValues,
    isCurrentFormValid,
    generalInformationRef,
    modalData,
    hasError,
    loading,
    showLineInitiatedModal,
    handleGoBack,
    handleGoContinue,
    handleAddModal,
    handleCloseModal,
    setIsCurrentFormValid,
  } = useAddCreditlines({ setShowAddModal, setShowUnderConstruction });

  return (
    <>
      <AddCreditLineForm
        ref={generalInformationRef}
        initialValues={formValues.information.values}
        onFormValid={setIsCurrentFormValid}
        onAddModal={handleAddModal}
        onCloseModal={handleCloseModal}
        isCurrentFormValid={isCurrentFormValid}
        loading={loading}
      />

      {hasError && (
        <DecisionModal
          portalId={portalId}
          title={modalData.title}
          actionText={modalData.actionText}
          description={modalData.description}
          onClick={modalData.onClick}
          onCloseModal={modalData.onCloseModal}
          withIcon={modalData.withIcon}
          withCancelButton={modalData.withCancelButton}
          icon={modalData.icon}
          appearance={modalData.appearance}
          appearanceButton={modalData.appearanceButton}
        />
      )}

      {showLineInitiatedModal && (
        <LineInitiatedModal
          onGoBack={handleGoBack}
          onGoContinue={handleGoContinue}
          lineInitiatedLabels={lineInitiatedLabels}
        />
      )}
    </>
  );
};

export { AddCreditLine };
