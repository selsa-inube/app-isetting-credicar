import { useClientsSupportLineForm } from "@hooks/creditLine/useClientsSupportLineForm";
import { ClientsSupportLineFormUI } from "./interface";

const ClientsSupportLineForm = () => {
  const {
    optionsExcluded,
    optionsIncluded,
    showInfoModal,
    loading,
    isUpdated,
    nav,
    lineNameDecision,
    message,
    unconfiguredRules,
    showUnconfiguredModal,
    handleToggleUnconfiguredRulesModal,
    handleUnconfiguredRules,
    handleOpenModal,
    handleToggleInfoModal,
    handleMove,
  } = useClientsSupportLineForm();

  return (
    <ClientsSupportLineFormUI
      showInfoModal={showInfoModal}
      onToggleInfoModal={handleToggleInfoModal}
      optionsExcluded={optionsExcluded}
      optionsIncluded={optionsIncluded}
      updateData={isUpdated}
      loading={loading}
      onOpenModal={handleOpenModal}
      onMove={handleMove}
      navigation={nav}
      lineNameDecision={lineNameDecision}
      message={message}
      onUnconfiguredModal={handleUnconfiguredRules}
      onToggleUnconfiguredRules={handleToggleUnconfiguredRulesModal}
      showUnconfiguredModal={showUnconfiguredModal}
      unconfiguredRules={unconfiguredRules}
    />
  );
};

export { ClientsSupportLineForm };
