import { useContext } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEnumRules } from "@hooks/moneyDestination/useEnumRules";
import { useDecisionForm } from "@hooks/forms/useDecisionForm";
import { capitalizeText } from "@utils/capitalizeText";
import { ENameRules } from "@enum/nameRules";
import { IDecisionsForm } from "@ptypes/design/IDecisionsForm";
import { ILanguage } from "@ptypes/i18n";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
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

  const { appData } = useContext(AuthAndPortalData);

  const { ruleData, loadingList } = useEnumRules({
    enumDestination: labelBusinessRules,
    ruleCatalog,
    catalogAction: capitalizeText(ruleCatalog),
    businessUnits: appData.businessUnit.publicCode,
    token: appData.token,
  });

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
    ruleData,
    language: appData.language as ILanguage,
  });

  const enumeratorsRules = ruleData as unknown as IRuleDecisionExtended;

  const getDecisionTemplate = () => {
    return decisionTemplateConfig(
      enumeratorsRules,
      appData.language,
      nameRule,
      appData.businessUnit.publicCode,
    ) as unknown as IRuleDecisionExtended;
  };

  const decisionTemplate = getDecisionTemplate();

  return (
    <DecisionsFormUI
      attentionModal={attentionModal}
      decisions={decisions}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      decisionTemplate={decisionTemplate as any}
      deleteModal={deleteModal}
      isModalOpen={isModalOpen}
      loading={loadingList}
      onCloseModal={handleCloseModal}
      onDelete={handleDelete}
      onButtonClick={onButtonClick}
      onOpenModal={handleOpenModal}
      onSubmitForm={(dataDecision: IRuleDecisionExtended) =>
        handleSubmitForm(
          dataDecision,
          decisionTemplate as unknown as IRuleDecisionExtended,
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
