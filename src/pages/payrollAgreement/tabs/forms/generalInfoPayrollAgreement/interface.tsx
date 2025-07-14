import { MdInfoOutline, MdOutlineWarningAmber } from "react-icons/md";
import {
  Autosuggest,
  Button,
  Checkpicker,
  Grid,
  Icon,
  Label,
  Select,
  Stack,
  Textfield,
} from "@inubekit/inubekit";

import { generalInfoLabels } from "@config/payrollAgreement/payrollAgreementTab/forms/generalInfoLabels";
import { EComponentAppearance } from "@enum/appearances";
import { getFieldState } from "@utils/getFieldState";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { DecisionModal } from "@design/modals/decisionModal";
import { BoxContainer } from "@design/layout/boxContainer";
import { tokens } from "@design/tokens";
import { IGeneralInformationPayrollFormUI } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IGeneralInformationPayrollFormUI";
import { portalId } from "@config/portalId";
import { generalInfLabels } from "@config/payrollAgreement/payrollAgreementTab/assisted/generalInfLabels";
import { isInvalid } from "@utils/isInvalid";
import { StyledFormContent } from "./styles";

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
    showCodeModal,
    titleCodeModal,
    descriptionCodeModal,
    actionTextCodeModal,
    moreDetailsCode,
    onToggleCodeModal,
    onChangeSelect,
    onChangeAutosuggest,
    onButtonClick,
    onResetEdit,
    onToggleInfoModalModal,
    onChangeCheck,
    onPreviousStep,
  } = props;

  return (
    <BoxContainer
      direction="column"
      gap={tokens.spacing.s150}
      backgroundColor={EComponentAppearance.LIGHT}
      boxSizing="initial"
      minHeight="55vh"
    >
      <StyledFormContent>
        <form>
          <Stack direction="column">
            <BoxContainer
              borderColor={EComponentAppearance.DARK}
              borderRadius={tokens.spacing.s100}
              width="100%"
              height="auto"
              backgroundColor={EComponentAppearance.LIGHT}
              boxSizing="border-box"
              padding={
                isMobile ? `${tokens.spacing.s150}` : `${tokens.spacing.s300}`
              }
            >
              <Grid
                templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"}
                templateRows={gridTemplateRows}
                width="100%"
                height="100%"
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
                    <Textfield
                      name="code"
                      id="code"
                      label={generalInfLabels.codePayroll}
                      size="compact"
                      readOnly
                      value={formik.values.code}
                      disabled
                      fullwidth
                    />
                  </>
                )}
                {!editDataOption && (
                  <Textfield
                    name="code"
                    id="code"
                    label={generalInfLabels.codePayroll}
                    placeholder={generalInfLabels.placeholderCodePayroll}
                    size="compact"
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    status={getFieldState(formik, "code")}
                    message={formik.errors.code}
                    maxLength={generalInfLabels.maxLengthNamePayroll}
                    fullwidth
                    required
                  />
                )}

                <Textfield
                  name="abbreviatedName"
                  id="abbreviatedName"
                  label={generalInfLabels.namePayroll}
                  placeholder={generalInfLabels.placeholderNamePayroll}
                  size="compact"
                  value={formik.values.abbreviatedName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  status={getFieldState(formik, "abbreviatedName")}
                  message={formik.errors.abbreviatedName}
                  maxLength={generalInfLabels.maxLengthNamePayroll}
                  fullwidth
                  required
                />

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
                    <Label htmlFor="applicationDaysPayroll" size="medium">
                      {generalInfLabels.daysApplication}
                    </Label>
                    <Icon
                      icon={<MdInfoOutline />}
                      appearance={EComponentAppearance.PRIMARY}
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
          onClick={editDataOption ? onResetEdit : onPreviousStep}
          variant="outlined"
          appearance={EComponentAppearance.GRAY}
        >
          {labelButtonPrevious}
        </Button>

        <Button
          onClick={onButtonClick}
          disabled={isDisabledButton}
          loading={loading}
          appearance={EComponentAppearance.PRIMARY}
        >
          {labelButtonNext}
        </Button>
      </Stack>
      {showModal && (
        <DecisionModal
          portalId={portalId}
          title={infoModal.title}
          description={infoModal.description}
          actionText={infoModal.actionText}
          withCancelButton={false}
          onCloseModal={onToggleInfoModalModal}
          onClick={onToggleInfoModalModal}
          moreDetails={infoModal.moreDetails}
        />
      )}

      {showCodeModal && (
        <DecisionModal
          portalId={portalId}
          icon={<MdOutlineWarningAmber />}
          withIcon
          sizeIcon="75px"
          withCancelButton={false}
          title={titleCodeModal}
          description={descriptionCodeModal}
          actionText={actionTextCodeModal}
          moreDetails={moreDetailsCode}
          onCloseModal={onToggleCodeModal}
          onClick={onToggleCodeModal}
          appearance={EComponentAppearance.WARNING}
        />
      )}
    </BoxContainer>
  );
};

export { GeneralInformationPayrollFormUI };
