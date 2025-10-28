import { useContext } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useDragAndDropBoxesForm } from "@hooks/creditLine/useDragAndDropBoxesForm";
import { useEnumsPossibleValues } from "@hooks/useEnumsPossibleValues";
import { useConfigurationLines } from "@hooks/creditLine/configurationLines/useConfigurationLines";
import { EUseCase } from "@enum/useCase";
import { ECreditLines } from "@enum/creditLines";
import { IClientsSupportLineForm } from "@ptypes/creditLines/IClientsSupportLineForm";
import { LineCreditFormFormUI } from "./interface";

const LineCreditFormForm = (props: IClientsSupportLineForm) => {
  const { templateKey } = props;
  const { appData } = useContext(AuthAndPortalData);

  const {
    showInfoModal,
    creditOptionsExcluded,
    creditOptionsIncluded,
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
    creditLineData,
    linesConstructionData,
    ruleLoadding,
    setCreditLineData,
    setCreditOptionsIncluded,
    setCreditOptionsExcluded,
    handleToggleInfoModal,
    handleOpenModal,
  } = useConfigurationLines({ templateKey });

  const { valuesData, loading: loadingOptions } = useEnumsPossibleValues({
    businessUnit: appData.businessUnit.publicCode,
  });

  const { message, loadingData, handleMove } = useDragAndDropBoxesForm({
    templateKey,
    clientSupportData: creditLineData,
    linesConstructionData,
    ruleLoadding,
    ruleOption: ECreditLines.CREDIT_LINE_RULE,
    optionsIncluded: creditOptionsIncluded,
    optionsExcluded: creditOptionsExcluded,
    useCaseConfiguration,
    infoRuleName: ECreditLines.CREDIT_LINE_RULE,
    supportLine: valuesData,
    loadingSupportOptions: loadingOptions,
    setClientSupportData: setCreditLineData,
    setOptionsIncluded: setCreditOptionsIncluded,
    setOptionsExcluded: setCreditOptionsExcluded,
  });

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
