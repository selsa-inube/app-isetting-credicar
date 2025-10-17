import { useState, useEffect } from "react";
import { useMediaQuery } from "@inubekit/inubekit";
import { IRuleDecision } from "@isettingkit/input";
import { formatDateDecision } from "@utils/date/formatDateDecision";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { IUseDecisionForm } from "@ptypes/hooks/IUseDecisionForm";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";

const useDecisionForm = (props: IUseDecisionForm) => {
  const {
    initialValues,
    revertModalDisplayData,
    onButtonClick,
    setCreditLineDecisions,
    showAttentionModal,
    setShowAttentionModal,
    normalizeEvaluateRuleData,
    editDataOption,
    disabledButton,
    onPreviousStep,
    attentionModal,
    heightContentPage,
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDecision, setSelectedDecision] =
    useState<IRuleDecision | null>(null);
  const [decisions, setDecisions] =
    useState<IRuleDecisionExtended[]>(initialValues);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [id, setId] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [savedDecisions, setSavedDecisions] = useState<IRuleDecisionExtended[]>(
    [],
  );

  const [initialDecisions] = useState<IRuleDecision[]>(initialValues);

  const handleOpenModal = () => {
    setSelectedDecision(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDecision(null);
  };

  const handleSubmitForm = (
    dataDecision: IRuleDecisionExtended,
    decisionTemplate: IRuleDecisionExtended,
  ) => {
    const isEditing = selectedDecision !== null;
    const updatedConditionGroups = decisionTemplate.conditionGroups?.map(
      (templateGroup) => {
        const updatedConditions =
          templateGroup.conditionsThatEstablishesTheDecision;

        return {
          ...templateGroup,
          conditionGroupId: templateGroup.conditionGroupId || "",
          conditionsThatEstablishesTheDecision: updatedConditions,
        };
      },
    );

    const decisionsByRuleData = {
      effectiveFrom:
        typeof dataDecision.effectiveFrom === "string"
          ? formatDateDecision(dataDecision.effectiveFrom)
          : formatDateDecision(dataDecision.effectiveFrom?.toString() || ""),
      validUntil:
        typeof dataDecision.validUntil === "string"
          ? formatDateDecision(dataDecision.validUntil)
          : formatDateDecision(dataDecision.validUntil?.toString() || ""),
      value: dataDecision.value,
      conditionGroups: updatedConditionGroups,
      decisionId: isEditing
        ? selectedDecision.decisionId
        : `Decisión ${decisions.length + 1}`,
    };

    const newDecision = isEditing
      ? (revertModalDisplayData(
          dataDecision,
          selectedDecision,
        ) as unknown as IRuleDecisionExtended)
      : {
          ...dataDecision,
          decisionId: `Decisión ${decisions.length + 1}`,
          decisionsByRule: [decisionsByRuleData],
        };

    const updatedDecisions = isEditing
      ? decisions.map((decision) =>
          decision.decisionId === selectedDecision.decisionId
            ? newDecision
            : decision,
        )
      : [...decisions, newDecision];
    setDecisions(updatedDecisions);
    setCreditLineDecisions(updatedDecisions);
    handleCloseModal();
  };

  const handleToggleAttentionModal = () => {
    if (setShowAttentionModal) setShowAttentionModal(!showAttentionModal);
  };

  const handleToggleDeleteModal = (id: string) => {
    setId(id);
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDelete = () => {
    const updatedDecisions = decisions.filter(
      (decision) => decision.decisionId !== id,
    );
    setDecisions(updatedDecisions);
    setCreditLineDecisions(updatedDecisions);
    handleToggleDeleteModal(id);
  };

  const handleSave = () => {
    if (editDataOption) {
      setHasChanges(false);
      setSavedDecisions(decisions);
      onButtonClick();
      return decisions;
    } else {
      onButtonClick();
      if (decisions && decisions.length > 0) {
        setSavedDecisions(decisions);
      } else {
        handleToggleAttentionModal();
      }
    }
  };

  const handleReset = () => {
    if (editDataOption && normalizeEvaluateRuleData) {
      setDecisions(normalizeEvaluateRuleData);
      setSavedDecisions(normalizeEvaluateRuleData);
      setCreditLineDecisions(normalizeEvaluateRuleData);
    } else {
      setDecisions(initialDecisions);
      setSavedDecisions(initialDecisions);
    }
  };

  useEffect(() => {
    if (
      JSON.stringify(decisions) !== JSON.stringify(initialValues) ||
      JSON.stringify(normalizeEvaluateRuleData) !== JSON.stringify(decisions)
    ) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [decisions, initialDecisions]);

  const isMobile = useMediaQuery("(max-width: 990px)");

  const saveButtonLabel = editDataOption
    ? decisionsLabels.labelSaveButton
    : decisionsLabels.labelNextButton;

  const cancelButtonLabel = editDataOption
    ? decisionsLabels.labelCancelButton
    : decisionsLabels.labelpreviousButton;

  const shouldShowAttentionModal = Boolean(
    showAttentionModal && attentionModal,
  );

  const disabledNext = editDataOption ? !hasChanges : disabledButton;

  const disabledPrevius = editDataOption ? !hasChanges : false;

  const cancelButton = editDataOption ? handleReset : onPreviousStep;

  const showDecisionModal =
    shouldShowAttentionModal && attentionModal ? true : false;

  const showFloatingAddButton = isMobile && decisions.length > 0;

  const heightContent =
    isMobile && editDataOption ? heightContentPage : isMobile ? "60vh" : "auto";

  return {
    isModalOpen,
    selectedDecision,
    decisions,
    showDeleteModal,
    hasChanges,
    savedDecisions,
    isMobile,
    saveButtonLabel,
    cancelButtonLabel,
    shouldShowAttentionModal,
    disabledNext,
    disabledPrevius,
    showDecisionModal,
    showFloatingAddButton,
    heightContent,
    cancelButton,
    handleOpenModal,
    handleCloseModal,
    handleSubmitForm,
    handleToggleAttentionModal,
    handleToggleDeleteModal,
    handleDelete,
    handleSave,
    handleReset,
  };
};

export { useDecisionForm };
