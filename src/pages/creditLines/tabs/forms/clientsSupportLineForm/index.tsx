import { useContext } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useConfigurationLines } from "@hooks/creditLine/configurationLines/useConfigurationLines";
import { useEnumeratorsCrediboard } from "@hooks/useEnumeratorsCrediboard";
import { useDragAndDropBoxesForm } from "@hooks/creditLine/useDragAndDropBoxesForm";
import { EUseCase } from "@enum/useCase";
import { ECreditLines } from "@enum/creditLines";
import { IClientsSupportLineForm } from "@ptypes/creditLines/IClientsSupportLineForm";
import { ClientsSupportLineFormUI } from "./interface";

const ClientsSupportLineForm = (props: IClientsSupportLineForm) => {
  const { templateKey } = props;

  const { appData } = useContext(AuthAndPortalData);

  const {
    showInfoModal,
    optionsExcluded,
    optionsIncluded,
    loading,
    nav,
    loadingModify,
    lineNameDecision,
    showSendModal,
    submitModalData,
    language,
    title,
    description,
    optionCrumb,
    optionDetails,
    useCaseConfiguration,
    optionIcon,
    clientSupportData,
    linesConstructionData,
    ruleLoadding,
    setClientSupportData,
    setOptionsIncluded,
    setOptionsExcluded,
    handleToggleInfoModal,
    handleOpenModal,
  } = useConfigurationLines({ templateKey });

  const { enumData: supportLine, loading: loadingSupportOptions } =
    useEnumeratorsCrediboard({
      businessUnits: appData.businessUnit.publicCode,
      enumQuery: ECreditLines.SUPPORT_LINE,
    });

  const { message, loadingData, handleMove } = useDragAndDropBoxesForm({
    templateKey,
    clientSupportData,
    linesConstructionData,
    ruleLoadding,
    ruleOption: ECreditLines.CLIENT_SUPPORT_RULE,
    optionsIncluded,
    optionsExcluded,
    useCaseConfiguration,
    infoRuleName: ECreditLines.CLIENTS_SUPPORTED,
    supportLine,
    loadingSupportOptions,
    setClientSupportData,
    setOptionsIncluded,
    setOptionsExcluded,
  });

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

export { ClientsSupportLineForm };
