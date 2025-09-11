import { useClientsSupportLineForm } from "@hooks/creditLine/useClientsSupportLineForm";
import { ClientsSupportLineFormUI } from "./interface";

const ClientsSupportLineForm = () => {
  const {
    selectedConditionId,
    optionsExcluded,
    optionsIncluded,
    showInfoModal,
    loading,
    updateData,
    handleOpenModal,
    handleToggleInfoModal,
    setSelectedConditionId,
    handleClickIncluded,
    handleClickExcluded,
  } = useClientsSupportLineForm();

  return (
    <ClientsSupportLineFormUI
      showInfoModal={showInfoModal}
      onToggleInfoModal={handleToggleInfoModal}
      optionsExcluded={optionsExcluded}
      optionsIncluded={optionsIncluded}
      selectedConditionId={selectedConditionId}
      setSelectedConditionId={setSelectedConditionId}
      onClickIncluded={handleClickIncluded}
      onClickExcluded={handleClickExcluded}
      updateData={updateData}
      loading={loading}
      onOpenModal={handleOpenModal}
    />
  );
};

export { ClientsSupportLineForm };
