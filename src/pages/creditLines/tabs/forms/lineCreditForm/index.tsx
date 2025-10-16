import { useCreditLineForm } from "@hooks/creditLine/useCreditLineForm";
import { EUseCase } from "@enum/useCase";
import { IClientsSupportLineForm } from "@ptypes/creditLines/IClientsSupportLineForm";
import { LineCreditFormFormUI } from "./interface";

const LineCreditFormForm = (props: IClientsSupportLineForm) => {
  const { templateKey } = props;
  const {
    creditOptionsIncluded,
    creditOptionsExcluded,
    showInfoModal,
    loading,
    loadingModify,
    nav,
    lineNameDecision,
    message,
    loadingData,
    language,
    title,
    description,
    optionCrumb,
    optionDetails,
    optionIcon,
    showSendModal,
    submitModalData,
    useCaseConfiguration,
    handleOpenModal,
    handleToggleInfoModal,
    handleMove,
  } = useCreditLineForm({ templateKey });

  return (
    <LineCreditFormFormUI
      showInfoModal={showInfoModal}
      onToggleInfoModal={handleToggleInfoModal}
      optionsExcluded={creditOptionsIncluded}
      optionsIncluded={creditOptionsExcluded}
      updateData={loadingModify}
      loading={loading}
      onOpenModal={handleOpenModal}
      onMove={handleMove}
      navigation={nav}
      lineNameDecision={lineNameDecision}
      message={message}
      loadingData={loadingData}
      language={language}
      title={title}
      showSendModal={showSendModal}
      submitModalData={submitModalData}
      description={description}
      optionCrumb={optionCrumb}
      optionDetails={optionDetails}
      optionIcon={optionIcon}
      editOption={useCaseConfiguration === EUseCase.EDIT}
    />
  );
};

export { LineCreditFormForm };
