import { Stack, Textarea, Textfield } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { getFieldState } from "@utils/getFieldState";
import { nameAndDescriptionLabels } from "@config/creditLines/configuration/nameAndDescriptionLabels";
import { INameAndDescriptionFormUI } from "@ptypes/creditLines/forms/INameAndDescriptionFormUI";

const NameAndDescriptionFormUI = (props: INameAndDescriptionFormUI) => {
  const { formik } = props;

  return (
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
  );
};

export { NameAndDescriptionFormUI };
