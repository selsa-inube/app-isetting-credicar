import { Stack, Textarea, Textfield } from "@inubekit/inubekit";
import { ModalWrapper } from "@design/modals/modalWrapper";
import { tokens } from "@design/tokens";
import { getFieldState } from "@utils/forms/getFieldState";
import { addLineModal } from "@config/creditLines/creditLinesTab/generic/addLineModal";
import { portalId } from "@config/portalId";
import { IAddCreditLineFormUI } from "@ptypes/creditLines/forms/AddCreditLineFormUI";

const AddCreditLineFormUI = (props: IAddCreditLineFormUI) => {
  const { formik, loading, disabledButton, onAddModal, onCloseModal } = props;
  return (
    <ModalWrapper
      width="550px"
      maxHeight="auto"
      padding={tokens.spacing.s300}
      borderRadius={tokens.spacing.s200}
      typeTitle="title"
      sizeTitle="medium"
      withCancelButton
      labelActionButton={addLineModal.labelActionButton}
      labelCloseButton={addLineModal.labelCloseButton}
      labelCloseModal={addLineModal.labelCloseModal}
      portalId={portalId}
      title={addLineModal.title}
      subtitle={addLineModal.subtitle}
      onClick={onAddModal}
      onCloseModal={onCloseModal}
      loading={loading}
      dashed
      weightTitle="bold"
      disabledActionButton={disabledButton}
    >
      <Stack gap={tokens.spacing.s250} direction="column">
        <Textfield
          name="nameLine"
          id="nameLine"
          label={addLineModal.nameLine}
          placeholder={addLineModal.placeholderNameLine}
          size="compact"
          value={formik.values.nameLine}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={getFieldState(formik, "nameLine")}
          message={formik.errors.nameLine}
          maxLength={addLineModal.maxLengthNameLine}
          fullwidth
          required
        />

        <Textfield
          name="aliasLine"
          id="aliasLine"
          label={addLineModal.aliasLine}
          placeholder={addLineModal.placeholderAliasLine}
          size="compact"
          value={formik.values.aliasLine}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={getFieldState(formik, "aliasLine")}
          message={formik.errors.aliasLine}
          maxLength={addLineModal.maxLengthAliasLine}
          fullwidth
          required
        />

        <Textarea
          label={addLineModal.descriptionLine}
          placeholder={addLineModal.placeholderDescriptionLine}
          name="descriptionLine"
          id="descriptionLine"
          value={formik.values.descriptionLine}
          maxLength={addLineModal.maxLengthDescriptionLine}
          status={getFieldState(formik, "descriptionLine")}
          message={formik.errors.descriptionLine}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          fullwidth
          required
        />
      </Stack>
    </ModalWrapper>
  );
};

export { AddCreditLineFormUI };
