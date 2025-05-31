import { Autosuggest, Button, Stack, Text, Textarea } from "@inubekit/inubekit";
import { MdOutlineFax } from "react-icons/md";

import { tokens } from "@design/tokens";
import { ComponentAppearance } from "@enum/appearances";
import { getFieldState } from "@utils/forms/getFieldState";
import { IGeneralInformationFormUI } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/forms/IGeneralInformationFormUI";
import { generalInfoLabels } from "@config/moneyDestination/moneyDestinationTab/form/generalInfoLabels";
import { isInvalid } from "@utils/isInvalid";
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
    onChange,
    onButtonClick,
    onReset,
    valuesEqual,
    autosuggestValue,
    buttonDisabledState,
  } = props;

  return (
    <StyledContainer>
      <StyledFormContent>
        <form>
          <Stack direction="column" gap={tokens.spacing.s300}>
            <StyledContainerFields $isMobile={isMobile}>
              <Stack direction="column" width="100%" gap={tokens.spacing.s250}>
                <Stack
                  direction={isMobile ? "column" : "row"}
                  gap={tokens.spacing.s250}
                >
                  <Stack width={isMobile ? "100%" : "350px"}>
                    <Autosuggest
                      label={generalInfoLabels.name}
                      name="nameDestination"
                      id="nameDestination"
                      placeholder={generalInfoLabels.placeholderName}
                      value={autosuggestValue}
                      onChange={onChange}
                      options={optionsDestination}
                      onBlur={formik.handleBlur}
                      size="compact"
                      fullwidth
                      invalid={isInvalid(formik, "nameDestination")}
                    />
                  </Stack>
                  <Stack
                    direction="column"
                    gap={tokens.spacing.s050}
                    alignItems="center"
                  >
                    <Text type="label" size="small" weight="bold">
                      {generalInfoLabels.icon}
                    </Text>
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
          <Button
            onClick={onReset}
            appearance={ComponentAppearance.GRAY}
            disabled={valuesEqual}
          >
            {generalInfoLabels.cancelButton}
          </Button>
        )}

        <Button
          onClick={onButtonClick}
          disabled={buttonDisabledState}
          loading={loading}
          appearance={ComponentAppearance.PRIMARY}
        >
          {labelButtonNext}
        </Button>
      </Stack>
    </StyledContainer>
  );
};

export { GeneralInformationFormUI };
