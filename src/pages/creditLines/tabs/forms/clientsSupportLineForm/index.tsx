import { useClientsSupportLineForm } from "@hooks/creditLine/useClientsSupportLineForm";
import { ClientsSupportLineFormUI } from "./interface";

const ClientsSupportLineForm = () => {
  const {
    optionsExcluded,
    optionsIncluded,
    showInfoModal,
    loading,
    isUpdated,
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
    />
  );
};

export { ClientsSupportLineForm };
