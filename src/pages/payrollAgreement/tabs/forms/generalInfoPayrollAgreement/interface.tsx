import { MdInfoOutline } from "react-icons/md";
import {
  Autosuggest,
  Button,
  Checkpicker,
  Grid,
  Icon,
  inube,
  Label,
  Select,
  Stack,
  Textfield,
} from "@inubekit/inubekit";

import { generalInfoLabels } from "@config/payrollAgreement/payrollAgreementTab/forms/generalInfoLabels";
import { ComponentAppearance } from "@enum/appearances";
import { getFieldState } from "@utils/getFieldState";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { DecisionModal } from "@design/modals/decisionModal";
import { BoxContainer } from "@design/layout/boxContainer";
import { tokens } from "@design/tokens";
import { IGeneralInformationPayrollFormUI } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IGeneralInformationPayrollFormUI";
import { generalInfLabels } from "@config/payrollAgreement/payrollAgreementTab/assisted/generalInfLabels";
import { useThemeData } from "@utils/theme";
import { isInvalid } from "@utils/isInvalid";
import { StyledFormContent, StyledRow } from "./styles";

const GeneralInformationPayrollFormUI = (
  props: IGeneralInformationPayrollFormUI,
) => {
  const {
    formik,
    loading,
    infoModal,
    editDataOption,
    autosuggestValue,
    isDisabledButton,
    showModal,
    sourcesOfIncomeValues,
    isMobile,
    typePayrollOptions,
    companyAgreement,
    gridTemplateRows,
    labelButtonPrevious,
    labelButtonNext,
    onChangeSelect,
    onChangeAutosuggest,
    onButtonClick,
    onResetEdit,
    onToggleInfoModalModal,
    onChangeCheck,
    onPreviousStep,
  } = props;

  const theme = useThemeData();

  return (
    <BoxContainer
      direction="column"
      gap={tokens.spacing.s150}
      backgroundColor={
        theme ? theme?.palette?.neutral?.N0 : inube.palette.neutral.N0
      }
      boxSizing="initial"
      minHeight="55vh"
    >
      <StyledFormContent>
        <form>
          <Stack direction="column">
            <BoxContainer
              borderColor={
                theme ? theme?.palette?.neutral?.N40 : inube.palette.neutral.N40
              }
              borderRadius={tokens.spacing.s100}
              width="100%"
              backgroundColor={
                theme ? theme?.palette?.neutral?.N0 : inube.palette.neutral.N0
              }
              boxSizing="border-box"
              padding={
                isMobile ? `${tokens.spacing.s150}` : `${tokens.spacing.s300}`
              }
            >
              <Grid
                templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"}
                templateRows={gridTemplateRows}
                width="100%"
                gap={isMobile ? tokens.spacing.s150 : tokens.spacing.s250}
              >
                {editDataOption && (
                  <>
                    <Textfield
                      name="companyAgreement"
                      id="companyAgreement"
                      label={generalInfoLabels.companyAgreement}
                      readOnly
                      size="compact"
                      value={companyAgreement}
                      fullwidth
                      disabled
                    />
                    <Textfield
                      name="typePayrollSelected"
                      id="typePayrollSelected"
                      label={generalInfoLabels.typePayrollSelected}
                      readOnly
                      size="compact"
                      value={formik.values.typePayroll}
                      fullwidth
                      disabled
                    />
                  </>
                )}
                <StyledRow $isMobile={isMobile} $editOption={editDataOption}>
                  <Textfield
                    name="abbreviatedName"
                    id="abbreviatedName"
                    label={generalInfLabels.namPayroll}
                    placeholder={generalInfLabels.placeholderNamePayroll}
                    size="compact"
                    value={formik.values.abbreviatedName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    status={getFieldState(formik, "abbreviatedName")}
                    message={formik.errors.abbreviatedName}
                    counter
                    maxLength={generalInfLabels.maxLengthNamePayroll}
                    fullwidth
                    required
                  />
                </StyledRow>
                {!editDataOption && (
                  <Select
                    disabled={false}
                    id="typePayroll"
                    name="typePayroll"
                    label={generalInfLabels.typePayroll}
                    placeholder={generalInfLabels.placeholderTypePayroll}
                    onChange={onChangeSelect}
                    options={typePayrollOptions}
                    size="compact"
                    value={formik.values.typePayroll ?? ""}
                    fullwidth
                    message={formik.errors.typePayroll}
                    invalid={isInvalid(formik, "typePayroll")}
                    onBlur={formik.handleBlur}
                  />
                )}
                <Checkpicker
                  label={generalInfLabels.sourcesOfIncome}
                  name="sourcesOfIncome"
                  id="sourcesOfIncome"
                  placeholder={generalInfLabels.placeholderSourcesOfIncome}
                  message={formik.errors.sourcesOfIncome}
                  invalid={isInvalid(formik, "sourcesOfIncome")}
                  fullwidth={true}
                  options={sourcesOfIncomeValues}
                  values={formik.values.sourcesOfIncome}
                  onChange={onChangeCheck}
                  size="compact"
                />

                <Stack direction="column">
                  <Stack
                    alignItems="center"
                    gap={tokens.spacing.s050}
                    margin={`${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s075} ${tokens.spacing.s200}`}
                  >
                    <Label htmlFor="applicationDaysPayroll" size="small">
                      {generalInfLabels.daysApplication}
                    </Label>
                    <Icon
                      icon={<MdInfoOutline />}
                      appearance={ComponentAppearance.PRIMARY}
                      onClick={onToggleInfoModalModal}
                      size="12px"
                      cursorHover
                    />
                  </Stack>

                  <Autosuggest
                    label=""
                    name="applicationDaysPayroll"
                    id="applicationDaysPayroll"
                    placeholder={generalInfLabels.placeholderDaysApplication}
                    value={autosuggestValue}
                    onChange={onChangeAutosuggest}
                    options={getDomainById("daysForApplication")}
                    onBlur={formik.handleBlur}
                    size="compact"
                    fullwidth
                    message={formik.errors.applicationDaysPayroll}
                    invalid={isInvalid(formik, "applicationDaysPayroll")}
                  />
                </Stack>
              </Grid>
            </BoxContainer>
          </Stack>
        </form>
      </StyledFormContent>
      <Stack justifyContent="flex-end" gap={tokens.spacing.s250}>
        <Button
          fullwidth={isMobile}
          onClick={editDataOption ? onResetEdit : onPreviousStep}
          variant="outlined"
          appearance={ComponentAppearance.GRAY}
        >
          {labelButtonPrevious}
        </Button>

        <Button
          fullwidth={isMobile}
          onClick={onButtonClick}
          disabled={isDisabledButton}
          loading={loading}
          appearance={ComponentAppearance.PRIMARY}
        >
          {labelButtonNext}
        </Button>
      </Stack>
      {showModal && (
        <DecisionModal
          portalId="portal"
          title={infoModal.title}
          description={infoModal.description}
          actionText={infoModal.actionText}
          withCancelButton={false}
          appearance={ComponentAppearance.PRIMARY}
          onCloseModal={onToggleInfoModalModal}
          onClick={onToggleInfoModalModal}
          moreDetails={infoModal.moreDetails}
        />
      )}
    </BoxContainer>
  );
};

export { GeneralInformationPayrollFormUI };
