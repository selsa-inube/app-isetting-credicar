import { Stack, Textarea, Textfield } from "@inubekit/inubekit";
import { InfoConfigurationModal } from "@pages/creditLines/tabs/infoConfigurationModal";
import { SubmitRequestModal } from "@pages/creditLines/tabs/submitRequestModal";
import { ButtonsConfiguration } from "@pages/creditLines/tabs/buttonsConfiguration";
import { RequestModal } from "@pages/creditLines/tabs/requestModal";
import { StyledFloatButtonsContainer } from "@pages/creditLines/tabs/buttonsConfiguration/styles";
import { tokens } from "@design/tokens";
import { DecisionModal } from "@design/modals/decisionModal";
import { getFieldState } from "@utils/getFieldState";
import { submitRequestLabels } from "@config/creditLines/submitRequestLabels";
import { nameAndDescriptionLabels } from "@config/creditLines/configuration/nameAndDescriptionLabels";
import { options } from "@config/creditLines/configuration/mainOptions";
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
    showUnconfiguredModal,
    unconfiguredRules,
    onUnconfiguredModal,
    onToggleUnconfiguredRules,
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
          lineType={options.lineNames.links.namesAndDescriptions.label}
          updateData={isUpdated}
          loading={loading}
          withoutDecisions={true}
          onToggleInfoModal={onToggleInfoModal}
          onOpenModal={onOpenModal}
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
            title={options.lineNames.links.namesAndDescriptions.label}
            description={message}
            onClick={onToggleInfoModal}
            onCloseModal={onToggleInfoModal}
          />
        )}
        {showUnconfiguredModal && (
          <SubmitRequestModal
            title={submitRequestLabels.title}
            unconfiguredRules={unconfiguredRules}
            description={submitRequestLabels.description}
            onClick={onUnconfiguredModal}
            onCloseModal={onToggleUnconfiguredRules}
            loading={loading}
          />
        )}
      </Stack>
      <StyledFloatButtonsContainer>
        <ButtonsConfiguration navigation={navigation} />
      </StyledFloatButtonsContainer>
    </>
  );
};

export { NameAndDescriptionFormUI };
