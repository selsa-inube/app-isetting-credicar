import { Button, Divider, Select, Stack, Text } from "@inubekit/inubekit";

import { getDomainById } from "@mocks/domains/domainService.mocks";
import { OptionsPropectCredit } from "@design/data/optionsPropectCredit";
import {
  StyledContainer,
  StyledContainerFields,
} from "@design/forms/creditProspect/styles";
import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import { ICreditProspectFormUI } from "@ptypes/creditLines/addCreditLine/ICreditProspectFormUI";
import { creditProspectLabels } from "@config/creditLines/addCreditLine/assisted/creditProspectLabels";

const CreditProspectFormUI = (props: ICreditProspectFormUI) => {
  const {
    formik,
    loading,
    entries,
    additionalDebtorsField,
    isFormValid,
    isMobile,
    onNextStep,
    onPreviousStep,
    onChange,
    onToggle,
  } = props;

  return (
    <StyledContainer>
      <form>
        <Stack direction="column" gap={tokens.spacing.s300}>
          <StyledContainerFields $isMobile={isMobile}>
            <Stack direction="column" gap={tokens.spacing.s250}>
              {entries.map((entry) => (
                <Stack
                  direction="column"
                  key={entry.id}
                  gap={tokens.spacing.s250}
                >
                  <OptionsPropectCredit entry={entry} onChange={onToggle} />
                  <Divider dashed />
                </Stack>
              ))}

              <Text size="medium">{creditProspectLabels.description}</Text>
              <Select
                fullwidth={isMobile ? true : false}
                disabled={!additionalDebtorsField}
                id="additionalDebtors"
                name="additionalDebtors"
                label=""
                placeholder="Seleccione una opción"
                onChange={onChange}
                options={getDomainById("additionalDebtors")}
                required={false}
                size="compact"
                value={
                  additionalDebtorsField ? formik.values.additionalDebtors : ""
                }
              />
            </Stack>
          </StyledContainerFields>
        </Stack>
      </form>
      <Stack justifyContent="flex-end" gap={tokens.spacing.s250}>
        <Button
          fullwidth={isMobile}
          onClick={onPreviousStep}
          appearance={EComponentAppearance.GRAY}
        >
          {creditProspectLabels.previousButton}
        </Button>

        <Button
          fullwidth={isMobile}
          onClick={onNextStep}
          disabled={loading ?? !isFormValid}
          appearance={EComponentAppearance.PRIMARY}
        >
          {creditProspectLabels.nextButton}
        </Button>
      </Stack>
    </StyledContainer>
  );
};

export { CreditProspectFormUI };
