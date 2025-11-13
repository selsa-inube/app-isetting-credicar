import { Stack, Textarea, Textfield } from "@inubekit/inubekit";
import { InfoConfigurationModal } from "@pages/creditLines/tabs/infoConfigurationModal";
import { SubmitRequestModal } from "@pages/creditLines/tabs/submitRequestModal";
import { ButtonsConfiguration } from "@pages/creditLines/tabs/buttonsConfiguration";
import { RequestModal } from "@pages/creditLines/tabs/requestModal";
import { StyledFloatButtonsContainer } from "@pages/creditLines/tabs/buttonsConfiguration/styles";
import { ECreditLines } from "@enum/creditLines";
import { tokens } from "@design/tokens";
import { DecisionModal } from "@design/modals/decisionModal";
import { getFieldState } from "@utils/getFieldState";
import { titleOptionConfigLine } from "@utils/titleOptionConfigLine";
import { nameAndDescriptionLabels } from "@config/creditLines/configuration/nameAndDescriptionLabels";
import { portalId } from "@config/portalId";
import { INameAndDescriptionFormUI } from "@ptypes/creditLines/forms/INameAndDescriptionFormUI";
import { LineInformation } from "../lineInformation";

const NameAndDescriptionFormUI = (props: INameAndDescriptionFormUI) => {
  const {
    formik,
    showModal,
    showInfoModal,
    modalData,
    loading,
    lineName,
    isUpdated,
    navigation,
    message,
    requestSteps,
    saveData,
    showRequestProcessModal,
    showRequestStatusModal,
    language,
    title,
    description,
    optionCrumb,
    disabledField,
    optionDetails,
    optionIcon,
    showSendModal,
    submitModalData,
    editOption,
    onCloseRequestStatus,
    onClosePendingModal,
    onCloseProcess,
    onToggleInfoModal,
    onOpenModal,
  } = props;

  return (
    <>
      <Stack
        direction="column"
        gap={tokens.spacing.s300}
        padding={`${tokens.spacing.s350} ${tokens.spacing.s700}`}
        width="-webkit-fill-available"
        height="100%"
      >
        <LineInformation
          lineName={lineName}
          lineType={titleOptionConfigLine(ECreditLines.LINE_DESCRIPTIONS) || ""}
          updateData={isUpdated}
          loading={loading}
          withoutDecisions={true}
          title={title}
          description={description}
          optionCrumb={optionCrumb}
          onToggleInfoModal={onToggleInfoModal}
          onOpenModal={onOpenModal}
          withIcon={!optionIcon}
          withBackModal={!optionDetails}
        />
        {!loading && (
          <Stack direction="column" gap={tokens.spacing.s200}>
            <Textfield
              name="aliasLine"
              id="aliasLine"
              label={nameAndDescriptionLabels.aliasLine}
              placeholder={nameAndDescriptionLabels.placeholderAliasLine}
              size="compact"
              value={formik.values.aliasLine}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              status={getFieldState(formik, "aliasLine")}
              message={formik.errors.aliasLine}
              maxLength={nameAndDescriptionLabels.maxLenghtAlias}
              disabled={disabledField}
              fullwidth
              required
            />

            <Textfield
              name="nameLine"
              id="nameLine"
              label={nameAndDescriptionLabels.nameLine}
              placeholder={nameAndDescriptionLabels.placeholderNameLine}
              size="compact"
              value={formik.values.nameLine}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              status={getFieldState(formik, "nameLine")}
              message={formik.errors.nameLine}
              maxLength={nameAndDescriptionLabels.maxLenghtName}
              disabled={disabledField}
              fullwidth
              required
            />

            <Textarea
              label={nameAndDescriptionLabels.descriptionLine}
              placeholder={nameAndDescriptionLabels.placeholderdescription}
              name="descriptionLine"
              id="descriptionLine"
              value={formik.values.descriptionLine}
              maxLength={nameAndDescriptionLabels.maxLenghtDescription}
              status={getFieldState(formik, "descriptionLine")}
              message={formik.errors.descriptionLine}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              disabled={disabledField}
              fullwidth
              required
            />
          </Stack>
        )}
        <RequestModal
          showRequestProcessModal={showRequestProcessModal}
          showRequestStatusModal={showRequestStatusModal}
          saveData={saveData}
          requestSteps={requestSteps}
          onCloseRequestStatus={onCloseRequestStatus}
          onCloseProcess={onCloseProcess}
          onClosePendingModal={onClosePendingModal}
        />

        {showModal && (
          <DecisionModal
            portalId={portalId}
            title={modalData.title}
            actionText={modalData.actionText}
            description={modalData.description}
            subtitle={modalData.subtitle}
            onCloseModal={modalData.onCloseModal}
            onClick={modalData.onClick}
            withCancelButton={modalData.withCancelButton}
            withIcon={modalData.withIcon}
            icon={modalData.icon}
            appearance={modalData.appearance}
            appearanceButton={modalData.appearanceButton}
          />
        )}
        {showInfoModal && (
          <InfoConfigurationModal
            title={titleOptionConfigLine(ECreditLines.LINE_DESCRIPTIONS) || ""}
            description={message}
            onClick={onToggleInfoModal}
            onCloseModal={onToggleInfoModal}
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
            editOption={editOption}
          />
        )}
      </Stack>
      <StyledFloatButtonsContainer>
        <ButtonsConfiguration
          navigation={navigation}
          withSendButton={!optionDetails}
        />
      </StyledFloatButtonsContainer>
    </>
  );
};

export { NameAndDescriptionFormUI };
