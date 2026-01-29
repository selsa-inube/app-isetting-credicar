import { useOutletContext } from "react-router-dom";
import React, { useContext } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useConfigurationLines } from "@hooks/creditLine/configurationLines/useConfigurationLines";
import { useEnumeratorsCrediboard } from "@hooks/useEnumeratorsCrediboard";
import { useDragAndDropBoxesForm } from "@hooks/creditLine/dragAndDropBoxesForm/useDragAndDropBoxesForm";
import { EUseCase } from "@enum/useCase";
import { ECreditLines } from "@enum/creditLines";
import { INavGuard } from "@ptypes/creditLines/INavGuard";
import { IClientsSupportLineForm } from "@ptypes/creditLines/IClientsSupportLineForm";
import { IOutletCtx } from "@ptypes/creditLines/IOutletCtx";
import { ClientsSupportLineFormUI } from "./interface";

const ClientsSupportLineForm = (props: IClientsSupportLineForm) => {
  const { templateKey } = props;
  const { setBeforeDropdownNavigate } = useOutletContext<IOutletCtx>();
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
    ruleLoadding,
    configuredDecisions,
    requestSteps,
    showRequestProcessModal,
    showRequestStatusModal,
    saveCreditLines,
    handleCloseRequestStatus,
    handleCloseProcess,
    handleClosePendingModal,
    setLinesData,
    setOptionsIncluded,
    setOptionsExcluded,
    handleToggleInfoModal,
    handleOpenModal,
    beforeDropdownNavigate,
  } = useConfigurationLines({ templateKey });

  const guardRef = React.useRef(beforeDropdownNavigate);

  React.useEffect(() => {
    guardRef.current = beforeDropdownNavigate;
  }, [beforeDropdownNavigate]);

  React.useEffect(() => {
    const stableGuard: INavGuard = (to) => guardRef.current(to);

    setBeforeDropdownNavigate(() => stableGuard);

    return () => setBeforeDropdownNavigate(undefined);
  }, [setBeforeDropdownNavigate]);

  const { enumData: supportLine, loading: loadingSupportOptions } =
    useEnumeratorsCrediboard({
      businessUnits: appData.businessUnit.publicCode,
      enumQuery: ECreditLines.SUPPORT_LINE,
      token: appData.token,
    });

  const { message, loadingData, showInfo, handleMove } =
    useDragAndDropBoxesForm({
      templateKey,
      ruleLoadding,
      ruleOption: ECreditLines.CLIENT_SUPPORT_RULE,
      optionsIncluded,
      optionsExcluded,
      infoRuleName: ECreditLines.CLIENTS_SUPPORTED,
      supportLine,
      loadingSupportOptions,
      setOptionsIncluded,
      setOptionsExcluded,
      condition: "CreditRiskProfile",
      configuredDecisions,
      setLinesData,
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
      showInfo={showInfo}
      requestSteps={requestSteps}
      showRequestProcessModal={showRequestProcessModal}
      showRequestStatusModal={showRequestStatusModal}
      saveCreditLines={saveCreditLines}
      handleCloseRequestStatus={handleCloseRequestStatus}
      handleCloseProcess={handleCloseProcess}
      handleClosePendingModal={handleClosePendingModal}
    />
  );
};

export { ClientsSupportLineForm };
