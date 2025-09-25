import {
  Autocomplete,
  Button,
  Checkpicker,
  Select,
  Stack,
  Text,
  Textarea,
  Textfield,
} from "@inubekit/inubekit";
import { MdOutlineFax } from "react-icons/md";

import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import { isInvalid } from "@utils/isInvalid";
import { getIcon } from "@utils/getIcon";
import { getFieldState } from "@utils/forms/getFieldState";
import { generalInfoLabels } from "@config/moneyDestination/moneyDestinationTab/form/generalInfoLabels";
import { IGeneralInformationFormUI } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IGeneralInformationFormUI";
import {
  StyledContainer,
  StyledContainerFields,
  StyledFormContent,
  StyledIcon,
} from "./styles";

const GeneralInformationFormUI = (props: IGeneralInformationFormUI) => {
  const {
    formik,
    loading,
    optionsDestination,
    editDataOption,
    labelButtonNext,
    isMobile,
    widthStack,
    directionStack,
    alignItemsIcon,
    paddingIcon,
    typeDestinationOptions,
    creditLineOptions,
    onChangeCheck,
    onChange,
    onButtonClick,
    onReset,
    autosuggestValue,
    buttonDisabledState,
  } = props;

  return (
    <StyledContainer $isMobile={isMobile}>
      <StyledFormContent>
        <form>
          <Stack direction="column" gap={tokens.spacing.s300}>
            <StyledContainerFields $isMobile={isMobile}>
              <Stack direction="column" width="100%" gap={tokens.spacing.s250}>
                <Stack direction={directionStack} gap={tokens.spacing.s250}>
                  <Stack width={widthStack}>
                    <Stack
                      direction="column"
                      gap={tokens.spacing.s250}
                      width="100%"
                    >
                      {editDataOption ? (
                        <>
                          <Textfield
                            name="typeDestination"
                            id="typeDestination"
                            label={generalInfoLabels.type}
                            size="compact"
                            value={formik.values.typeDestination}
                            message={formik.errors.typeDestination}
                            fullwidth
                            disabled
                          />
                          <Textfield
                            name="nameDestination"
                            id="nameDestination"
                            label={generalInfoLabels.name}
                            placeholder={generalInfoLabels.placeholderName}
                            size="compact"
                            value={autosuggestValue}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            status={getFieldState(formik, "nameDestination")}
                            message={formik.errors.nameDestination}
                            fullwidth
                            required
                          />
                        </>
                      ) : (
                        <>
                          <Select
                            id="typeDestination"
                            name="typeDestination"
                            label={generalInfoLabels.type}
                            placeholder={generalInfoLabels.placeholderType}
                            onChange={onChange}
                            options={typeDestinationOptions ?? []}
                            size="compact"
                            value={formik.values.typeDestination ?? ""}
                            fullwidth
                            required
                            message={formik.errors.typeDestination}
                            onBlur={formik.handleBlur}
                            invalid={isInvalid(formik, "typeDestination")}
                          />
                          <Stack width="100%">
                            <Autocomplete
                              label={generalInfoLabels.name}
                              name="nameDestination"
                              id="nameDestination"
                              placeholder={generalInfoLabels.placeholderName}
                              value={formik.values.nameDestination}
                              onChange={onChange}
                              options={optionsDestination}
                              onBlur={formik.handleBlur}
                              size="compact"
                              fullwidth
                              disabled={!formik.values.typeDestination}
                              invalid={isInvalid(formik, "nameDestination")}
                              message={formik.errors.nameDestination}
                              required
                            />
                          </Stack>
                        </>
                      )}
                    </Stack>
                  </Stack>
                  <Stack
                    direction="column"
                    gap={tokens.spacing.s050}
                    alignItems={alignItemsIcon}
                    justifyContent="end"
                  >
                    <Stack padding={paddingIcon}>
                      <Text type="label" size="medium" weight="bold">
                        {generalInfoLabels.icon}
                      </Text>
                    </Stack>
                    <StyledIcon $isMobile={isMobile}>
                      {getIcon(formik.values.icon) ?? (
                        <MdOutlineFax size={24} />
                      )}
                    </StyledIcon>
                  </Stack>
                </Stack>
                <Textarea
                  label={generalInfoLabels.description}
                  placeholder={generalInfoLabels.placeholderdescription}
                  name="description"
                  id="description"
                  value={formik.values.description}
                  maxLength={generalInfoLabels.maxLengthDescrip}
                  disabled={loading}
                  status={getFieldState(formik, "description")}
                  message={formik.errors.description}
                  fullwidth
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                />
                <Stack width="100%">
                  <Checkpicker
                    label={generalInfoLabels.creditLine}
                    name="creditLine"
                    id="creditLine"
                    placeholder={generalInfoLabels.placeholderLine}
                    message={formik.errors.creditLine}
                    fullwidth
                    invalid={isInvalid(formik, "creditLine")}
                    options={creditLineOptions}
                    values={formik.values.creditLine}
                    onChange={onChangeCheck}
                    size="compact"
                  />
                </Stack>
              </Stack>
            </StyledContainerFields>
          </Stack>
        </form>
      </StyledFormContent>
      <Stack justifyContent="flex-end" gap={tokens.spacing.s250}>
        {editDataOption && (
          <Button onClick={onReset} appearance={EComponentAppearance.GRAY}>
            {generalInfoLabels.cancelButton}
          </Button>
        )}

        <Button
          onClick={onButtonClick}
          disabled={buttonDisabledState}
          loading={loading}
          appearance={EComponentAppearance.PRIMARY}
        >
          {labelButtonNext}
        </Button>
      </Stack>
    </StyledContainer>
  );
};

export { GeneralInformationFormUI };
