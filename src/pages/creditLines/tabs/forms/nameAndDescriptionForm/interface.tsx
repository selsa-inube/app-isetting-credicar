import { Stack, Textarea, Textfield } from "@inubekit/inubekit";
import { InfoConfigurationModal } from "@pages/creditLines/tabs/infoConfigurationModal";
import { tokens } from "@design/tokens";
import { DecisionModal } from "@design/modals/decisionModal";
import { getFieldState } from "@utils/getFieldState";
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
    onToggleInfoModal,
    onOpenModal,
  } = props;

  return (
    <Stack
      direction="column"
      gap={tokens.spacing.s300}
      padding={`${tokens.spacing.s350} ${tokens.spacing.s700}`}
      width="-webkit-fill-available"
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
          description={options.lineNames.links.namesAndDescriptions.description}
          onClick={onToggleInfoModal}
          onCloseModal={onToggleInfoModal}
        />
      )}
    </Stack>
  );
};

export { NameAndDescriptionFormUI };
