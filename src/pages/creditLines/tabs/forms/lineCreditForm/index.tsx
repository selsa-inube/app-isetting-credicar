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
    ruleLoadding,
    setCreditOptionsIncluded,
    setCreditOptionsExcluded,
    handleToggleInfoModal,
    handleOpenModal,
  } = useConfigurationLines({ templateKey });

  const { valuesData, loading: loadingOptions } = useEnumsPossibleValues({
    businessUnit: appData.businessUnit.publicCode,
  });

  const { message, loadingData, showInfo, handleMove } =
    useDragAndDropBoxesForm({
      templateKey,
      ruleLoadding,
      ruleOption: ECreditLines.CREDIT_LINE_RULE,
      optionsIncluded: creditOptionsIncluded,
      optionsExcluded: creditOptionsExcluded,
      infoRuleName: ECreditLines.CREDIT_LINE_RULE,
      supportLine: valuesData,
      loadingSupportOptions: loadingOptions,
      setOptionsIncluded: setCreditOptionsIncluded,
      setOptionsExcluded: setCreditOptionsExcluded,
      condition: "MoneyDestination",
    });

  return (
    <LineCreditFormFormUI
      showInfoModal={showInfoModal}
      onToggleInfoModal={handleToggleInfoModal}
      optionsExcluded={creditOptionsExcluded}
      optionsIncluded={creditOptionsIncluded}
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
      showInfo={showInfo}
    />
  );
};

export { LineCreditFormForm };
