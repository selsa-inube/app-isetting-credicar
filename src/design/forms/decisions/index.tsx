import { useContext } from "react";
import { IRuleDecision } from "@isettingkit/input";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEnumRules } from "@hooks/moneyDestination/useEnumRules";
import { useDecisionForm } from "@hooks/forms/useDecisionForm";
import { IDecisionsForm } from "@ptypes/design/IDecisionsForm";
import { ENameRules } from "@enum/nameRules";
import { DecisionsFormUI } from "./interface";

const DecisionsForm = (props: IDecisionsForm) => {
  const {
    attentionModal,
    deleteModal,
    initialValues,
    labelBusinessRules,
    textValuesBusinessRules,
    editDataOption,
    nameRule,
    showAttentionModal,
    titleContentAddCard,
    messageEmptyDecisions,
    normalizeEvaluateRuleData,
    disabledButton,
    heightContentPage = "70vh",
    bottomAddButton = "55px",
    ruleCatalog = ENameRules.RULE_CATALOG_CREDIBOARD,
    decisionTemplateConfig,
    onButtonClick,
    onPreviousStep,
    revertModalDisplayData,
    setDecisions,
    setShowAttentionModal,
  } = props;

  const {
    isModalOpen,
    selectedDecision,
    decisions,
    showDeleteModal,
    isMobile,
    saveButtonLabel,
    cancelButtonLabel,
    shouldShowAttentionModal,
    disabledNext,
    disabledPrevius,
    showDecisionModal,
    showFloatingAddButton,
    heightContent,
    handleOpenModal,
    handleCloseModal,
    handleSubmitForm,
    handleToggleAttentionModal,
    handleToggleDeleteModal,
    handleDelete,
    handleSave,
  } = useDecisionForm({
    initialValues,
    revertModalDisplayData,
    onButtonClick,
    setCreditLineDecisions: setDecisions,
    showAttentionModal,
    setShowAttentionModal,
    normalizeEvaluateRuleData,
    editDataOption,
    disabledButton,
    onPreviousStep,
    attentionModal,
    heightContentPage,
  });

  const { appData } = useContext(AuthAndPortalData);
  const { ruleData } = useEnumRules({
    enumDestination: labelBusinessRules,
    ruleCatalog,
    businessUnits: appData.businessUnit.publicCode,
  });

  return (
    <DecisionsFormUI
      attentionModal={attentionModal}
      decisions={decisions}
      decisionTemplate={
        decisionTemplateConfig(
          ruleData,
          nameRule,
          appData.businessUnit.publicCode,
        ) ?? ({} as IRuleDecision)
      }
      deleteModal={deleteModal}
      isModalOpen={isModalOpen}
      loading={false}
      onCloseModal={handleCloseModal}
      onDelete={handleDelete}
      onButtonClick={onButtonClick}
      onOpenModal={handleOpenModal}
      onSubmitForm={(dataDecision: IRuleDecision) =>
        handleSubmitForm(
          dataDecision,
          decisionTemplateConfig(
            ruleData,
            nameRule,
            appData.businessUnit.publicCode,
          ) ?? ({} as IRuleDecision),
        )
      }
      onToggleAttentionModal={handleToggleAttentionModal}
      onToggleDeleteModal={handleToggleDeleteModal}
      selectedDecision={selectedDecision}
      showDeleteModal={showDeleteModal}
      textValuesBusinessRules={textValuesBusinessRules}
      onSave={handleSave}
      titleContentAddCard={titleContentAddCard}
      messageEmptyDecisions={messageEmptyDecisions}
      isMobile={isMobile}
      saveButtonLabel={saveButtonLabel}
      cancelButtonLabel={cancelButtonLabel}
      shouldShowAttentionModal={shouldShowAttentionModal}
      disabledNext={disabledNext ?? false}
      disabledPrevius={disabledPrevius}
      cancelButton={onPreviousStep}
      showDecisionModal={showDecisionModal}
      showFloatingAddButton={showFloatingAddButton}
      editDataOption={editDataOption}
      heightContent={heightContent}
      bottomAddButton={bottomAddButton}
    />
  );
};

export { DecisionsForm };
