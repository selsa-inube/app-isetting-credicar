import { useContext } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useDragAndDropBoxesForm } from "@hooks/creditLine/dragAndDropBoxesForm/useDragAndDropBoxesForm";
import { useEnumsPossibleValues } from "@hooks/useEnumsPossibleValues";
import { useConfigurationLines } from "@hooks/creditLine/configurationLines/useConfigurationLines";
import { EUseCase } from "@enum/useCase";
import { EPathListOfPossibleValues } from "@enum/pathListOfPossibleValues";
import { ECreditLines } from "@enum/creditLines";
import { IClientsSupportLineForm } from "@ptypes/creditLines/IClientsSupportLineForm";
import { LineCreditFormFormUI } from "./interface";
import { useOutletContext } from "react-router-dom";
import { IOutletCtx } from "@ptypes/creditLines/IOutletCtx";
import React from "react";
import { INavGuard } from "@ptypes/creditLines/INavGuard";

const LineCreditFormForm = (props: IClientsSupportLineForm) => {
  const { templateKey } = props;
  const { setBeforeDropdownNavigate } = useOutletContext<IOutletCtx>();
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
    configuredDecisions,
    setLinesData,
    setCreditOptionsIncluded,
    setCreditOptionsExcluded,
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

  const { valuesData, loading: loadingOptions } = useEnumsPossibleValues({
    businessUnit: appData.businessUnit.publicCode,
    path: EPathListOfPossibleValues.MONEY_DESTINATION,
    token: appData.token,
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
      lineNameDecision,
      loadingSupportOptions: loadingOptions,
      setOptionsIncluded: setCreditOptionsIncluded,
      setOptionsExcluded: setCreditOptionsExcluded,
      condition: "MoneyDestination",
      configuredDecisions,
      setLinesData,
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
