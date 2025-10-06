import { useClientsSupportLineForm } from "@hooks/creditLine/useClientsSupportLineForm";
import { IClientsSupportLineForm } from "@ptypes/creditLines/IClientsSupportLineForm";
import { ClientsSupportLineFormUI } from "./interface";

const ClientsSupportLineForm = (props: IClientsSupportLineForm) => {
  const { templateKey } = props;
  const {
    optionsExcluded,
    optionsIncluded,
    showInfoModal,
    loading,
    loadingModify,
    nav,
    lineNameDecision,
    message,
    unconfiguredRules,
    showUnconfiguredModal,
    loadingData,
    language,
    handleToggleUnconfiguredRulesModal,
    handleUnconfiguredRules,
    handleOpenModal,
    handleToggleInfoModal,
    handleMove,
  } = useClientsSupportLineForm({ templateKey });

  return (
    <ClientsSupportLineFormUI
      showInfoModal={showInfoModal}
      onToggleInfoModal={handleToggleInfoModal}
      optionsExcluded={optionsExcluded}
      optionsIncluded={optionsIncluded}
      updateData={loadingModify}
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
      loadingData={loadingData}
      language={language}
    />
  );
};

export { ClientsSupportLineForm };
