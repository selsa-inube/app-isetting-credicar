import { MdOutlineWarningAmber } from "react-icons/md";

import {
  Button,
  Divider,
  Fieldset,
  inube,
  Numberfield,
  Select,
  Stack,
  Textfield,
} from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { ComponentAppearance } from "@enum/appearances";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { getFieldState } from "@utils/getFieldState";
import { companyLabels } from "@config/payrollAgreement/payrollAgreementTab/forms/companyLabels";
import { DecisionModal } from "@design/modals/decisionModal";
import { ICompanyFormUI } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/ICompanyFormUI";
import { BoxContainer } from "@design/layout/boxContainer";
import { isInvalid } from "@utils/isInvalid";
import { useThemeData } from "@utils/theme";
import { StyledFormContent } from "../styles";

const CompanyFormUI = (props: ICompanyFormUI) => {
  const theme = useThemeData();
  const {
    formik,
    loading,
    optionsCountries,
    optionsCities,
    legalPerson,
    isDisabledButton,
    isMobile,
    showModal,
    titleAlertModal,
    descriptionModal,
    actionTextModal,
    moreDetailsModal,
    isAddingCompany,
    onToggleAlertModal,
    onChange,
    onCompanyChange,
    onButtonClick,
  } = props;

  return (
    <BoxContainer
      direction="column"
      gap={tokens.spacing.s300}
      minHeight="55vh"
      backgroundColor={
        theme ? theme?.palette?.neutral?.N0 : inube.palette.neutral.N0
      }
      boxSizing="initial"
    >
      <StyledFormContent>
        <BoxContainer
          borderColor={
            theme ? theme?.palette?.neutral?.N40 : inube.palette.neutral.N40
          }
          borderRadius={tokens.spacing.s100}
          gap={tokens.spacing.s300}
          padding={
            isMobile ? `${tokens.spacing.s150}` : `${tokens.spacing.s300}`
          }
          backgroundColor={
            theme ? theme?.palette?.neutral?.N0 : inube.palette.neutral.N0
          }
          boxSizing="initial"
        >
          <Stack gap={tokens.spacing.s300} direction="column" width="100%">
            <Select
              fullwidth
              disabled={false}
              id="companySelected"
              name="companySelected"
              label={companyLabels.companySelected}
              placeholder={companyLabels.placeholderCompanySelected}
              onChange={onCompanyChange}
              options={legalPerson}
              onBlur={formik.handleBlur}
              size="compact"
              value={formik.values.companySelected ?? ""}
              invalid={isInvalid(formik, "companySelected")}
              message={formik.errors.companySelected}
            />

            {isAddingCompany && (
              <>
                <Divider dashed />
                <Stack direction="column" width="100%">
                  <Textfield
                    name="companyName"
                    id="companyName"
                    label={companyLabels.companyName}
                    placeholder={companyLabels.placeholderCompanyName}
                    type="text"
                    size="compact"
                    value={formik.values.companyName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    status={getFieldState(formik, "companyName")}
                    message={formik.errors.companyName}
                    counter
                    maxLength={companyLabels.maxLengthCompanyName}
                    fullwidth
                    required
                  />
                  <Stack
                    direction={isMobile ? "column" : "row"}
                    gap={tokens.spacing.s250}
                    width="100%"
                    justifyContent="space-between"
                    alignItems="center"
                    padding={`${tokens.spacing.s200} ${tokens.spacing.s0} ${tokens.spacing.s0}`}
                  >
                    <Textfield
                      name="companyNameCommercial"
                      id="companyNameCommercial"
                      label={companyLabels.companyNameCommercial}
                      placeholder={companyLabels.placeholdercompanyNameCommerc}
                      size="compact"
                      value={formik.values.companyNameCommercial}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      status={getFieldState(formik, "companyNameCommercial")}
                      message={formik.errors.companyNameCommercial}
                      counter
                      maxLength={companyLabels.maxLengthcompanyNameCom}
                      fullwidth
                      required
                    />
                    <Select
                      disabled={false}
                      id="companyCountry"
                      name="companyCountry"
                      label={companyLabels.companyCountry}
                      placeholder={companyLabels.placeholderCompanyCountry}
                      onChange={onChange}
                      options={optionsCountries}
                      size="compact"
                      value={formik.values.companyCountry ?? ""}
                      onBlur={formik.handleBlur}
                      message={formik.errors.companyCountry}
                      invalid={isInvalid(formik, "companyCountry")}
                      fullwidth
                    />
                  </Stack>

                  <Fieldset legend="Identificación" type="body" size="medium">
                    <Stack
                      direction={isMobile ? "column" : "row"}
                      gap={tokens.spacing.s250}
                      width="100%"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Select
                        disabled={false}
                        id="companyTypeIdent"
                        name="companyTypeIdent"
                        label={companyLabels.companyTypeIdent}
                        placeholder={companyLabels.placeholderCompanyTypeIdent}
                        onChange={onChange}
                        options={getDomainById("typeIdentCompany")}
                        onBlur={formik.handleBlur}
                        size="compact"
                        value={formik.values.companyTypeIdent ?? ""}
                        fullwidth
                        message={formik.errors.companyTypeIdent}
                        invalid={isInvalid(formik, "companyTypeIdent")}
                      />
                      <Numberfield
                        name="companyNumberIdent"
                        id="companyNumberIdent"
                        label={companyLabels.companyNumberIdent}
                        placeholder={
                          companyLabels.placeholderCompanyNumberIdent
                        }
                        size="compact"
                        value={formik.values.companyNumberIdent}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        status={getFieldState(formik, "companyNumberIdent")}
                        message={formik.errors.companyNumberIdent}
                        fullwidth
                        required
                      />
                      <Select
                        disabled={false}
                        id="companyCountryIdent"
                        name="companyCountryIdent"
                        label={companyLabels.companyCountryIdent}
                        placeholder={
                          companyLabels.placeholderCompanyCountryIdent
                        }
                        onChange={onChange}
                        options={optionsCountries}
                        size="compact"
                        value={formik.values.companyCountryIdent ?? ""}
                        message={formik.errors.companyCountryIdent}
                        onBlur={formik.handleBlur}
                        invalid={isInvalid(formik, "companyCountryIdent")}
                        fullwidth
                      />
                    </Stack>
                  </Fieldset>

                  <Fieldset
                    legend="Dirección de la sede"
                    type="body"
                    size="medium"
                  >
                    <Stack
                      direction="column"
                      width="100%"
                      gap={isMobile ? tokens.spacing.s050 : tokens.spacing.s200}
                    >
                      <Stack
                        direction={isMobile ? "column" : "row"}
                        gap={tokens.spacing.s250}
                        width="100%"
                      >
                        <Textfield
                          name="companyAddressRes"
                          id="companyAddressRes"
                          label={companyLabels.companyAddressRes}
                          placeholder={
                            companyLabels.placeholderCompanyAddressRes
                          }
                          size="compact"
                          value={formik.values.companyAddressRes}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          status={getFieldState(formik, "companyAddressRes")}
                          message={formik.errors.companyAddressRes}
                          fullwidth
                          required
                        />
                        <Textfield
                          name="companyComplement"
                          id="companyComplement"
                          label={companyLabels.companyComplement}
                          placeholder={
                            companyLabels.placeholderCompanyComplement
                          }
                          size="compact"
                          value={formik.values.companyComplement}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          status={getFieldState(formik, "companyComplement")}
                          message={formik.errors.companyComplement}
                          counter
                          maxLength={companyLabels.maxLengthcompanyComplem}
                          fullwidth
                          required
                        />
                      </Stack>
                      <Select
                        disabled={false}
                        id="companyCity"
                        name="companyCity"
                        label={companyLabels.companyCity}
                        placeholder={companyLabels.placeholderCompanyCity}
                        onChange={onChange}
                        options={optionsCities}
                        size="compact"
                        onBlur={formik.handleBlur}
                        value={formik.values.companyCity ?? ""}
                        message={formik.errors.companyCity}
                        invalid={isInvalid(formik, "companyCity")}
                        fullwidth
                      />
                    </Stack>
                  </Fieldset>
                </Stack>
              </>
            )}
          </Stack>
        </BoxContainer>
      </StyledFormContent>
      <Stack justifyContent="flex-end" gap={tokens.spacing.s250}>
        <Button
          fullwidth={isMobile}
          onClick={onButtonClick}
          disabled={isDisabledButton}
          loading={loading}
          appearance={ComponentAppearance.PRIMARY}
        >
          {companyLabels.labelbutton}
        </Button>
      </Stack>
      {showModal && (
        <DecisionModal
          portalId="portal"
          icon={<MdOutlineWarningAmber />}
          withIcon
          sizeIcon="75px"
          withCancelButton={false}
          title={titleAlertModal}
          description={descriptionModal}
          actionText={actionTextModal}
          onCloseModal={onToggleAlertModal}
          onClick={onToggleAlertModal}
          moreDetails={moreDetailsModal}
          appearance={ComponentAppearance.WARNING}
        />
      )}
    </BoxContainer>
  );
};

export { CompanyFormUI };
