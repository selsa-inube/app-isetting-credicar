import { useNewDecisionsForm } from "@hooks/forms/useNewDecisionsForm";
import { commonTextValues } from "@config/creditLines/decisionTemplates/commonTextValues";
import { INewDecisions } from "@ptypes/generalCredPolicies/INewDecisions";
import { NewDecisionFormUI } from "./interface";

const NewDecisionForm = (props: INewDecisions) => {
  const {
    customMessageEmptyDecisions,
    initialDecisions,
    editionMode,
    option,
    loading,
    ruleCatalog,
    onPreviousStep,
    disabledButton,
    labelBusinessRules,
    nameRule,
    onSave,
    onToggleDateModal,
    decisionTemplateConfig,
    setDecisionData,
  } = props;

  const {
    conditionEmpty,
    dataEmpty,
    decisions,
    iconAppearance,
    iconMessage,
    isModalOpen,
    mesaggeEmpty,
    message,
    multipleChoicesOptions,
    optionDetails,
    selectedConditions,
    selectedDecision,
    disabledPrevius,
    decisionTemplateFiltered,
    cancelButtonLabel,
    disabledNext,
    loadingList,
    saveButtonLabel,
    maxHeight,
    closeModal,
    deleteDecision,
    onMultipleChoicesChange,
    openModal,
    removeCondition,
    restoreConditions,
    submitForm,
  } = useNewDecisionsForm({
    initialDecisions,
    option,
    disabledButton,
    ruleCatalog,
    labelBusinessRules,
    nameRule,
    onToggleDateModal,
    decisionTemplateConfig,
    setDecisionData,
  });

  return (
    <NewDecisionFormUI
      conditionEmpty={conditionEmpty}
      controls={!optionDetails}
      customMessageEmptyDecisions={customMessageEmptyDecisions}
      dataEmpty={dataEmpty}
      decisions={decisions}
      decisionTemplate={decisionTemplateFiltered}
      editionMode={editionMode}
      iconAppearance={iconAppearance}
      iconMessage={iconMessage}
      isModalOpen={isModalOpen}
      loading={loading}
      mesaggeEmpty={mesaggeEmpty}
      message={message}
      multipleChoicesOptions={multipleChoicesOptions}
      optionDetails={optionDetails}
      selectedConditions={selectedConditions}
      selectedDecision={selectedDecision}
      textValues={commonTextValues}
      closeModal={closeModal}
      deleteDecision={deleteDecision}
      onMultipleChoicesChange={onMultipleChoicesChange}
      openModal={openModal}
      removeCondition={removeCondition}
      restoreConditions={restoreConditions}
      submitForm={submitForm}
      cancelButton={onPreviousStep}
      disabledPrevius={disabledPrevius}
      cancelButtonLabel={cancelButtonLabel}
      disabledNext={disabledNext}
      onSave={onSave}
      loadingList={loadingList}
      saveButtonLabel={saveButtonLabel}
      maxHeight={maxHeight}
    />
  );
};

export { NewDecisionForm };
