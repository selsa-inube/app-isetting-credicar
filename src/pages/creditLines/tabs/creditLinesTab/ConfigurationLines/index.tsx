import { useConfigurationLines } from "@hooks/creditLine/configurationLines/useConfigurationLines";
import { ConfigurationLinesUI } from "./interface";

const ConfigurationLines = () => {
  const {
    loading,
    lineData,
    updateData,
    withDecisions,
    withoutDecisions,
    showDecision,
    modalData,
    showInfoModal,
    handleToggleInfoModal,
    handleOpenModal,
  } = useConfigurationLines();

  return (
    <ConfigurationLinesUI
      loading={loading}
      data={lineData}
      updateData={updateData}
      withDecisions={withDecisions}
      withoutDecisions={withoutDecisions}
      showModal={showDecision}
      modalData={modalData}
      onToggleInfoModal={handleToggleInfoModal}
      onOpenModal={handleOpenModal}
      showInfoModal={showInfoModal}
    />
  );
};
export { ConfigurationLines };
