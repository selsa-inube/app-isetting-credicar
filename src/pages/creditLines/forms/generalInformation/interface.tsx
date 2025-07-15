import { Stack, Textarea, Input, Button } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import { getFieldState } from "@utils/forms/getFieldState";
import { StyledContainer, StyledContainerFields } from "./styles";
import { generalInfoLabels } from "@config/creditLines/addCreditLine/assisted/generalInfoLabels";
import { IGeneralInformationFormUI } from "@ptypes/creditLines/addCreditLine/IGeneralInformationFormUI";

const GeneralInformationFormUI = (props: IGeneralInformationFormUI) => {
  const { formik, loading, isMobile, onNextStep } = props;

  return (
    <StyledContainer>
      <form>
        <Stack direction="column" gap={tokens.spacing.s300}>
          <StyledContainerFields $isMobile={isMobile}>
            <Stack direction="column" width="100%" gap={tokens.spacing.s250}>
              <Stack
                direction={isMobile ? "column" : "row"}
                gap={tokens.spacing.s250}
              >
                <Stack width={isMobile ? "100%" : "350px"}>
                  <Input
                    name="nameCreditLine"
                    id="nameCreditLine"
                    label={generalInfoLabels.nameCreditLine}
                    placeholder={generalInfoLabels.nameCredLinePlaceholder}
                    type="text"
                    size="compact"
                    value={formik.values.nameCreditLine}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    status={getFieldState(formik, "nameCreditLine")}
                    message={formik.errors.nameCreditLine}
                    fullwidth
                  />
                </Stack>
              </Stack>

              <Textarea
                label={generalInfoLabels.description}
                placeholder={generalInfoLabels.descriptionPlaceholder}
                name="descriptionCreditLine"
                id="descriptionCreditLine"
                value={formik.values.descriptionCreditLine}
                maxLength={1000}
                disabled={loading}
                status={getFieldState(formik, "descriptionCreditLine")}
                message={formik.errors.descriptionCreditLine}
                fullwidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </Stack>
          </StyledContainerFields>
        </Stack>
      </form>
      <Stack justifyContent="flex-end" gap={tokens.spacing.s250}>
        <Button
          fullwidth={isMobile}
          onClick={() => formik.resetForm()}
          appearance={EComponentAppearance.GRAY}
        >
          {generalInfoLabels.closeButton}
        </Button>

        <Button
          fullwidth={isMobile}
          onClick={onNextStep}
          disabled={loading ?? !formik.isValid}
          appearance={EComponentAppearance.PRIMARY}
        >
          {generalInfoLabels.nextButton}
        </Button>
      </Stack>
    </StyledContainer>
  );
};

export { GeneralInformationFormUI };
