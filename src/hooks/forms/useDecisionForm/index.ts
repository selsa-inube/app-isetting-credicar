import { useState, useEffect } from "react";
import { IRuleDecision } from "@isettingkit/input";

const useDecisionForm = (
  initialValues: IRuleDecision[],
  revertModalDisplayData: (
    dataDecision: IRuleDecision,
    originalDecision: IRuleDecision,
  ) => void,
  onButtonClick: () => void,
  setCreditLineDecisions: (decisions: IRuleDecision[]) => void,
  setShowAttentionModal: React.Dispatch<React.SetStateAction<boolean>>,
  showAttentionModal: boolean,
  normalizeEvaluateRuleData?: IRuleDecision[],
  editDataOption?: boolean,
) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDecision, setSelectedDecision] =
    useState<IRuleDecision | null>(null);
  const [decisions, setDecisions] = useState<IRuleDecision[]>(initialValues);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [id, setId] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [savedDecisions, setSavedDecisions] = useState<IRuleDecision[]>([]);

  const initialDecisions = useState(initialValues)[0];

  const handleOpenModal = () => {
    setSelectedDecision(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDecision(null);
  };

  const handleSubmitForm = (
    dataDecision: IRuleDecision,
    decisionTemplate: IRuleDecision,
  ) => {
    const isEditing = selectedDecision !== null;

    const updatedConditions =
      decisionTemplate.conditionsThatEstablishesTheDecision?.map(
        (templateCondition) => {
          const existingCondition =
            dataDecision.conditionsThatEstablishesTheDecision?.find(
              (condition) =>
                condition.conditionName === templateCondition.conditionName,
            );

          if (!existingCondition) {
            return templateCondition;
          }

          return existingCondition;
        },
      );

    const newDecision = isEditing
      ? (revertModalDisplayData(
          dataDecision,
          selectedDecision,
        ) as unknown as IRuleDecision)
      : {
          ...dataDecision,
          decisionId: `Decisión ${decisions.length + 1}`,
          conditionThatEstablishesTheDecision: updatedConditions,
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
    setShowAttentionModal(!showAttentionModal);
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
      if (decisions && decisions.length > 0) {
        onButtonClick();
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
      JSON.stringify(decisions) !== JSON.stringify(initialDecisions) ||
      JSON.stringify(normalizeEvaluateRuleData) !== JSON.stringify(decisions)
    ) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [decisions, initialDecisions]);

  return {
    isModalOpen,
    selectedDecision,
    decisions,
    showDeleteModal,
    hasChanges,
    savedDecisions,
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
