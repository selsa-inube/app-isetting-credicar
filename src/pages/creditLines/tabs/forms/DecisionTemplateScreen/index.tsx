import { useContext } from "react";
import { Stack, useMediaQuery } from "@inubekit/inubekit";
import { IRuleDecision } from "@isettingkit/input";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useConfigurationLines } from "@hooks/creditLine/configurationLines/useConfigurationLines";
import { useDecisionTemplate } from "@hooks/creditLine/useDecisionTemplate";
import { SubmitRequestModal } from "@pages/creditLines/tabs/submitRequestModal";
import { BusinessRulesNewHandler } from "@pages/creditLines/tabs/BusinessRulesNewHandler";
import { LineInitiatedModal } from "@pages/creditLines/tabs/creditLinesTab/lineInitiatedModal";
import { InfoConfigurationModal } from "@pages/creditLines/tabs/infoConfigurationModal";
import { RequestModal } from "@pages/creditLines/tabs/requestModal";
import { StyledFloatButtonsContainer } from "@pages/creditLines/tabs/buttonsConfiguration/styles";
import { ButtonsConfiguration } from "@pages/creditLines/tabs/buttonsConfiguration";
import { EUseCase } from "@enum/useCase";
import { DecisionModal } from "@design/modals/decisionModal";
import { tokens } from "@design/tokens";
import { commonTextValues } from "@config/creditLines/decisionTemplates/commonTextValues";
import { portalId } from "@config/portalId";
import { decisionTemplateConfig } from "@config/decisions/decisionTemplateGeneric";
import { remunerativeRateLabels } from "@config/creditLines/creditLinesTab/generic/remunerativeRateLabels";
import { IDecisionTemplateScreen } from "@ptypes/decisions/IDecisionTemplateScreen";
import { ISaveDataResponse } from "@ptypes/saveData/ISaveDataResponse";
import { LineInformation } from "../lineInformation";
import { useOutletContext } from "react-router-dom";
import React from "react";
import { INavGuard } from "@ptypes/creditLines/INavGuard";
import { IOutletCtx } from "@ptypes/creditLines/IOutletCtx";
import { mediaQueryAssisted } from "@config/environment";

const DecisionTemplateScreen = (props: IDecisionTemplateScreen) => {
  const { templateKey } = props;
  const { setBeforeDropdownNavigate } = useOutletContext<IOutletCtx>();
  const {
    showInfoModal,
    modalData,
    showDecision,
    ruleData,
    lineNameDecision,
    lineTypeDecision,
    initialDecisions,
    language,
    nav,
    loadingModify,
    saveCreditLines,
    requestSteps,
    showRequestProcessModal,
    showRequestStatusModal,
    title,
    description,
    optionCrumb,
    optionDetails,
    optionIcon,
    useCaseConfiguration,
    optionsConditionsCSV,
    showSendModal,
    submitModalData,
    ruleLoadding,
    setAddDecision,
    setEditDecision,
    setDeleteDecision,
    handleClosePendingModal,
    handleCloseRequestStatus,
    handleCloseProcess,
    setDecisionData,
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
  const { appData } = useContext(AuthAndPortalData);

  const {
    formId,
    message,
    showLineModal,
    showAddDecisionModal,
    optionAddCreditline,
    componentLoading,
    setShowLineModal,
    handleGoBack,
    handleGoContinue,
  } = useDecisionTemplate({
    templateKey,
    ruleData,
    lineTypeDecision,
    useCaseConfiguration,
    ruleLoadding,
    loadingModify,
  });

  const maxAssistedScreenSize = useMediaQuery(mediaQueryAssisted);

  return (
    <>
      <Stack
        direction="column"
        gap={tokens.spacing.s300}
        padding={`${tokens.spacing.s350} ${tokens.spacing.s700}`}
        width="-webkit-fill-available"
      >
        <LineInformation
          lineName={lineNameDecision}
          lineType={lineTypeDecision}
          loading={componentLoading}
          addUseCase={optionAddCreditline}
          onOpenModal={handleOpenModal}
          onToggleInfoModal={handleToggleInfoModal}
          updateData={componentLoading}
          withDecisions
          title={title}
          description={description}
          optionCrumb={optionCrumb}
          withIcon={!optionIcon}
          withBackModal={!optionDetails}
        />

        <BusinessRulesNewHandler
          key={formId}
          controls
          customMessageEmptyDecisions={undefined}
          customTitleContentAddCard={undefined}
          optionsConditionsCSV={optionsConditionsCSV}
          decisionTemplate={
            (decisionTemplateConfig(
              ruleData,
              appData.language,
            ) as unknown as IRuleDecision) ?? ({} as IRuleDecision)
          }
          initialDecisions={initialDecisions}
          language={language as "es" | "en"}
          loading={loadingModify}
          setDecisionData={setDecisionData}
          textValues={commonTextValues}
          formId={formId as unknown as never}
          option={useCaseConfiguration}
          remunerativerateRule={false}
          setShowLineModal={setShowLineModal}
          showAddDecisionModal={showAddDecisionModal}
          ruleLoading={componentLoading}
          setAddDecision={setAddDecision}
          setEditDecision={setEditDecision}
          setDeleteDecision={setDeleteDecision}
        />

        {showDecision && (
          <DecisionModal
            appearance={modalData.appearance}
            appearanceButton={modalData.appearanceButton}
            actionText={modalData.actionText}
            description={modalData.description}
            icon={modalData.icon}
            onClick={modalData.onClick}
            moreDetails={modalData.moreDetails}
            onCloseModal={modalData.onCloseModal}
            portalId={portalId}
            title={modalData.title}
            withCancelButton={modalData.withCancelButton}
            withIcon={modalData.withIcon}
            changeZIndex
            valueZIndex={4}
          />
        )}

        {showInfoModal && (
          <InfoConfigurationModal
            description={message}
            onClick={handleToggleInfoModal}
            onCloseModal={handleToggleInfoModal}
            title={lineTypeDecision}
            changeZIndex
          />
        )}
        {showSendModal && (
          <SubmitRequestModal
            title={submitModalData.title}
            unconfiguredRules={submitModalData.unconfiguredRules}
            description={submitModalData.description}
            onClick={submitModalData.onClick}
            onCloseModal={submitModalData.onCloseModal}
            loading={submitModalData.loading}
            language={language}
            appearanceItemIcon={submitModalData.appearanceItemIcon}
            itemIcon={submitModalData.itemIcon}
            editOption={useCaseConfiguration === EUseCase.EDIT}
            withCursor={useCaseConfiguration === EUseCase.ADD}
          />
        )}

        <RequestModal
          showRequestProcessModal={showRequestProcessModal}
          showRequestStatusModal={showRequestStatusModal}
          saveData={saveCreditLines as ISaveDataResponse}
          requestSteps={requestSteps}
          onCloseRequestStatus={handleCloseRequestStatus}
          onCloseProcess={handleCloseProcess}
          onClosePendingModal={handleClosePendingModal}
          changeZIndex
        />

        {showLineModal && (
          <LineInitiatedModal
            onGoBack={handleGoBack}
            onGoContinue={handleGoContinue}
            lineInitiatedLabels={remunerativeRateLabels}
          />
        )}
      </Stack>

      <StyledFloatButtonsContainer
        $maxAssistedScreenSize={maxAssistedScreenSize}
      >
        <ButtonsConfiguration
          navigation={nav}
          withSendButton={!optionDetails}
        />
      </StyledFloatButtonsContainer>
    </>
  );
};

export { DecisionTemplateScreen };
