import {
  Autocomplete,
  Button,
  Stack,
  Text,
  Textarea,
  Textfield,
} from "@inubekit/inubekit";
import { MdOutlineFax } from "react-icons/md";

import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import { isInvalid } from "@utils/isInvalid";
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
    icon,
    labelButtonNext,
    isMobile,
    widthStack,
    directionStack,
    alignItemsIcon,
    paddingIcon,
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
                    {editDataOption ? (
                      <Stack height={tokens.spacing.s850} width="100%">
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
                      </Stack>
                    ) : (
                      <Stack height={tokens.spacing.s850} width="100%">
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
                          invalid={isInvalid(formik, "nameDestination")}
                          message={formik.errors.nameDestination}
                          required
                        />
                      </Stack>
                    )}
                  </Stack>
                  <Stack
                    direction="column"
                    gap={tokens.spacing.s050}
                    alignItems={alignItemsIcon}
                  >
                    <Stack padding={paddingIcon}>
                      <Text type="label" size="medium" weight="bold">
                        {generalInfoLabels.icon}
                      </Text>
                    </Stack>
                    <StyledIcon $isMobile={isMobile}>
                      {icon ?? <MdOutlineFax size={24} />}
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
